import { absoluteUrl } from '../lib/seo/site';
import { SITE_CONTENT_LASTMOD } from './contentDates';

export const ARTICLE_AUTHOR = {
  name: 'Joshua Nehme',
  role: 'Director, ClearFlow Plumbing',
} as const;

export type ArticleBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'ul'; items: string[] };

export type Article = {
  slug: string;
  path: string;
  heroImage?: string;
  title: string;
  description: string;
  author: string;
  authorRole: string;
  datePublished: string;
  dateModified: string;
  readTimeMinutes: number;
  blocks: ArticleBlock[];
};

export function articlePath(slug: string) {
  return `/insights/${slug}`;
}

export const insightsIndex = {
  path: '/insights',
  title: 'Plumbing insights',
  description:
    'Practical guides from ClearFlow Plumbing on emergencies, CCTV drain inspections, backflow and TMV compliance for Sydney homes, strata, and commercial sites.',
} as const;

export const articles: Article[] = [
  {
    slug: 'emergency-plumber-sydney',
    path: articlePath('emergency-plumber-sydney'),
    heroImage: '/og-image.png',
    title: 'Emergency plumber in Sydney: what to expect on response times',
    description:
      'How ClearFlow handles after-hours plumbing emergencies across Sydney — typical response windows, what to do before we arrive, and when to call versus wait.',
    author: ARTICLE_AUTHOR.name,
    authorRole: ARTICLE_AUTHOR.role,
    datePublished: '2026-07-25',
    dateModified: '2026-07-25',
    readTimeMinutes: 6,
    blocks: [
      {
        type: 'p',
        text: 'A burst pipe, blocked sewer, or sudden hot water failure rarely waits for business hours. ClearFlow Plumbing & Maintenance provides 24/7 emergency call-outs across the Sydney metropolitan area, Central Coast, and beyond — with the same licensed, AS 3500–compliant workmanship you get on planned jobs.',
      },
      {
        type: 'h2',
        text: 'What “immediate response” means in practice',
      },
      {
        type: 'p',
        text: 'Response time depends on traffic, job location, and how many emergencies are already open. In most Sydney metro cases we aim to mobilise promptly once we confirm the issue and site access. For true emergencies — active flooding, sewage overflow, or no water to a commercial kitchen — we prioritise accordingly and keep you updated while we are en route.',
      },
      {
        type: 'ul',
        items: [
          'Active leaks and burst pipes that threaten property damage',
          'Blocked sewers or toilets backing up into living or trading areas',
          'No hot water for commercial kitchens, aged care, or multi-unit sites',
          'Gas-related plumbing concerns that need a licensed plumber on site',
        ],
      },
      {
        type: 'h2',
        text: 'What to do before the plumber arrives',
      },
      {
        type: 'p',
        text: 'If it is safe to do so, shut off the isolation valve for the affected fixture or the main water meter. Move valuables away from water, photograph the damage for insurance, and clear a path to the affected area. Do not open sealed wall cavities or electrical boards yourself — leave diagnostics to the licensed team.',
      },
      {
        type: 'h2',
        text: 'Transparent pricing, even after hours',
      },
      {
        type: 'p',
        text: 'We explain the scope and cost before major work begins. Emergency call-outs may include after-hours rates; you will know what you are approving. Mid-range pricing with no hidden surprises is a ClearFlow commitment — day or night.',
      },
      {
        type: 'p',
        text: 'Need help now? Call 02 5502 5602 or request a callback via our contact form. For non-urgent work, book a planned visit and we will schedule around your property or trading hours.',
      },
    ],
  },
  {
    slug: 'when-you-need-cctv-drain-inspection',
    path: articlePath('when-you-need-cctv-drain-inspection'),
    heroImage: '/og-image.png',
    title: 'When you need a CCTV drain inspection',
    description:
      'Signs your Sydney property needs a CCTV drainage camera survey — recurring blockages, pre-purchase checks, insurance claims, and how footage reduces excavation guesswork.',
    author: ARTICLE_AUTHOR.name,
    authorRole: ARTICLE_AUTHOR.role,
    datePublished: '2026-07-25',
    dateModified: '2026-07-25',
    readTimeMinutes: 7,
    blocks: [
      {
        type: 'p',
        text: 'CCTV drain inspection puts a camera inside your sewer or stormwater line so you can see cracks, root intrusion, collapsed sections, and grease build-up — before you dig. For homeowners, strata committees, and commercial managers across Sydney, it is often the difference between a targeted repair and an expensive exploratory excavation.',
      },
      {
        type: 'h2',
        text: 'Clear signs you should book a camera survey',
      },
      {
        type: 'ul',
        items: [
          'Drains that block repeatedly in the same line despite clearing',
          'Slow drainage across multiple fixtures on one stack',
          'Unexplained damp patches, sinkholes, or odours near drainage runs',
          'Pre-purchase or pre-renovation due diligence on older pipework',
          'Insurance or building defect reports that need visual evidence',
        ],
      },
      {
        type: 'h2',
        text: 'What you receive from ClearFlow',
      },
      {
        type: 'p',
        text: 'We run a live video inspection of the relevant sewer or stormwater section, record findings for your records, and pinpoint locations so repair scope stays focused. Where jet blasting can clear the obstruction without structural repair, we can often combine inspection and clearing on the same visit.',
      },
      {
        type: 'h2',
        text: 'CCTV first, dig later',
      },
      {
        type: 'p',
        text: 'Guesswork is expensive on Sydney sites — landscaping, driveways, and heritage surrounds do not forgive unnecessary excavation. A camera survey gives builders, owners, and insurers a shared view of the problem so quotes and timelines stay honest.',
      },
      {
        type: 'p',
        text: 'Ask about our CCTV drainage camera service when you request a quote, or pair it with jet blasting if you already know the line is heavily soiled.',
      },
    ],
  },
  {
    slug: 'backflow-tmv-testing-strata',
    path: articlePath('backflow-tmv-testing-strata'),
    heroImage: '/og-image.png',
    title: 'Backflow and TMV testing for strata and commercial sites',
    description:
      'Why Sydney strata and commercial properties need scheduled backflow prevention and TMV testing — compliance, safety, and what ClearFlow documents for managers.',
    author: ARTICLE_AUTHOR.name,
    authorRole: ARTICLE_AUTHOR.role,
    datePublished: '2026-07-25',
    dateModified: '2026-07-25',
    readTimeMinutes: 8,
    blocks: [
      {
        type: 'p',
        text: 'Backflow prevention devices and thermostatic mixing valves (TMVs) protect potable water and control outlet temperatures. For strata schemes, healthcare, hospitality, and commercial landlords in NSW, testing is not optional — it is a compliance and safety obligation with documentation that auditors and insurers expect to see.',
      },
      {
        type: 'h2',
        text: 'Backflow prevention in plain terms',
      },
      {
        type: 'p',
        text: 'Backflow devices stop contaminated water from reversing into the drinking supply. Commercial kitchens, irrigation, fire services, and process connections are common risk points. Devices must be tested on a schedule; failed units need repair or replacement and re-test before the site is signed off.',
      },
      {
        type: 'h2',
        text: 'Why TMVs matter for multi-residential and care sites',
      },
      {
        type: 'p',
        text: 'TMVs blend hot and cold water to a safe delivery temperature, reducing scald risk in bathrooms and ensuites. Regular testing confirms valves still hold setpoints. ClearFlow installs, tests, and certifies TMVs with paperwork property managers can file against their compliance calendar.',
      },
      {
        type: 'ul',
        items: [
          'Scheduled backflow device testing and maintenance',
          'TMV installation, testing, and certification',
          'Compliance documentation for owners corporations and facilities teams',
          'Re-test reminders so annual obligations are not missed',
        ],
      },
      {
        type: 'h2',
        text: 'Working with strata and commercial managers',
      },
      {
        type: 'p',
        text: 'We coordinate access with building managers, minimise disruption to residents and tenants, and leave sites clean. Mid-range pricing with clear scopes helps committees approve work without surprises — and our unblemished complaint record reflects how we treat every site.',
      },
      {
        type: 'p',
        text: 'Book backflow and TMV testing through our contact form, or call 02 5502 5602 to discuss a multi-site maintenance program across Sydney and NSW.',
      },
    ],
  },
];

export function getAllArticles() {
  return articles;
}

export function getArticleBySlug(slug: string) {
  return articles.find((article) => article.slug === slug);
}

export function getArticleByPath(path: string) {
  const normalized = path.replace(/\/$/, '') || '/';
  return articles.find((article) => article.path === normalized);
}

/** Site-root path for heroes. Accepts empty values, `/…` paths, or clearflowpm.com URLs. */
export function resolveArticleHeroImageSrc(heroImage?: string): string | null {
  const trimmed = heroImage?.trim();
  if (!trimmed) return null;
  if (trimmed.startsWith('/')) return trimmed;

  try {
    const { hostname, pathname } = new URL(trimmed);
    if (hostname === 'clearflowpm.com' || hostname === 'www.clearflowpm.com') {
      return pathname;
    }
    return trimmed;
  } catch {
    return null;
  }
}

export function getArticleOgImage(article: Article) {
  const src = resolveArticleHeroImageSrc(article.heroImage);
  return src ? absoluteUrl(src) : undefined;
}

export function getArticlesLastmod(): string {
  const dates = articles.map((a) => a.dateModified).sort();
  return dates.length > 0 ? dates[dates.length - 1]! : SITE_CONTENT_LASTMOD;
}
