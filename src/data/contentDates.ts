/** Shared content freshness for sitemap lastmod and JSON-LD dateModified. */
export const SITE_CONTENT_LASTMOD = '2026-07-25';

/** ISO date (YYYY-MM-DD) → true if valid calendar date string shape. */
export function isIsoDate(value: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
}

/** Prefer entity dateModified when present; otherwise site-wide lastmod. */
export function resolveLastmod(dateModified?: string): string {
  if (dateModified && isIsoDate(dateModified)) return dateModified;
  return SITE_CONTENT_LASTMOD;
}

/** Format ISO date for en-AU display (e.g. 25 Jul 2026). */
export function formatDisplayDate(isoDate: string): string {
  const [year, month, day] = isoDate.split('-').map(Number);
  if (!year || !month || !day) return isoDate;
  return new Intl.DateTimeFormat('en-AU', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(Date.UTC(year, month - 1, day)));
}
