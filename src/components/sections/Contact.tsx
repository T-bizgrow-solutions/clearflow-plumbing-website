import { useState } from 'react';
import { contactForm, site } from '../../data/content';
import { Button } from '../ui/Button';
import { Section } from '../ui/Section';

type FormState = {
  fullName: string;
  phone: string;
  email: string;
  location: string;
  workType: string;
  referral: string;
  referralOther: string;
  message: string;
};

const initialState: FormState = {
  fullName: '',
  phone: '',
  email: '',
  location: '',
  workType: '',
  referral: '',
  referralOther: '',
  message: '',
};

export function Contact() {
  const [form, setForm] = useState<FormState>(initialState);
  const [submitted, setSubmitted] = useState(false);

  const update = (field: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Form submission will be wired via N8N_WEBHOOK_PLAN / API route in a later phase.
    setSubmitted(true);
  };

  return (
    <Section id="contact" labelledBy="contact-heading" className="bg-surface-alt">
      <div className="grid gap-12 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <p className="mb-3 font-ui text-sm font-semibold uppercase tracking-wider text-brand-blue">
            Get in touch
          </p>
          <h2 id="contact-heading" className="mb-4 text-3xl font-extrabold text-brand-dark md:text-4xl">
            {contactForm.heading}
          </h2>
          <p className="mb-8 text-lg text-gray-700">{contactForm.intro}</p>
          <dl className="space-y-4 text-gray-700">
            <div>
              <dt className="font-ui text-sm font-semibold uppercase tracking-wider text-brand-dark">
                Phone
              </dt>
              <dd>
                <a href={site.phoneHref} className="text-lg font-semibold text-brand-blue hover:underline">
                  {site.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-ui text-sm font-semibold uppercase tracking-wider text-brand-dark">
                Email
              </dt>
              <dd>
                <a href={`mailto:${site.email}`} className="text-lg font-semibold text-brand-blue hover:underline">
                  {site.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-ui text-sm font-semibold uppercase tracking-wider text-brand-dark">
                Licence
              </dt>
              <dd className="text-lg">{site.license}</dd>
            </div>
          </dl>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-card md:p-8 lg:col-span-3">
          {submitted ? (
            <div className="py-12 text-center">
              <h3 className="mb-3 text-2xl font-bold text-brand-dark">Thanks — we will be in touch</h3>
              <p className="text-gray-600">
                Your enquiry has been recorded locally for preview. Form submission will be connected in
                the next implementation phase.
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-5" noValidate>
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1 block font-ui text-sm font-semibold text-brand-dark">
                    Full name <span className="text-red-600">*</span>
                  </span>
                  <input
                    type="text"
                    required
                    autoComplete="name"
                    value={form.fullName}
                    onChange={(e) => update('fullName', e.target.value)}
                    className="w-full rounded-md border border-gray-200 px-4 py-3 font-ui text-brand-dark focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
                  />
                </label>
                <label className="block">
                  <span className="mb-1 block font-ui text-sm font-semibold text-brand-dark">
                    Phone <span className="text-red-600">*</span>
                  </span>
                  <input
                    type="tel"
                    required
                    autoComplete="tel"
                    value={form.phone}
                    onChange={(e) => update('phone', e.target.value)}
                    className="w-full rounded-md border border-gray-200 px-4 py-3 font-ui text-brand-dark focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
                  />
                </label>
              </div>

              <label className="block">
                <span className="mb-1 block font-ui text-sm font-semibold text-brand-dark">Email</span>
                <input
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) => update('email', e.target.value)}
                  className="w-full rounded-md border border-gray-200 px-4 py-3 font-ui text-brand-dark focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
                />
              </label>

              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1 block font-ui text-sm font-semibold text-brand-dark">
                    Location of project
                  </span>
                  <input
                    type="text"
                    value={form.location}
                    onChange={(e) => update('location', e.target.value)}
                    className="w-full rounded-md border border-gray-200 px-4 py-3 font-ui text-brand-dark focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
                  />
                </label>
                <label className="block">
                  <span className="mb-1 block font-ui text-sm font-semibold text-brand-dark">
                    Type of work required
                  </span>
                  <input
                    type="text"
                    value={form.workType}
                    onChange={(e) => update('workType', e.target.value)}
                    className="w-full rounded-md border border-gray-200 px-4 py-3 font-ui text-brand-dark focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
                  />
                </label>
              </div>

              <label className="block">
                <span className="mb-1 block font-ui text-sm font-semibold text-brand-dark">
                  How did you find us?
                </span>
                <select
                  value={form.referral}
                  onChange={(e) => update('referral', e.target.value)}
                  className="w-full rounded-md border border-gray-200 px-4 py-3 font-ui text-brand-dark focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
                >
                  <option value="">Select an option</option>
                  {contactForm.referralOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>

              {form.referral === 'Other — please specify' && (
                <label className="block">
                  <span className="mb-1 block font-ui text-sm font-semibold text-brand-dark">
                    Please specify
                  </span>
                  <input
                    type="text"
                    value={form.referralOther}
                    onChange={(e) => update('referralOther', e.target.value)}
                    className="w-full rounded-md border border-gray-200 px-4 py-3 font-ui text-brand-dark focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
                  />
                </label>
              )}

              <label className="block">
                <span className="mb-1 block font-ui text-sm font-semibold text-brand-dark">Message</span>
                <textarea
                  rows={4}
                  value={form.message}
                  onChange={(e) => update('message', e.target.value)}
                  className="w-full rounded-md border border-gray-200 px-4 py-3 font-ui text-brand-dark focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
                />
              </label>

              <Button type="submit" size="lg" className="w-full sm:w-auto">
                Send enquiry
              </Button>
            </form>
          )}
        </div>
      </div>
    </Section>
  );
}
