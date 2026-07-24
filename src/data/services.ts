export type Service = {
  slug: string;
  path: string;
  title: string;
  shortDescription: string;
  image: string;
  intro: string;
  details: string[];
  idealFor: string[];
};

export const servicesIndex = {
  path: '/services',
  title: 'Plumbing services',
  description:
    'Jet blasting, CCTV drainage, construction and commercial plumbing, backflow testing, and industrial solutions across Sydney and NSW. Licensed contractor — AS 3500 compliant.',
} as const;

export const services: Service[] = [
  {
    slug: 'jet-blasting',
    path: '/services/jet-blasting',
    title: 'Jet blasting service',
    shortDescription: 'Advanced solutions for clearing the toughest blockages',
    image: '/services/service-1.png',
    intro:
      'High-pressure water jetting clears stubborn blockages in drains, sewers, and stormwater lines without damaging pipes. Our equipment handles grease buildup, tree roots, and debris that conventional methods cannot shift.',
    details: [
      'High-pressure hydro jetting for blocked drains and sewer lines',
      'Grease trap and commercial kitchen line clearing',
      'Preventative flushing for strata and commercial properties',
      'Safe for most pipe materials when assessed by our licensed team',
    ],
    idealFor: ['Blocked drains', 'Recurring slow drains', 'Commercial kitchens', 'Strata maintenance'],
  },
  {
    slug: 'cctv-drainage-camera',
    path: '/services/cctv-drainage-camera',
    title: 'CCTV drainage camera',
    shortDescription: 'Detailed diagnostics with cutting-edge technology',
    image: '/services/service-2.png',
    intro:
      'CCTV drain inspections give you a clear picture of what is happening inside your pipes — cracks, intrusions, misaligned joints, and blockages — before costly guesswork turns into unnecessary excavation.',
    details: [
      'Live video inspection of sewer and stormwater lines',
      'Recorded footage and findings for your records',
      'Pinpoint location reporting to reduce repair scope',
      'Pre-purchase and pre-renovation drainage assessments',
    ],
    idealFor: ['Unexplained blockages', 'Pre-renovation checks', 'Insurance claims', 'Building defect reports'],
  },
  {
    slug: 'locating-services',
    path: '/services/locating-services',
    title: 'Locating services',
    shortDescription: 'Accurate detection to prevent future complications',
    image: '/services/service-3.png',
    intro:
      'Electronic pipe and cable locating helps us find buried services before digging, drilling, or construction begins — protecting your property and avoiding expensive surprises.',
    details: [
      'Non-invasive detection of underground pipes and services',
      'Mark-out for excavation, landscaping, and construction',
      'Supports renovation and new-build planning',
      'Reduces risk of damaging live water, gas, or drainage lines',
    ],
    idealFor: ['Renovations', 'Landscaping', 'New builds', 'Unknown service routes'],
  },
  {
    slug: 'construction-plumbing',
    path: '/services/construction-plumbing',
    title: 'Construction plumbing',
    shortDescription: 'Expertise in renovations and new builds',
    image: '/services/service-4.png',
    intro:
      'From rough-in to fit-off, we deliver construction plumbing for renovations, extensions, and new residential and commercial builds — coordinated with builders and aligned to AS 3500 standards.',
    details: [
      'Rough-in and fit-off for new builds and renovations',
      'Bathroom, kitchen, and laundry plumbing installations',
      'Compliance with AS 3500 Australian Plumbing Standards',
      'Coordination with builders, designers, and other trades',
    ],
    idealFor: ['Home renovations', 'Extensions', 'New builds', 'Developer projects'],
  },
  {
    slug: 'commercial-plumbing',
    path: '/services/commercial-plumbing',
    title: 'Commercial plumbing',
    shortDescription: 'Professional services for shop fit outs, hospitals, and more',
    image: '/services/service-5.png',
    intro:
      'We support shop fit-outs, offices, healthcare facilities, hospitality venues, and strata complexes with reliable commercial plumbing — scheduled maintenance and responsive emergency call-outs.',
    details: [
      'Shop fit-outs and tenant improvements',
      'Scheduled maintenance for commercial and strata clients',
      'Emergency response with minimal business disruption',
      'Compliance-focused installations and reporting',
    ],
    idealFor: ['Retail fit-outs', 'Offices and strata', 'Hospitality venues', 'Healthcare facilities'],
  },
  {
    slug: 'backflow-tmv-testing',
    path: '/services/backflow-tmv-testing',
    title: 'Backflow & TMV testing',
    shortDescription: 'Ensuring safety and compliance in all installations',
    image: '/services/service-6.png',
    intro:
      'Backflow prevention and thermostatic mixing valve (TMV) testing keep potable water safe and meet regulatory requirements for commercial, healthcare, and multi-residential properties.',
    details: [
      'Backflow device testing and maintenance',
      'TMV installation, testing, and certification',
      'Compliance documentation for property managers and owners',
      'Scheduled re-testing reminders for ongoing compliance',
    ],
    idealFor: ['Property managers', 'Healthcare facilities', 'Commercial landlords', 'Council compliance'],
  },
  {
    slug: 'industrial-plumbing',
    path: '/services/industrial-plumbing',
    title: 'Industrial plumbing',
    shortDescription: 'Tailored solutions for industrial warehouses and large facilities',
    image: '/services/service-7.png',
    intro:
      'Industrial sites need plumbing that handles scale, compliance, and uptime. We deliver tailored solutions for warehouses, manufacturing facilities, and large commercial operations across NSW.',
    details: [
      'Large-bore drainage and process line work',
      'Confined spaces and working-at-heights certified team',
      'Preventative maintenance programs',
      'Emergency response for production-critical facilities',
    ],
    idealFor: ['Warehouses', 'Manufacturing', 'Distribution centres', 'Large commercial sites'],
  },
];

