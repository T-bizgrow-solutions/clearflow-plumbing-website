import { getAllLocations, locationsIndex } from '../../data/locations';
import { pageHeroImages } from '../../data/content';
import { usePageMeta } from '../../hooks/usePageMeta';
import { Button } from '../ui/Button';
import { PageHeader } from '../ui/PageHeader';
import { Section } from '../ui/Section';

export function LocationsIndexPage() {
  const locations = getAllLocations();

  usePageMeta({
    title: locationsIndex.title,
    description: locationsIndex.description,
    path: locationsIndex.path,
  });

  return (
    <>
      <PageHeader
        eyebrow="Service area"
        title={locationsIndex.title}
        description={locationsIndex.intro}
        image={pageHeroImages.projects.image}
        imageAlt="Sydney suburbs served by ClearFlow Plumbing"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Locations', href: locationsIndex.path },
        ]}
      />
      <Section labelledBy="locations-list-heading">
        <h2 id="locations-list-heading" className="sr-only">
          All locations
        </h2>
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {locations.map((location) => (
            <li key={location.slug}>
              <a
                href={location.path}
                className="group flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-card transition-shadow hover:shadow-card-hover focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2"
              >
                <p className="mb-2 font-ui text-xs font-semibold uppercase tracking-wider text-brand-blue">
                  Location
                </p>
                <h3 className="mb-3 font-display text-xl font-bold text-brand-dark group-hover:text-brand-blue">
                  {location.name}
                </h3>
                <p className="flex-1 text-sm leading-relaxed text-gray-600">{location.description}</p>
                <span className="mt-4 font-ui text-sm font-semibold text-brand-blue">
                  View area →
                </span>
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-14 flex flex-wrap items-center justify-center gap-4 text-center">
          <Button as="a" href="/#contact" size="lg">
            Request a quote
          </Button>
          <Button as="a" href="/services" variant="outline" size="lg">
            Browse services
          </Button>
        </div>
      </Section>
    </>
  );
}
