import { MapPin } from 'lucide-react';
import { site } from '../../data/content';
import { getAllLocations, locationsIndex } from '../../data/locations';
import { Section } from '../ui/Section';
import { Button } from '../ui/Button';

export function AreasServed() {
  const locations = getAllLocations();

  return (
    <Section id="areas" labelledBy="areas-heading">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="mb-3 font-ui text-sm font-semibold uppercase tracking-wider text-brand-blue">
            Areas served
          </p>
          <h2 id="areas-heading" className="mb-6 text-3xl font-extrabold text-brand-dark md:text-4xl">
            Plumbing across Sydney and NSW
          </h2>
          <p className="mb-6 text-lg leading-relaxed text-gray-700">
            We serve the {site.serviceArea.toLowerCase()}. Choose a suburb or region below for local
            details, or contact us if your site sits just outside these pages — we regularly travel
            further for commercial and industrial work.
          </p>
          <Button as="a" href={locationsIndex.path} variant="outline">
            View all locations
          </Button>
        </div>

        <ul className="grid gap-3 sm:grid-cols-2">
          {locations.map((location) => (
            <li key={location.slug}>
              <a
                href={location.path}
                className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white px-5 py-4 font-ui text-sm font-semibold text-brand-dark shadow-card transition-shadow hover:shadow-card-hover focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2"
              >
                <MapPin className="h-4 w-4 shrink-0 text-brand-blue" aria-hidden />
                {location.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
