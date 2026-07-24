import { ArrowRight } from 'lucide-react';
import {
  getAllArticles,
  insightsIndex,
  resolveArticleHeroImageSrc,
} from '../../data/articles';
import { formatDisplayDate } from '../../data/contentDates';
import { pageHeroImages } from '../../data/content';
import { buildInsightsCollectionGraph } from '../../lib/seo/jsonLd';
import { usePageMeta } from '../../hooks/usePageMeta';
import { Button } from '../ui/Button';
import { PageHeader } from '../ui/PageHeader';
import { Section } from '../ui/Section';
import { JsonLd } from '../seo/JsonLd';

export function InsightsIndexPage() {
  const articles = getAllArticles();

  usePageMeta({
    title: insightsIndex.title,
    description: insightsIndex.description,
    path: insightsIndex.path,
  });

  return (
    <>
      <JsonLd data={buildInsightsCollectionGraph(articles)} />
      <PageHeader
        eyebrow="Insights"
        title={insightsIndex.title}
        description={insightsIndex.description}
        image={pageHeroImages.services.image}
        imageAlt="ClearFlow plumbing insights"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Insights', href: insightsIndex.path },
        ]}
      />
      <Section labelledBy="insights-list-heading">
        <h2 id="insights-list-heading" className="sr-only">
          All articles
        </h2>
        <ul className="mx-auto grid max-w-4xl gap-6">
          {articles.map((article) => {
            const heroSrc = resolveArticleHeroImageSrc(article.heroImage);
            return (
              <li key={article.slug}>
                <a
                  href={article.path}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-card transition-shadow hover:shadow-card-hover focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2 md:flex-row"
                >
                  {heroSrc ? (
                    <div className="md:w-52 md:shrink-0">
                      <img
                        src={heroSrc}
                        alt=""
                        className="h-40 w-full object-cover md:h-full"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  ) : null}
                  <div className="flex flex-1 flex-col p-6 md:p-8">
                    <p className="font-ui text-xs font-semibold uppercase tracking-wider text-brand-muted">
                      <span className="text-brand-blue">{article.author}</span>
                      {' · '}
                      <time dateTime={article.dateModified}>
                        {formatDisplayDate(article.dateModified)}
                      </time>
                      {' · '}
                      {article.readTimeMinutes} min read
                    </p>
                    <h3 className="mt-3 font-display text-xl font-bold text-brand-dark group-hover:text-brand-blue">
                      {article.title}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-600">
                      {article.description}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 font-ui text-sm font-semibold text-brand-blue">
                      Read article
                      <ArrowRight
                        className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                        aria-hidden
                      />
                    </span>
                  </div>
                </a>
              </li>
            );
          })}
        </ul>
        <div className="mt-14 text-center">
          <Button as="a" href="/#contact" size="lg">
            Speak to our team
          </Button>
        </div>
      </Section>
    </>
  );
}
