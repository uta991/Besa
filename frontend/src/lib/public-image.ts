import { existsSync } from "node:fs";
import { join } from "node:path";

/**
 * Returns the public URL for an asset under `public/` if the file actually
 * exists, otherwise null. Lets components render a real photo when it's been
 * dropped in, and a styled placeholder until then — with no broken images.
 *
 * Server Components only (uses the filesystem).
 */
export function publicImage(relPath: string): string | null {
  const clean = relPath.replace(/^\/+/, "");
  const full = join(process.cwd(), "public", clean);
  return existsSync(full) ? `/${clean}` : null;
}
