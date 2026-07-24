import { useCallback, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Mail, Phone, Shield } from 'lucide-react';
import { heroSlides, site } from '../../data/content';
import { Button } from '../ui/Button';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

const AUTOPLAY_MS = 6000;

export function Hero() {
  const reducedMotion = usePrefersReducedMotion();
  const [activeSlide, setActiveSlide] = useState(0);

  const goTo = useCallback((index: number) => {
    const total = heroSlides.length;
    setActiveSlide(((index % total) + total) % total);
  }, []);

  const goPrev = useCallback(() => goTo(activeSlide - 1), [activeSlide, goTo]);
  const goNext = useCallback(() => goTo(activeSlide + 1), [activeSlide, goTo]);

  useEffect(() => {
    if (reducedMotion) return;
    const interval = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(interval);
  }, [reducedMotion, activeSlide]);

  const slide = heroSlides[activeSlide];

  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      aria-roledescription="carousel"
      className="relative h-[520px] overflow-hidden text-white md:h-[600px] lg:h-[640px]"
    >
      <div className="absolute inset-0" aria-hidden>
        {heroSlides.map((item, index) => (
          <div
            key={item.image}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ${
              index === activeSlide ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ backgroundImage: `url(${item.image})` }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/85 via-brand-dark/70 to-brand-blue/55" />
      </div>

      <button
        type="button"
        onClick={goPrev}
        className="absolute left-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-brand-dark/40 text-white backdrop-blur-sm transition-colors hover:bg-brand-dark/60 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent md:left-5"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" aria-hidden />
      </button>
      <button
        type="button"
        onClick={goNext}
        className="absolute right-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-brand-dark/40 text-white backdrop-blur-sm transition-colors hover:bg-brand-dark/60 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent md:right-5"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" aria-hidden />
      </button>

      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col px-4 sm:px-6 lg:px-8">
        <div className="grid flex-1 items-center gap-8 py-10 md:py-12 lg:grid-cols-2 lg:gap-10 lg:pb-4 lg:pt-8">
          <div>
            <p className="mb-3 font-ui text-sm font-semibold uppercase tracking-[0.2em] text-white/80">
              {site.tagline}
            </p>
            <h1
              id="hero-heading"
              className="mb-4 min-h-[2.6em] font-display text-3xl font-extrabold leading-tight md:min-h-[2.4em] md:text-4xl lg:text-5xl"
            >
              {slide.title}
            </h1>
            <p className="mb-6 min-h-[2.8em] max-w-xl text-base text-white/90 md:text-lg">{slide.subtitle}</p>
            <div className="flex flex-wrap gap-4">
              <Button as="a" href="/#contact" variant="secondary" size="lg">
                Make a booking
              </Button>
              <Button
                as="a"
                href="/#contact"
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-brand-blue"
              >
                Request a quote
              </Button>
            </div>
          </div>

          <div className="hidden rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur-sm md:block md:p-8 lg:justify-self-end lg:w-full lg:max-w-md">
            <dl className="grid gap-5 sm:grid-cols-3 lg:grid-cols-1">
              <div>
                <dt className="mb-1 flex items-center gap-2 font-ui text-xs font-semibold uppercase tracking-wider text-white/70">
                  <Phone className="h-4 w-4" aria-hidden />
                  Contact
                </dt>
                <dd>
                  <a href={site.phoneHref} className="text-xl font-semibold hover:underline">
                    {site.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="mb-1 flex items-center gap-2 font-ui text-xs font-semibold uppercase tracking-wider text-white/70">
                  <Mail className="h-4 w-4" aria-hidden />
                  Email
                </dt>
                <dd>
                  <a href={`mailto:${site.email}`} className="text-lg font-semibold hover:underline">
                    {site.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="mb-1 flex items-center gap-2 font-ui text-xs font-semibold uppercase tracking-wider text-white/70">
                  <Shield className="h-4 w-4" aria-hidden />
                  Lic no.
                </dt>
                <dd className="text-xl font-semibold">{site.license}</dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="relative z-10 flex shrink-0 justify-center gap-2 pb-6 pt-2">
          {heroSlides.map((item, index) => (
            <button
              key={item.title}
              type="button"
              className={`h-2 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-white ${
                index === activeSlide ? 'w-8 bg-white' : 'w-2 bg-white/40'
              }`}
              aria-label={`Show slide ${index + 1}: ${item.title}`}
              aria-pressed={index === activeSlide}
              onClick={() => goTo(index)}
            />
          ))}
        </div>
      </div>

      <span className="sr-only">{slide.imageAlt}</span>
    </section>
  );
}