export const servicesIntro =
  'ClearFlow Plumbing & Maintenance is a fully licensed plumbing contractor, compliant with the latest AS 3500 Australian Plumbing Standards. We offer a comprehensive suite of services designed to meet diverse plumbing needs with precision and dedication.';

export const servicesOutro =
  'With certifications in working at heights, confined spaces, backflow prevention, and more, our team’s expertise ensures that your plumbing needs are met with the highest standard of excellence.';

export function getAllServices() {
  return services;
}

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug);
}

export function getServiceByPath(path: string) {
  const normalized = path.replace(/\/$/, '') || '/';
  return services.find((service) => service.path === normalized);
}

export const projectsPage = {
  path: '/projects',
  title: 'Projects',
  description:
    'Recent plumbing projects across Sydney — residential, commercial, and industrial work including drainage, rough-in, hot water, and fit-out jobs.',
  intro:
    'A selection of recent work completed by ClearFlow Plumbing & Maintenance across Sydney and greater NSW. From high-end residential renovations to commercial fit-outs and industrial drainage, every project is delivered with transparency, cleanliness, and AS 3500 compliance.',
} as const;

export type Project = {
  slug: string;
  title: string;
  image: string;
  category: 'residential' | 'commercial' | 'specialist';
  location?: string;
  summary: string;
};

export const projects: Project[] = [
  {
    slug: 'double-bay',
    title: 'Double Bay project',
    image: '/projects/double-bay.jpg',
    category: 'residential',
    location: 'Double Bay, NSW',
    summary: 'Full bathroom and kitchen plumbing upgrade in a heritage-sensitive residential renovation.',
  },
  {
    slug: 'riverview',
    title: 'Riverview project',
    image: '/projects/riverview.jpg',
    category: 'residential',
    location: 'Riverview, NSW',
    summary: 'Drainage remediation and new fixture installation for a family home extension.',
  },
  {
    slug: 'rockwell-gardens',
    title: 'Rockwell Gardens project',
    image: '/projects/rockwell-gardens.jpg',
    category: 'residential',
    location: 'Rockwell Gardens, NSW',
    summary: 'Complete rough-in and fit-off plumbing for a multi-bathroom new build.',
  },
  {
    slug: 'chatswood',
    title: 'Chatswood project',
    image: '/projects/chatswood.jpg',
    category: 'commercial',
    location: 'Chatswood, NSW',
    summary: 'Commercial fit-out plumbing for a retail tenancy including grease trap connections.',
  },
  {
    slug: 'potts-point',
    title: 'Potts Point project',
    image: '/projects/potts-point.jpg',
    category: 'residential',
    location: 'Potts Point, NSW',
    summary: 'Apartment renovation with concealed pipework and high-end fixture installation.',
  },
  {
    slug: 'drainage',
    title: 'Drainage',
    image: '/projects/drainage.jpg',
    category: 'specialist',
    summary: 'Stormwater and sewer drainage installation with CCTV verification on completion.',
  },
  {
    slug: 'rough-in-work',
    title: 'Rough in work',
    image: '/projects/rough-in.jpg',
    category: 'specialist',
    summary: 'Construction-stage rough-in for a multi-dwelling development coordinated with the builder.',
  },
  {
    slug: 'hot-water-heaters',
    title: 'Hot water heaters',
    image: '/projects/hot-water.jpg',
    category: 'specialist',
    summary: 'Commercial hot water system replacement and compliance upgrade for a strata complex.',
  },
];

export function getAllProjects() {
  return projects;
}

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
