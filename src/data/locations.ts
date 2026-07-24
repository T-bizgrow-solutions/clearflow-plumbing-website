import { getProjectBySlug, getServiceBySlug } from './services';

export type LocationFaq = {
  question: string;
  answer: string;
};

export type Location = {
  slug: string;
  path: string;
  name: string;
  title: string;
  description: string;
  intro: string;
  servicesEmphasised: string[];
  projectSlugs?: string[];
  faqs?: LocationFaq[];
};

export function locationPath(slug: string) {
  return `/locations/${slug}`;
}

export const locationsIndex = {
  path: '/locations',
  title: 'Areas we serve',
  description:
    'ClearFlow Plumbing & Maintenance serves Sydney suburbs and regions including the North Shore, Eastern Suburbs, and surrounding NSW — licensed, transparent, AS 3500 compliant.',
  intro:
    'From heritage homes in Double Bay to commercial fit-outs in Chatswood, we deliver residential, commercial, and industrial plumbing across the Sydney metro — with capacity to reach the Central Coast and beyond.',
} as const;

export const locations: Location[] = [
  {
    slug: 'chatswood',
    path: locationPath('chatswood'),
    name: 'Chatswood',
    title: 'Plumber in Chatswood',
    description:
      'Licensed plumbing for Chatswood homes, retail, and commercial tenancies — jet blasting, CCTV, fit-outs, and emergency call-outs from ClearFlow Plumbing.',
    intro:
      'Chatswood’s mix of high-rise living, retail strips, and office tenancies needs plumbers who can work around trading hours and building access rules. ClearFlow supports local property managers and shopfitters with commercial plumbing, grease-trap connections, and responsive maintenance — the same approach we used on our Chatswood retail fit-out project.',
    servicesEmphasised: [
      'commercial-plumbing',
      'jet-blasting',
      'cctv-drainage-camera',
      'backflow-tmv-testing',
    ],
    projectSlugs: ['chatswood'],
    faqs: [
      {
        question: 'Do you work after hours in Chatswood commercial buildings?',
        answer:
          'Yes. We schedule around tenancy access and can attend after-hours emergencies. Call 02 5502 5602 for urgent Chatswood jobs.',
      },
    ],
  },
  {
    slug: 'double-bay',
    path: locationPath('double-bay'),
    name: 'Double Bay',
    title: 'Plumber in Double Bay',
    description:
      'Heritage-sensitive residential plumbing in Double Bay — bathrooms, kitchens, drainage, and renovations by ClearFlow Plumbing & Maintenance.',
    intro:
      'Double Bay properties often combine period fabric with high-spec fixtures. Our Double Bay residential upgrade work focused on bathrooms and kitchens where concealment, compliance, and clean finishes matter as much as flow. We coordinate with builders and designers so heritage constraints and modern plumbing standards both get met.',
    servicesEmphasised: [
      'construction-plumbing',
      'cctv-drainage-camera',
      'locating-services',
      'jet-blasting',
    ],
    projectSlugs: ['double-bay'],
  },
  {
    slug: 'potts-point',
    path: locationPath('potts-point'),
    name: 'Potts Point',
    title: 'Plumber in Potts Point',
    description:
      'Apartment and terrace plumbing in Potts Point — concealed pipework, renovations, and drainage diagnostics from ClearFlow Plumbing.',
    intro:
      'Potts Point apartments and terraces leave little room for error: shared stacks, limited access, and neighbours who notice every noisy chase. ClearFlow’s Potts Point renovation work centred on concealed pipework and premium fixture installation with careful protection of living spaces — respectful, clean, and fully explained before we cut or chase.',
    servicesEmphasised: [
      'construction-plumbing',
      'commercial-plumbing',
      'cctv-drainage-camera',
      'jet-blasting',
    ],
    projectSlugs: ['potts-point'],
  },
  {
    slug: 'riverview',
    path: locationPath('riverview'),
    name: 'Riverview',
    title: 'Plumber in Riverview',
    description:
      'Family-home plumbing and drainage in Riverview and the lower North Shore — extensions, remediation, and fixture installs by ClearFlow.',
    intro:
      'Riverview and neighbouring lower North Shore streets are full of growing family homes and extensions that stress older drainage. Our Riverview project combined drainage remediation with new fixture installation for a home extension — typical of the residential work we deliver across this pocket of Sydney with transparent scopes and tidy handovers.',
    servicesEmphasised: [
      'construction-plumbing',
      'cctv-drainage-camera',
      'jet-blasting',
      'locating-services',
    ],
    projectSlugs: ['riverview'],
  },
  {
    slug: 'eastern-suburbs',
    path: locationPath('eastern-suburbs'),
    name: 'Eastern Suburbs',
    title: 'Plumber in Sydney Eastern Suburbs',
    description:
      'Residential and commercial plumbing across Sydney’s Eastern Suburbs — from Double Bay to coastal apartments — ClearFlow Plumbing & Maintenance.',
    intro:
      'Sydney’s Eastern Suburbs span harbour-side renovations, coastal apartments, and boutique commercial spaces. ClearFlow covers the region with construction plumbing, CCTV diagnostics, and emergency response — drawing on completed work in Double Bay and Potts Point while serving surrounding suburbs with the same mid-range pricing and complaint-free service standard.',
    servicesEmphasised: [
      'construction-plumbing',
      'commercial-plumbing',
      'cctv-drainage-camera',
      'backflow-tmv-testing',
      'jet-blasting',
    ],
    projectSlugs: ['double-bay', 'potts-point'],
    faqs: [
      {
        question: 'Which Eastern Suburbs do you cover?',
        answer:
          'We regularly work across the Eastern Suburbs including Double Bay, Potts Point, and nearby harbour and coastal suburbs. Contact us with your suburb and we will confirm attendance and timing.',
      },
    ],
  },
  {
    slug: 'north-shore',
    path: locationPath('north-shore'),
    name: 'North Shore',
    title: 'Plumber on Sydney’s North Shore',
    description:
      'North Shore plumbing for homes and businesses — Chatswood, Riverview, and surrounds — licensed ClearFlow Plumbing & Maintenance.',
    intro:
      'The North Shore runs from lower harbour suburbs through Chatswood’s commercial core. ClearFlow serves the corridor with residential drainage and extensions (as in Riverview), commercial fit-outs (as in Chatswood), and ongoing maintenance for strata and small business. AS 3500 compliance, confined-space and heights certifications, and clear communication come standard.',
    servicesEmphasised: [
      'commercial-plumbing',
      'construction-plumbing',
      'industrial-plumbing',
      'cctv-drainage-camera',
      'backflow-tmv-testing',
    ],
    projectSlugs: ['chatswood', 'riverview'],
    faqs: [
      {
        question: 'Can you cover North Shore strata complexes?',
        answer:
          'Yes. We support strata and commercial managers with scheduled maintenance, backflow and TMV testing, and emergency call-outs across the North Shore.',
      },
    ],
  },
];

export function getAllLocations() {
  return locations;
}

export function getLocationBySlug(slug: string) {
  return locations.find((location) => location.slug === slug);
}

export function getLocationByPath(path: string) {
  const normalized = path.replace(/\/$/, '') || '/';
  return locations.find((location) => location.path === normalized);
}

export function getLocationServices(location: Location) {
  return location.servicesEmphasised
    .map((slug) => getServiceBySlug(slug))
    .filter((service): service is NonNullable<typeof service> => Boolean(service));
}

export function getLocationProjects(location: Location) {
  return (location.projectSlugs ?? [])
    .map((slug) => getProjectBySlug(slug))
    .filter((project): project is NonNullable<typeof project> => Boolean(project));
}
