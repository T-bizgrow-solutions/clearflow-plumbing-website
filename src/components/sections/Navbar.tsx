import { useEffect, useState } from 'react';
import { Menu, Phone, X } from 'lucide-react';
import { navLinks, site } from '../../data/content';
import { isActiveNavPath, normalizePath } from '../../lib/routing';
import { Button } from '../ui/Button';

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentPath, setCurrentPath] = useState(() => normalizePath(window.location.pathname));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    setCurrentPath(normalizePath(window.location.pathname));
  }, []);

  const linkClass = (matchPath?: string) => {
    const active = isActiveNavPath(currentPath, matchPath);
    return `font-ui text-sm font-semibold uppercase tracking-wide transition-colors ${
      active ? 'text-brand-blue' : 'text-brand-dark hover:text-brand-blue'
    }`;
  };

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        scrolled ? 'border-gray-200 bg-white/95 shadow-sm backdrop-blur' : 'border-transparent bg-white'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <a href="/" className="flex shrink-0 items-center gap-3" aria-label={`${site.shortName} home`}>
          <img src="/logo.png" alt="" className="h-10 w-auto md:h-12" width={180} height={42} />
        </a>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Main">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className={linkClass(link.matchPath)}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={site.phoneHref}
            className="inline-flex items-center gap-2 font-ui text-sm font-semibold text-brand-blue"
          >
            <Phone className="h-4 w-4" aria-hidden />
            {site.phone}
          </a>
          <Button as="a" href="/#contact" size="default">
            Book now
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-brand-dark lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          className="border-t border-gray-200 bg-white px-4 py-4 lg:hidden"
          aria-label="Mobile"
        >
          <ul className="space-y-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`block font-ui text-base font-semibold uppercase tracking-wide ${
                    isActiveNavPath(currentPath, link.matchPath) ? 'text-brand-blue' : 'text-brand-dark'
                  }`}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a href={site.phoneHref} className="block font-ui font-semibold text-brand-blue">
                {site.phone}
              </a>
            </li>
            <li>
              <Button as="a" href="/#contact" className="w-full" onClick={() => setOpen(false)}>
                Book now
              </Button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
