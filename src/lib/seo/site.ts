const siteUrl = (import.meta.env.VITE_SITE_URL || 'https://clearflowpm.com').replace(/\/$/, '');

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
};

export function absoluteUrl(path = '/') {
  if (path.startsWith('http')) return path;
  return `${siteUrl}${path.startsWith('/') ? path : `/${path}`}`;
}

export function pageTitle(title: string) {
  return `${title} | ClearFlow Plumbing`;
}
