export const site = {
  name: 'ClearFlow Plumbing & Maintenance',
  shortName: 'ClearFlow Plumbing',
  tagline: 'Keep it clear, keep it flowing',
  url: 'https://clearflowpm.com',
  phone: '02 5502 5602',
  phoneHref: 'tel:+61255025602',
  email: 'admin@clearflowpm.com',
  license: '379466C',
  serviceArea: 'Sydney metropolitan area, Central Coast and beyond',
} as const;

export type NavLink = {
  label: string;
  href: string;
  matchPath?: string;
};

export const navLinks: NavLink[] = [
  { label: 'Home', href: '/', matchPath: '/' },
  { label: 'About', href: '/#about' },
  { label: 'Services', href: '/services', matchPath: '/services' },
  { label: 'Projects', href: '/projects', matchPath: '/projects' },
  { label: 'Contact', href: '/#contact' },
];

export const heroSlides = [
  {
    title: 'Keep it clear, keep it flowing',
    subtitle: 'Your trusted partner for residential, commercial, and industrial plumbing.',
    image: '/hero/flow.jpg',
    imageAlt: 'Copper plumbing pipes and fittings',
  },
  {
    title: 'Servicing residential and commercial clients across NSW',
    subtitle: 'Transparent service, competitive pricing and top-quality workmanship.',
    image: '/hero/nsw-service.jpg',
    imageAlt: 'Sydney commercial skyline representing NSW service coverage',
  },
  {
    title: '24/7 emergency services',
    subtitle: 'Prompt service and immediate response times, especially during emergencies.',
    image: '/hero/emergency.jpg',
    imageAlt: 'Plumber working on pipes during an emergency call-out',
  },
  {
    title: 'Quality service & clear solutions for every flow',
    subtitle: 'Experience hassle-free plumbing with ClearFlow Plumbing & Maintenance.',
    image: '/hero/quality.jpg',
    imageAlt: 'Modern bathroom with quality plumbing fixtures',
  },
  {
    title: 'Advanced technology, unmatched expertise',
    subtitle: 'From jet blasting to CCTV inspections — precision in every job.',
    image: '/hero/technology.jpg',
    imageAlt: 'Industrial workshop tools representing advanced plumbing technology',
  },
] as const;

export const pageHeroImages = {
  services: {
    image: '/hero/services.jpg',
    imageAlt: 'Plumber using tools on a residential job',
  },
  projects: {
    image: '/hero/projects.jpg',
    imageAlt: 'Construction site representing completed plumbing projects',
  },
} as const;

export const about = {
  paragraphs: [
    'ClearFlow Plumbing & Maintenance is built on a foundation of integrity, excellence, and a relentless commitment to customer satisfaction. Serving the Sydney metropolitan area, with the ability to extend our services to the Central Coast and beyond, we specialise in delivering comprehensive plumbing solutions for both residential and commercial clients.',
    'Our team takes pride in maintaining the highest standards of service, adhering to the latest AS 3500 Australian Plumbing Standards across all our projects. With complete transparency and mid-range pricing, we ensure that every client receives top-quality workmanship without hidden surprises.',
    'Our core values — client service, customer focus, honesty, respect, efficiency, and accountability — define who we are and how we do business. Our reputation speaks for itself, and our unblemished record of client satisfaction underscores our dedication to delivering excellent, respectful, and clean service every time.',
  ],
} as const;

export const director = {
  name: 'Joshua Nehme',
  role: 'Director, ClearFlow Plumbing',
  image: '/team/josh-nehme.jpg',
  paragraphs: [
    'At the helm of ClearFlow Plumbing & Maintenance is Josh Nehme, whose leadership combines industry knowledge with a hands-on approach. Josh oversees all projects and actively engages with clients, delivering clear communication and honest, detailed explanations throughout the entire service process.',
    'Josh plays an integral role in our day-to-day operations, ensuring that each project meets ClearFlow’s exacting standards. Under his guidance, the team has grown to include two experienced tradesmen and an apprentice, who we recruited through the Master Builders Association, further enriching the company’s expertise.',
    'Josh finds great satisfaction in resolving plumbing issues and takes pride in witnessing the transformation of complex problems into successfully completed projects. His passion for the trade, coupled with his commitment to customer satisfaction, makes him a pivotal figure in ClearFlow’s success story.',
  ],
} as const;

export const whyChooseUs = {
  intro:
    'Our clients value our commitment to providing a clean, respectful, and courteous service. We pride ourselves on complete transparency and honesty, ensuring clients are informed about the financial aspects and the scope of work without hidden surprises. While our pricing is mid-range, our quality service stands incomparable.',
  commitments: [
    'Prompt service and immediate response times, especially during emergencies',
    'Thorough cleanliness and respect for your property upon job completion',
    'Comprehensive solutions for all types of leaks and plumbing issues',
    'Apprentices engaged through the Master Builders Association, emphasising our dedication to quality and the future of the industry',
  ],
  outro:
    'We take pride in having never received a complaint. General respect and customer satisfaction resonate in our everyday operations. Our clients trust us because we never leave a job without ensuring complete satisfaction.',
} as const;

export const contactForm = {
  heading: 'Contact',
  intro: 'Please complete this enquiry form and we will respond within 48 hours.',
  referralOptions: ['Google', 'Instagram', 'Facebook', 'Referral', 'Other — please specify'],
} as const;

export const socialLinks = [
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/clearflowplumbing&maintenance',
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/clearflowpm/',
  },
  {
    label: 'TikTok',
    href: 'https://www.tiktok.com/@clearflowpm',
  },
] as const;

export const footer = {
  companyInfo: [
    'ClearFlow Plumbing & Maintenance',
    'Licensed plumbing contractor — NSW',
    `Licence no. ${site.license}`,
    site.serviceArea,
  ],
} as const;

// Re-export services and projects for convenience
export {
  services,
  servicesIntro,
  servicesOutro,
  servicesIndex,
  projects,
  projectsPage,
  getAllServices,
  getServiceBySlug,
  getServiceByPath,
  getAllProjects,
} from './services';
