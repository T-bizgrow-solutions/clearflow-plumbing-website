import { footer, site, socialLinks } from '../../data/content';

const footerLinkClass =
  'text-white/80 underline-offset-2 hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 focus-visible:ring-offset-surface-dark';

export function Footer() {
  return (
    <footer className="bg-surface-dark text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div>
          <h2 className="mb-4 font-ui text-sm font-semibold tracking-wider text-brand-blue">
            Company info
          </h2>
          <ul className="space-y-2 text-white/80">
            {footer.companyInfo.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-4 font-ui text-sm font-semibold tracking-wider text-brand-blue">Explore</h2>
          <ul className="space-y-2">
            <li>
              <a href="/services" className={footerLinkClass}>
                Services
              </a>
            </li>
            <li>
              <a href="/projects" className={footerLinkClass}>
                Projects
              </a>
            </li>
            <li>
              <a href="/insights" className={footerLinkClass}>
                Insights
              </a>
            </li>
            <li>
              <a href="/locations" className={footerLinkClass}>
                Locations
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="mb-4 font-ui text-sm font-semibold tracking-wider text-brand-blue">Contact</h2>
          <ul className="space-y-2 text-white/80">
            <li>
              <a href={site.phoneHref} className={footerLinkClass}>
                {site.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className={footerLinkClass}>
                {site.email}
              </a>
            </li>
            <li>Licence no. {site.license}</li>
          </ul>
        </div>

        <div>
          <h2 className="mb-4 font-ui text-sm font-semibold tracking-wider text-brand-blue">
            Socials &amp; accreditation
          </h2>
          <ul className="space-y-2">
            {socialLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={footerLinkClass}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 text-sm text-white/60 sm:flex-row sm:px-6 lg:px-8">
          <p>
            &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <img src="/logo.png" alt="" className="h-8 w-auto opacity-80" width={140} height={32} />
        </div>
      </div>
    </footer>
  );
}
