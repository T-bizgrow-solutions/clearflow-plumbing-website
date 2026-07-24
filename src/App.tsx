import type { ReactNode } from 'react';
import { lazy, Suspense, useEffect, useState } from 'react';
import { About } from './components/sections/About';
import { AreasServed } from './components/sections/AreasServed';
import { Contact } from './components/sections/Contact';
import { Director } from './components/sections/Director';
import { Faq } from './components/sections/Faq';
import { Footer } from './components/sections/Footer';
import { Hero } from './components/sections/Hero';
import { Navbar } from './components/sections/Navbar';
import { ProjectsPreview } from './components/sections/ProjectsPreview';
import { ServicesPreview } from './components/sections/ServicesPreview';
import { WhyChooseUs } from './components/sections/WhyChooseUs';
import { InsightArticlePage } from './components/insights/InsightArticlePage';
import { InsightsIndexPage } from './components/insights/InsightsIndexPage';
import { LocationDetailPage } from './components/locations/LocationDetailPage';
import { LocationsIndexPage } from './components/locations/LocationsIndexPage';
import { ProjectsPage } from './components/projects/ProjectsPage';
import { ServiceDetailPage } from './components/services/ServiceDetailPage';
import { ServicesIndexPage } from './components/services/ServicesIndexPage';
import { JsonLd } from './components/seo/JsonLd';
import { faqs } from './data/content';
import { getArticleByPath, insightsIndex } from './data/articles';
import { getLocationByPath, locationsIndex } from './data/locations';
import { getAllServices, getServiceByPath, projectsPage, servicesIndex } from './data/services';
import { usePageMeta } from './hooks/usePageMeta';
import { useScrollToHash, useScrollToTop } from './hooks/useScrollToHash';
import { useSmoothAnchor } from './hooks/useSmoothAnchor';
import { buildHomePageGraph, buildServiceGraph } from './lib/seo/jsonLd';
import { normalizePath } from './lib/routing';

const WaterCursor = lazy(() =>
  import('./components/ui/WaterCursor').then((m) => ({ default: m.WaterCursor })),
);

function DeferredWaterCursor() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const show = () => setReady(true);
    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(show, { timeout: 3000 });
      return () => window.cancelIdleCallback(id);
    }
    const id = globalThis.setTimeout(show, 1000);
    return () => globalThis.clearTimeout(id);
  }, []);

  if (!ready) return null;

  return (
    <Suspense fallback={null}>
      <WaterCursor />
    </Suspense>
  );
}

function LandingPage() {
  useSmoothAnchor();
  useScrollToHash();
  usePageMeta({
    title: 'ClearFlow Plumbing — jet blasting, CCTV drainage & commercial plumbing',
    description:
      'ClearFlow Plumbing & Maintenance — licensed Sydney plumbers for residential, commercial and industrial work. Jet blasting, CCTV drainage, backflow testing and 24/7 emergency service.',
    path: '/',
  });

  return (
    <main id="main">
      <JsonLd data={buildHomePageGraph(faqs)} />
      <Hero />
      <About />
      <Director />
      <ServicesPreview />
      <ProjectsPreview />
      <WhyChooseUs />
      <AreasServed />
      <Faq />
      <Contact />
    </main>
  );
}

function NotFoundPage() {
  usePageMeta({
    title: 'Page not found',
    description: 'The page you are looking for could not be found.',
    path: window.location.pathname,
    noIndex: true,
  });

  return (
    <main id="main" className="section-pad">
      <div className="mx-auto max-w-xl text-center">
        <h1 className="mb-4 text-3xl font-extrabold text-brand-dark">Page not found</h1>
        <p className="mb-8 text-gray-600">Sorry, we could not find that page.</p>
        <a
          href="/"
          className="font-ui font-semibold text-brand-blue underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2"
        >
          Return home
        </a>
      </div>
    </main>
  );
}

function App() {
  const pathname = normalizePath(window.location.pathname);
  useScrollToTop(pathname);

  const service = getServiceByPath(pathname);
  const article = getArticleByPath(pathname);
  const location = getLocationByPath(pathname);
  const isServicesIndex = pathname === servicesIndex.path;
  const isProjectsPage = pathname === projectsPage.path;
  const isInsightsIndex = pathname === insightsIndex.path;
  const isLocationsIndex = pathname === locationsIndex.path;

  let page: ReactNode;

  if (service) {
    const related = getAllServices()
      .filter((item) => item.slug !== service.slug)
      .slice(0, 3);
    page = (
      <>
        <JsonLd data={buildServiceGraph(service)} />
        <ServiceDetailPage service={service} related={related} />
      </>
    );
  } else if (isServicesIndex) {
    page = <ServicesIndexPage />;
  } else if (isProjectsPage) {
    page = <ProjectsPage />;
  } else if (article) {
    page = <InsightArticlePage article={article} />;
  } else if (isInsightsIndex) {
    page = <InsightsIndexPage />;
  } else if (location) {
    page = <LocationDetailPage location={location} />;
  } else if (isLocationsIndex) {
    page = <LocationsIndexPage />;
  } else if (pathname === '/') {
    page = <LandingPage />;
  } else {
    page = <NotFoundPage />;
  }

  return (
    <div className="min-h-screen bg-white">
      <DeferredWaterCursor />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-brand-blue focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <Navbar />
      {page}
      <Footer />
    </div>
  );
}

export default App;
