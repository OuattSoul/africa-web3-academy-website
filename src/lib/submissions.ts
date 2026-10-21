import { appendFile, mkdir } from "node:fs/promises";
import { randomUUID } from "node:crypto";
import path from "node:path";

// Submissions are appended as JSON lines and read by the admin app (admin/).
// Needs a persistent disk: set SUBMISSIONS_STORE=off on hosts with a read-only filesystem (e.g. Vercel).
export const SUBMISSIONS_FILE = process.env.SUBMISSIONS_FILE ?? path.join(process.cwd(), "data", "submissions.jsonl");
export const storeEnabled = () => process.env.SUBMISSIONS_STORE !== "off";

export interface Submission { id: string; createdAt: string; formId: string; data: Record<string, string | boolean> }

export async function storeSubmission(formId: string, data: Submission["data"]) {
  const entry: Submission = { id: randomUUID(), createdAt: new Date().toISOString(), formId, data };
  await mkdir(path.dirname(SUBMISSIONS_FILE), { recursive: true });
  // One appendFile per line: small writes are not interleaved, and the admin never rewrites this file.
  await appendFile(SUBMISSIONS_FILE, JSON.stringify(entry) + "\n", "utf8");
  return entry;
}
