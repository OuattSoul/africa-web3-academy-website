"use client";
import Link from "next/link";
import { useRef, useState } from "react";
import { FORMS, validateField, type FieldDef, type FormId } from "@/lib/forms";
import { SITE } from "@/content/site";
import { Icon } from "./Icon";
import styles from "./Form.module.css";

type Status = "idle" | "submitting" | "success" | "error";

export function Form({ formId, defaults = {} }: { formId: FormId; defaults?: Record<string, string> }) {
  const def = FORMS[formId];
  const [values, setValues] = useState<Record<string, string | boolean>>(() => ({ ...defaults }));
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const startedAt = useRef(Date.now());
  const formRef = useRef<HTMLFormElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const uid = `f-${formId}`;

  const set = (f: FieldDef, v: string | boolean) => {
    setValues((s) => ({ ...s, [f.name]: v }));
    if (errors[f.name]) setErrors((e) => ({ ...e, [f.name]: validateField(f, v) ?? "" }));
  };
  const blur = (f: FieldDef) => {
    const e = validateField(f, values[f.name]);
    setErrors((s) => ({ ...s, [f.name]: e ?? "" }));
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;
    const next: Record<string, string> = {};
    def.fields.forEach((f) => { const err = validateField(f, values[f.name]); if (err) next[f.name] = err; });
    setErrors(next);
    const firstInvalid = def.fields.find((f) => next[f.name]);
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid.name}"]`)?.focus();
      return;
    }
    setStatus("submitting");
    setMessage("");
    const honeypot = (formRef.current?.elements.namedItem("website") as HTMLInputElement | null)?.value;
    try {
      const res = await fetch("/api/forms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formId, data: values, website: honeypot, startedAt: startedAt.current }),
      });
      const body = await res.json().catch(() => ({}));
      if (res.ok && body.ok) {
        setStatus("success");
        requestAnimationFrame(() => resultRef.current?.focus());
        return;
      }
      if (body.errors) setErrors(body.errors);
      setStatus("error");
      setMessage(
        body.error === "not_configured"
          ? `L'envoi en ligne n'est pas encore activé. Écrivez-nous directement à ${SITE.email} — votre saisie n'a pas été transmise.`
          : body.message ?? "Une erreur est survenue. Votre demande n'a pas été transmise.",
      );
    } catch {
      setStatus("error");
      setMessage("Connexion impossible. Vérifiez votre réseau puis réessayez — votre saisie est conservée.");
    }
    requestAnimationFrame(() => resultRef.current?.focus());
  }

  if (status === "success") {
    return (
      <div ref={resultRef} tabIndex={-1} className={styles.success} role="status">
        <span className={styles.successIcon}><Icon name="check" size={28} /></span>
        <p className={styles.successTitle}>Demande envoyée</p>
        <p>{def.success}</p>
      </div>
    );
  }

  return (
    // method=post: a submit before hydration must never put personal data in the URL.
    <form ref={formRef} method="post" action="/api/forms" className={styles.form} onSubmit={onSubmit} noValidate aria-busy={status === "submitting"}>
      <p className={styles.legend}>Les champs marqués <span aria-hidden="true">*</span><span className="visually-hidden">d&apos;un astérisque</span> sont obligatoires.</p>
      <div className={styles.grid}>
        {def.fields.map((f) => {
          const id = `${uid}-${f.name}`;
          const err = errors[f.name];
          const describedBy = [f.help && `${id}-help`, err && `${id}-err`].filter(Boolean).join(" ") || undefined;
          const common = {
            id, name: f.name, required: f.required, "aria-invalid": err ? true : undefined, "aria-describedby": describedBy,
            onBlur: () => blur(f),
          };
          if (f.type === "hidden") return null; // value comes from defaults
          if (f.type === "checkbox") {
            return (
              <div key={f.name} className={`${styles.field} ${styles.full}`}>
                <label className={styles.check} htmlFor={id}>
                  <input type="checkbox" {...common} checked={values[f.name] === true} onChange={(e) => set(f, e.target.checked)} />
                  <span>
                    {f.label}{f.required && <span aria-hidden="true"> *</span>}
                    {f.name === "confidentialite" && <> <Link href="/confidentialite" className="link" target="_blank">Lire la politique</Link></>}
                  </span>
                </label>
                {err && <p id={`${id}-err`} className={styles.error}><Icon name="alert" size={16} />{err}</p>}
              </div>
            );
          }
          const value = (values[f.name] as string) ?? "";
          return (
            <div key={f.name} className={`${styles.field} ${f.half ? "" : styles.full}`}>
              <label htmlFor={id} className={styles.label}>{f.label}{f.required && <span aria-hidden="true" className={styles.req}> *</span>}</label>
              {f.type === "textarea" ? (
                <textarea {...common} rows={6} maxLength={f.maxLength} value={value} onChange={(e) => set(f, e.target.value)} />
              ) : f.type === "select" ? (
                <select {...common} value={value} onChange={(e) => set(f, e.target.value)}>
                  <option value="" disabled>Choisir…</option>
                  {f.options!.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              ) : (
                <input {...common} type={f.type} autoComplete={f.autoComplete} maxLength={f.maxLength} value={value} onChange={(e) => set(f, e.target.value)} inputMode={f.type === "tel" ? "tel" : undefined} />
              )}
              {f.help && <p id={`${id}-help`} className={styles.help}>{f.help}</p>}
              {err && <p id={`${id}-err`} className={styles.error}><Icon name="alert" size={16} />{err}</p>}
            </div>
          );
        })}
        {/* Honeypot: hidden from people and assistive tech, filled only by bots. */}
        <div className={styles.hp} aria-hidden="true">
          <label htmlFor={`${uid}-website`}>Ne pas remplir</label>
          <input id={`${uid}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>
      </div>

      <div ref={resultRef} tabIndex={-1} aria-live="assertive" className={styles.live}>
        {status === "error" && <p className={styles.alert} role="alert"><Icon name="alert" />{message}</p>}
      </div>

      <div className={styles.footer}>
        <button type="submit" className="btn" disabled={status === "submitting"}>
          {status === "submitting" ? <><span className={styles.spinner} aria-hidden="true" />Envoi en cours…</> : <>{def.submitLabel}<Icon name="arrow" /></>}
        </button>
        <p className={styles.note}>Vos données servent uniquement à traiter cette demande.</p>
      </div>
    </form>
  );
}
