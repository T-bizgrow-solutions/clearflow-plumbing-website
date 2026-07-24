function resolveSiteUrl() {
  const fromVite =
    typeof import.meta !== 'undefined' &&
    import.meta.env &&
    typeof import.meta.env.VITE_SITE_URL === 'string'
      ? import.meta.env.VITE_SITE_URL
      : undefined;
  const fromProcess =
    typeof process !== 'undefined' && typeof process.env?.VITE_SITE_URL === 'string'
      ? process.env.VITE_SITE_URL
      : undefined;
  return (fromVite || fromProcess || 'https://clearflowpm.com').replace(/\/$/, '');
}

const siteUrl = resolveSiteUrl();

export const defaultMeta = {
  siteName: 'ClearFlow Plumbing & Maintenance',
  ogImage: `${siteUrl}/og-image.png`,
};

export type PageMetaInput = {
  title: string;
  description: string;
  path?: string;
  ogType?: 'website' | 'article';
  ogImage?: string;
  noIndex?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
};

export function absoluteUrl(path = '/') {
  if (path.startsWith('http')) return path;
  return `${siteUrl}${path.startsWith('/') ? path : `/${path}`}`;
}

export function pageTitle(title: string) {
  return `${title} | ClearFlow Plumbing`;
}
