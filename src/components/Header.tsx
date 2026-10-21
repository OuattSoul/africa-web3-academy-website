"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { NAV, type NavItem } from "@/content/navigation";
import { Icon } from "./Icon";
import styles from "./Header.module.css";

export interface HeaderSession { title: string; href: string; date: string; modality: string }

const isActive = (pathname: string, href: string) => (href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/"));
const ext = (href: string) => (href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {});

export function Header({ sessions, communityHref }: { sessions: HeaderSession[]; communityHref: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState<number | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSub, setMobileSub] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const triggers = useRef<(HTMLButtonElement | null)[]>([]);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const hoverTimer = useRef<number | undefined>(undefined);

  const closeAll = useCallback(() => { setOpen(null); setMobileOpen(false); setMobileSub(null); }, []);

  useEffect(() => closeAll(), [pathname, closeAll]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Escape, outside click, focus trap for the mobile panel
  useEffect(() => {
    if (open === null && !mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (mobileOpen) { setMobileOpen(false); burgerRef.current?.focus(); }
        else if (open !== null) { triggers.current[open]?.focus(); setOpen(null); }
      }
      if (e.key === "Tab" && mobileOpen && headerRef.current) {
        const f = headerRef.current.querySelectorAll<HTMLElement>("[data-trap] a, [data-trap] button, [data-burger]");
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    const onDown = (e: PointerEvent) => { if (!headerRef.current?.contains(e.target as Node)) setOpen(null); };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => { document.removeEventListener("keydown", onKey); document.removeEventListener("pointerdown", onDown); };
  }, [open, mobileOpen]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // Hover opens menus for mouse users only, as an enhancement over click.
  const hover = (i: number | null) => (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    window.clearTimeout(hoverTimer.current);
    hoverTimer.current = window.setTimeout(() => setOpen(i), i === null ? 180 : 70);
  };

  const solid = scrolled || open !== null || mobileOpen;

  return (
    <header ref={headerRef} className={styles.header} data-solid={solid || undefined} data-mobile-open={mobileOpen || undefined}>
      <div className={`container ${styles.bar}`}>
        <Link href="/" className={styles.logo} aria-label="Africa Web3 Academy — accueil">
          <Image src="/brand/mark.png" alt="" width={287} height={303} className={styles.markOnLight} priority />
          <Image src="/brand/mark-negative.png" alt="" width={287} height={303} className={styles.markOnDark} priority />
          <span className={styles.wordmark}>Africa Web3<br />Academy</span>
        </Link>

        <nav aria-label="Navigation principale" className={styles.nav}>
          <ul role="list" className={styles.menu}>
            {NAV.map((item, i) =>
              item.mega ? (
                <li key={item.href} onPointerEnter={hover(i)} onPointerLeave={hover(null)}>
                  <button
                    ref={(el) => { triggers.current[i] = el; }}
                    type="button"
                    className={styles.item}
                    aria-expanded={open === i}
                    aria-controls={`mega-${i}`}
                    data-active={isActive(pathname, item.href) || undefined}
                    onClick={() => setOpen(open === i ? null : i)}
                  >
                    {item.label}
                    <Icon name="chevron" size={16} className={styles.chev} />
                  </button>
                  <MegaPanel id={`mega-${i}`} item={item} index={i} open={open === i} sessions={sessions} pathname={pathname} />
                </li>
              ) : (
                <li key={item.href}>
                  <Link href={item.href} className={styles.item} aria-current={isActive(pathname, item.href) ? "page" : undefined} data-active={isActive(pathname, item.href) || undefined}>
                    {item.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className={styles.actions}>
          <Link href={communityHref} {...ext(communityHref)} className={`${styles.cta} ${styles.ctaCommunity}`}>
            <span className={styles.ctaFor}>Apprenants</span>
            Rejoindre la communauté
          </Link>
          <Link href="/projet" className={`${styles.cta} ${styles.ctaProject}`}>
            <span className={styles.ctaFor}>Organisations</span>
            Parlons de votre projet
          </Link>
        </div>

        <button
          ref={burgerRef}
          data-burger
          type="button"
          className={styles.burger}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <Icon name={mobileOpen ? "close" : "menu"} size={24} />
          <span>{mobileOpen ? "Fermer" : "Menu"}</span>
        </button>
      </div>

      <div id="mobile-menu" className={styles.mobile} data-open={mobileOpen || undefined} data-trap role="dialog" aria-modal="true" aria-label="Menu principal">
        <nav aria-label="Navigation mobile" className={styles.mobileInner}>
          <ul role="list" className={styles.mobileList}>
            {NAV.map((item, i) => (
              <li key={item.href}>
                {item.mega ? (
                  <>
                    <button type="button" className={styles.mobileItem} aria-expanded={mobileSub === i} aria-controls={`msub-${i}`} onClick={() => setMobileSub(mobileSub === i ? null : i)} data-active={isActive(pathname, item.href) || undefined}>
                      {item.label}
                      <Icon name="chevron" size={20} className={styles.chev} />
                    </button>
                    <div id={`msub-${i}`} className={styles.mobileSub} data-open={mobileSub === i || undefined}>
                      <div>
                        <Link href={item.href} className={styles.mobileOverview}>Vue d&apos;ensemble — {item.label}</Link>
                        {item.mega.groups.map((g) => (
                          <div key={g.title} className={styles.mobileGroup}>
                            <p className={styles.groupTitle}>{g.title}</p>
                            <ul role="list">
                              {g.links.map((l) => (
                                <li key={l.href}><Link href={l.href}>{l.label}</Link></li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link href={item.href} className={styles.mobileItem} aria-current={isActive(pathname, item.href) ? "page" : undefined} data-active={isActive(pathname, item.href) || undefined}>
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
            <li><Link href="/contact" className={styles.mobileItem}>Contact</Link></li>
          </ul>
          <div className={styles.mobileCtas}>
            <Link href={communityHref} {...ext(communityHref)} className="btn btn--community">Rejoindre la communauté</Link>
            <Link href="/projet" className="btn">Parlons de votre projet</Link>
          </div>
        </nav>
      </div>
    </header>
  );
}

function MegaPanel({ id, item, index, open, sessions, pathname }: { id: string; item: NavItem; index: number; open: boolean; sessions: HeaderSession[]; pathname: string }) {
  const mega = item.mega!;
  return (
    <div id={id} className={styles.mega} data-open={open || undefined}>
      <div className={`container ${styles.megaGrid}`}>
        <div className={styles.megaIntro}>
          <p className={styles.megaIndex}>{String(index).padStart(2, "0")} — {item.label}</p>
          <p className={styles.megaTitle}>{mega.intro.title}</p>
          <p className={styles.megaText}>{mega.intro.text}</p>
          <Link href={mega.intro.cta.href} className="text-link">
            {mega.intro.cta.label} <Icon name="arrow" />
          </Link>
        </div>
        {mega.groups.map((g) => (
          <div key={g.title} className={styles.megaGroup}>
            <p className={styles.groupTitle}>{g.title}</p>
            <ul role="list">
              {g.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={styles.megaLink} aria-current={pathname === l.href ? "page" : undefined}>
                    <span>{l.label}</span>
                    {l.description && <small>{l.description}</small>}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        {mega.showSessions && (
          <div className={styles.megaAside}>
            <p className={styles.groupTitle}>Prochaines sessions</p>
            {sessions.length ? (
              <ul role="list">
                {sessions.slice(0, 3).map((s) => (
                  <li key={s.href + s.date}>
                    <Link href={s.href} className={styles.session}>
                      <span className={styles.sessionDate}>{s.date}</span>
                      <span>{s.title}</span>
                      <small>{s.modality}</small>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className={styles.megaText}>
                Aucune date publiée pour le moment. <Link href="/communaute#inscription" className="link">Soyez prévenu de l&apos;ouverture des inscriptions.</Link>
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
