import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { getAllArticles, insightsIndex } from '../src/data/articles';
import { SITE_CONTENT_LASTMOD, resolveLastmod } from '../src/data/contentDates';
import { getAllLocations, locationsIndex } from '../src/data/locations';
import { getAllServices, projectsPage, servicesIndex } from '../src/data/services';

const siteUrl = (process.env.VITE_SITE_URL || 'https://clearflowpm.com').replace(/\/$/, '');

type SitemapEntry = {
  path: string;
  lastmod: string;
};

const routes: SitemapEntry[] = [
  { path: '/', lastmod: SITE_CONTENT_LASTMOD },
  { path: servicesIndex.path, lastmod: SITE_CONTENT_LASTMOD },
  ...getAllServices().map((service) => ({
    path: service.path,
    lastmod: SITE_CONTENT_LASTMOD,
  })),
  { path: projectsPage.path, lastmod: SITE_CONTENT_LASTMOD },
  { path: insightsIndex.path, lastmod: SITE_CONTENT_LASTMOD },
  ...getAllArticles().map((article) => ({
    path: article.path,
    lastmod: resolveLastmod(article.dateModified),
  })),
  { path: locationsIndex.path, lastmod: SITE_CONTENT_LASTMOD },
  ...getAllLocations().map((location) => ({
    path: location.path,
    lastmod: SITE_CONTENT_LASTMOD,
  })),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) => `  <url>
    <loc>${siteUrl}${route.path === '/' ? '/' : route.path}</loc>
    <lastmod>${route.lastmod}</lastmod>
  </url>`,
  )
  .join('\n')}
</urlset>
`;

const out = resolve(process.cwd(), 'public/sitemap.xml');
writeFileSync(out, xml);
console.log(`Wrote ${out} (${routes.length} URLs)`);
