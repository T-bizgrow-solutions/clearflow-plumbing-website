import {
  getAllArticles,
  getArticleOgImage,
  insightsIndex,
  resolveArticleHeroImageSrc,
  type Article,
  type ArticleBlock,
} from '../../data/articles';
import { formatDisplayDate } from '../../data/contentDates';
import { pageHeroImages } from '../../data/content';
import { buildArticleGraph } from '../../lib/seo/jsonLd';
import { usePageMeta } from '../../hooks/usePageMeta';
import { Button } from '../ui/Button';
import { PageHeader } from '../ui/PageHeader';
import { Section } from '../ui/Section';
import { JsonLd } from '../seo/JsonLd';

type InsightArticlePageProps = {
  article: Article;
};

function ArticleBlocks({ blocks }: { blocks: ArticleBlock[] }) {
  return (
    <div className="space-y-6">
      {blocks.map((block, index) => {
        const key = `${block.type}-${index}`;
        if (block.type === 'p') {
          return (
            <p key={key} className="text-lg leading-relaxed text-gray-700">
              {block.text}
            </p>
          );
        }
        if (block.type === 'h2') {
          return (
            <h2 key={key} className="pt-4 font-display text-2xl font-bold text-brand-dark">
              {block.text}
            </h2>
          );
        }
        if (block.type === 'h3') {
          return (
            <h3 key={key} className="pt-2 font-display text-xl font-bold text-brand-dark">
              {block.text}
            </h3>
          );
        }
        return (
          <ul key={key} className="list-disc space-y-2 pl-6 text-gray-700">
            {block.items.map((item) => (
              <li key={item} className="leading-relaxed">
                {item}
              </li>
            ))}
          </ul>
        );
      })}
    </div>
  );
}

export function InsightArticlePage({ article }: InsightArticlePageProps) {
  const heroSrc = resolveArticleHeroImageSrc(article.heroImage);
  const ogImage = getArticleOgImage(article);
  const related = getAllArticles().filter((item) => item.slug !== article.slug);

  usePageMeta({
    title: article.title,
    description: article.description,
    path: article.path,
    ogType: 'article',
    ogImage,
    publishedTime: article.datePublished,
    modifiedTime: article.dateModified,
  });

  return (
    <>
      <JsonLd data={buildArticleGraph(article)} />
      <PageHeader
        eyebrow="Insights"
        title={article.title}
        description={article.description}
        image={pageHeroImages.services.image}
        imageAlt={article.title}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Insights', href: insightsIndex.path },
          { label: article.title, href: article.path },
        ]}
      />

      <Section labelledBy="article-meta-heading">
        <h2 id="article-meta-heading" className="sr-only">
          Article details
        </h2>
        <dl className="mb-10 flex flex-wrap gap-x-8 gap-y-4 border-b border-gray-200 pb-8 font-ui text-sm">
          <div>
            <dt className="font-semibold uppercase tracking-wider text-brand-muted">Author</dt>
            <dd className="mt-1 font-medium text-brand-dark">
              {article.author}
              <span className="font-normal text-gray-600"> · {article.authorRole}</span>
            </dd>
          </div>
          <div>
            <dt className="font-semibold uppercase tracking-wider text-brand-muted">Published</dt>
            <dd className="mt-1 font-medium text-brand-dark">
              <time dateTime={article.datePublished}>
                {formatDisplayDate(article.datePublished)}
              </time>
            </dd>
          </div>
          <div>
            <dt className="font-semibold uppercase tracking-wider text-brand-muted">Updated</dt>
            <dd className="mt-1 font-medium text-brand-dark">
              <time dateTime={article.dateModified}>
                {formatDisplayDate(article.dateModified)}
              </time>
            </dd>
          </div>
          <div>
            <dt className="font-semibold uppercase tracking-wider text-brand-muted">Read time</dt>
            <dd className="mt-1 font-medium text-brand-dark">{article.readTimeMinutes} min</dd>
          </div>
        </dl>

        {heroSrc ? (
          <figure className="mb-10 overflow-hidden rounded-2xl bg-surface-alt">
            <img
              src={heroSrc}
              alt={article.title}
              className="h-auto w-full object-cover"
              loading="eager"
              decoding="async"
            />
          </figure>
        ) : null}

        <article className="mx-auto max-w-3xl">
          <ArticleBlocks blocks={article.blocks} />

          <div className="mt-12 flex flex-wrap gap-4">
            <Button as="a" href="/#contact" size="lg">
              Request a quote
            </Button>
            <Button as="a" href="/services" variant="outline" size="lg">
              View services
            </Button>
          </div>

          {related.length > 0 ? (
            <aside className="mt-14 border-t border-gray-200 pt-10" aria-labelledby="related-heading">
              <h2 id="related-heading" className="mb-4 font-display text-xl font-bold text-brand-dark">
                More insights
              </h2>
              <ul className="space-y-3">
                {related.map((item) => (
                  <li key={item.slug}>
                    <a
                      href={item.path}
                      className="font-ui font-semibold text-brand-blue hover:underline"
                    >
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            </aside>
          ) : null}
        </article>
      </Section>
    </>
  );
}
