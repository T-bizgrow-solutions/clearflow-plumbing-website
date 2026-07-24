import type { Article } from '../../data/articles';
import { getArticleOgImage, insightsIndex } from '../../data/articles';
import { site, socialLinks } from '../../data/content';
import { SITE_CONTENT_LASTMOD } from '../../data/contentDates';
import type { Location } from '../../data/locations';
import { locationsIndex } from '../../data/locations';
import type { Service } from '../../data/services';
import { getAllServices } from '../../data/services';
import { absoluteUrl, defaultMeta } from './site';

export type FaqItem = {
  question: string;
  answer: string;
};

function graph(...nodes: Record<string, unknown>[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': nodes,
  };
}

function organizationId() {
  return `${absoluteUrl('/')}#organization`;
}

function websiteId() {
  return `${absoluteUrl('/')}#website`;
}

function sameAsLinks() {
  return socialLinks.map((link) => link.href);
}

function telephoneE164() {
  return site.phoneHref.replace(/^tel:/, '');
}

function areaServedPlace() {
  return {
    '@type': 'AdministrativeArea',
    name: site.serviceArea,
  };
}

/** Organization + ProfessionalService / LocalBusiness base entity (no AggregateRating). */
export function buildOrganizationGraph() {
  const orgId = organizationId();
  const logoUrl = absoluteUrl('/logo.png');

  return graph(
    {
      '@type': 'Organization',
      '@id': orgId,
      name: site.name,
      url: absoluteUrl('/'),
      logo: { '@type': 'ImageObject', url: logoUrl },
      email: site.email,
      telephone: telephoneE164(),
      sameAs: sameAsLinks(),
      areaServed: areaServedPlace(),
    },
    {
      '@type': ['ProfessionalService', 'LocalBusiness'],
      '@id': `${absoluteUrl('/')}#localbusiness`,
      name: site.name,
      url: absoluteUrl('/'),
      image: absoluteUrl('/og-image.png'),
      email: site.email,
      telephone: telephoneE164(),
      priceRange: '$$',
      areaServed: areaServedPlace(),
      sameAs: sameAsLinks(),
      parentOrganization: { '@id': orgId },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Plumbing services',
        itemListElement: getAllServices().map((service, index) => ({
          '@type': 'Offer',
          position: index + 1,
          itemOffered: {
            '@type': 'Service',
            name: service.title,
            description: service.shortDescription,
            url: absoluteUrl(service.path),
            provider: { '@id': orgId },
            areaServed: areaServedPlace(),
          },
        })),
      },
    },
  );
}

export function buildHomePageGraph(faqs: FaqItem[]) {
  const orgId = organizationId();
  const pageUrl = absoluteUrl('/');
  const orgGraph = buildOrganizationGraph();
  const orgNodes = (orgGraph['@graph'] as Record<string, unknown>[]) ?? [];

  return graph(
    ...orgNodes,
    {
      '@type': 'WebSite',
      '@id': websiteId(),
      url: absoluteUrl('/'),
      name: site.name,
      publisher: { '@id': orgId },
      inLanguage: 'en-AU',
    },
    {
      '@type': 'WebPage',
      '@id': `${pageUrl}#webpage`,
      url: pageUrl,
      name: `${site.shortName} — ${site.tagline}`,
      isPartOf: { '@id': websiteId() },
      about: { '@id': orgId },
      dateModified: SITE_CONTENT_LASTMOD,
      inLanguage: 'en-AU',
    },
    {
      '@type': 'FAQPage',
      '@id': `${pageUrl}#faq`,
      mainEntity: faqs.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    },
  );
}

export function buildServiceGraph(service: Service) {
  const url = absoluteUrl(service.path);
  const orgId = organizationId();

  return graph(
    {
      '@type': 'Service',
      '@id': `${url}#service`,
      name: service.title,
      description: service.shortDescription,
      url,
      provider: { '@id': orgId },
      areaServed: areaServedPlace(),
      image: absoluteUrl(service.image),
    },
    {
      '@type': 'WebPage',
      '@id': `${url}#webpage`,
      url,
      name: service.title,
      description: service.shortDescription,
      dateModified: SITE_CONTENT_LASTMOD,
      inLanguage: 'en-AU',
      isPartOf: { '@id': websiteId() },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('/') },
        { '@type': 'ListItem', position: 2, name: 'Services', item: absoluteUrl('/services') },
        { '@type': 'ListItem', position: 3, name: service.title, item: url },
      ],
    },
  );
}

export function buildArticleGraph(article: Article) {
  const url = absoluteUrl(article.path);
  const imageUrl = getArticleOgImage(article) ?? defaultMeta.ogImage;

  return graph(
    {
      '@type': 'Article',
      '@id': `${url}#article`,
      headline: article.title,
      description: article.description,
      url,
      datePublished: article.datePublished,
      dateModified: article.dateModified,
      inLanguage: 'en-AU',
      image: { '@type': 'ImageObject', url: imageUrl },
      author: {
        '@type': 'Person',
        name: article.author,
        jobTitle: article.authorRole,
      },
      publisher: {
        '@type': 'Organization',
        name: site.name,
        logo: { '@type': 'ImageObject', url: absoluteUrl('/logo.png') },
      },
      mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('/') },
        { '@type': 'ListItem', position: 2, name: 'Insights', item: absoluteUrl(insightsIndex.path) },
        { '@type': 'ListItem', position: 3, name: article.title, item: url },
      ],
    },
  );
}

export function buildInsightsCollectionGraph(articles: Article[]) {
  const url = absoluteUrl(insightsIndex.path);

  return graph({
    '@type': 'CollectionPage',
    '@id': `${url}#webpage`,
    url,
    name: insightsIndex.title,
    description: insightsIndex.description,
    dateModified: SITE_CONTENT_LASTMOD,
    inLanguage: 'en-AU',
    isPartOf: { '@id': websiteId() },
    hasPart: articles.map((article) => ({
      '@type': 'Article',
      headline: article.title,
      url: absoluteUrl(article.path),
      dateModified: article.dateModified,
    })),
  });
}

export function buildLocationGraph(location: Location) {
  const url = absoluteUrl(location.path);
  const orgId = organizationId();

  return graph(
    {
      '@type': 'WebPage',
      '@id': `${url}#webpage`,
      url,
      name: location.title,
      description: location.description,
      dateModified: SITE_CONTENT_LASTMOD,
      inLanguage: 'en-AU',
      isPartOf: { '@id': websiteId() },
      about: {
        '@type': 'Place',
        name: location.name,
        containedInPlace: areaServedPlace(),
      },
    },
    {
      '@type': ['ProfessionalService', 'LocalBusiness'],
      '@id': `${url}#localbusiness`,
      name: `${site.shortName} — ${location.name}`,
      url,
      telephone: telephoneE164(),
      email: site.email,
      areaServed: {
        '@type': 'Place',
        name: location.name,
      },
      parentOrganization: { '@id': orgId },
      sameAs: sameAsLinks(),
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('/') },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Locations',
          item: absoluteUrl(locationsIndex.path),
        },
        { '@type': 'ListItem', position: 3, name: location.name, item: url },
      ],
    },
  );
}
