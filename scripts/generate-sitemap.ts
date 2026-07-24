import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const siteUrl = (process.env.VITE_SITE_URL || 'https://clearflowpm.com').replace(/\/$/, '');
const lastmod = '2026-07-22';

const servicePaths = [
  '/services',
  '/services/jet-blasting',
  '/services/cctv-drainage-camera',
  '/services/locating-services',
  '/services/construction-plumbing',
  '/services/commercial-plumbing',
  '/services/backflow-tmv-testing',
  '/services/industrial-plumbing',
];

const routes = [{ path: '/', lastmod }, { path: '/projects', lastmod }, ...servicePaths.map((path) => ({ path, lastmod }))];

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
