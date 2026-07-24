import { useEffect } from 'react';
import { absoluteUrl, defaultMeta, pageTitle, type PageMetaInput } from '../lib/seo/site';

function upsertMeta(selector: string, attrs: Record<string, string>) {
  let el = document.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement('meta');
    document.head.appendChild(el);
  }
  Object.entries(attrs).forEach(([key, value]) => el!.setAttribute(key, value));
}

function upsertLink(rel: string, href: string) {
  let el = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.rel = rel;
    document.head.appendChild(el);
  }
  el.href = href;
}

export function usePageMeta(meta: PageMetaInput) {
  useEffect(() => {
    const previousTitle = document.title;
    const canonical = absoluteUrl(meta.path ?? '/');
    const title = pageTitle(meta.title);
    const ogImage = meta.ogImage ?? defaultMeta.ogImage;
    const robots = meta.noIndex ? 'noindex, nofollow' : 'index, follow';

    document.title = title;
    upsertMeta('meta[name="description"]', { name: 'description', content: meta.description });
    upsertMeta('meta[name="robots"]', { name: 'robots', content: robots });
    upsertLink('canonical', canonical);
    upsertMeta('meta[property="og:type"]', { property: 'og:type', content: meta.ogType ?? 'website' });
    upsertMeta('meta[property="og:url"]', { property: 'og:url', content: canonical });
    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: meta.title });
    upsertMeta('meta[property="og:description"]', {
      property: 'og:description',
      content: meta.description,
    });
    upsertMeta('meta[property="og:image"]', { property: 'og:image', content: ogImage });
    upsertMeta('meta[property="og:site_name"]', {
      property: 'og:site_name',
      content: defaultMeta.siteName,
    });
    upsertMeta('meta[property="og:locale"]', { property: 'og:locale', content: 'en_AU' });
    upsertMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' });
    upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: meta.title });
    upsertMeta('meta[name="twitter:description"]', {
      name: 'twitter:description',
      content: meta.description,
    });
    upsertMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: ogImage });

    if (meta.ogType === 'article') {
      if (meta.publishedTime) {
        upsertMeta('meta[property="article:published_time"]', {
          property: 'article:published_time',
          content: meta.publishedTime,
        });
      }
      if (meta.modifiedTime) {
        upsertMeta('meta[property="article:modified_time"]', {
          property: 'article:modified_time',
          content: meta.modifiedTime,
        });
      }
    }

    return () => {
      document.title = previousTitle;
    };
  }, [
    meta.title,
    meta.description,
    meta.path,
    meta.ogType,
    meta.ogImage,
    meta.noIndex,
    meta.publishedTime,
    meta.modifiedTime,
  ]);
}
