import { useId, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactForm, site } from '../../data/content';
import { submitContact } from '../../lib/submitContact';
import {
  contactFormSchema,
  REFERRAL_OTHER,
  type ContactFormValues,
} from '../../lib/validations/contact';
import { Button } from '../ui/Button';
import { Section } from '../ui/Section';

const fieldClass =
  'w-full rounded-md border border-gray-200 px-4 py-3 font-ui text-brand-dark focus:border-brand-blue focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/20';

const fieldErrorClass = 'border-red-500 focus:border-red-500 focus-visible:ring-red-500/20';

export function Contact() {
  const formId = useId();
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      location: '',
      workType: '',
      referral: '',
      referralOther: '',
      message: '',
      gdprConsent: false,
    },
  });

  const referral = watch('referral');

  const onSubmit = handleSubmit(async (values) => {
    setServerError(null);
    const result = await submitContact(values);
    if (!result.ok) {
      setServerError(result.message);
      return;
    }
    setSubmitted(true);
  });

  return (
    <Section id="contact" labelledBy="contact-heading" className="bg-surface-alt">
      <div className="grid gap-12 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <p className="mb-3 font-ui text-sm font-semibold tracking-wider text-brand-blue">
            Get in touch
          </p>
          <h2 id="contact-heading" className="mb-4 text-3xl font-extrabold text-brand-dark md:text-4xl">
            {contactForm.heading}
          </h2>
          <p className="mb-8 text-lg text-gray-700">{contactForm.intro}</p>
          <dl className="space-y-4 text-gray-700">
            <div>
              <dt className="font-ui text-sm font-semibold tracking-wider text-brand-dark">Phone</dt>
              <dd>
                <a
                  href={site.phoneHref}
                  className="text-lg font-semibold text-brand-blue underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2"
                >
                  {site.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-ui text-sm font-semibold tracking-wider text-brand-dark">Email</dt>
              <dd>
                <a
                  href={`mailto:${site.email}`}
                  className="text-lg font-semibold text-brand-blue underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2"
                >
                  {site.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-ui text-sm font-semibold tracking-wider text-brand-dark">Licence</dt>
              <dd className="text-lg">{site.license}</dd>
            </div>
          </dl>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-card md:p-8 lg:col-span-3">
          {submitted ? (
            <div className="py-12 text-center" role="status" aria-live="polite">
              <h3 className="mb-3 text-2xl font-bold text-brand-dark">{contactForm.successTitle}</h3>
              <p className="text-gray-600">{contactForm.successBody}</p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-5" noValidate>
              <div aria-live="polite" className="sr-only">
                {Object.keys(errors).length > 0 ? 'Please fix the errors in the form.' : ''}
              </div>

              {serverError && (
                <div
                  role="alert"
                  className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
                >
                  {serverError}
                </div>
              )}

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor={`${formId}-firstName`} className="mb-1 block font-ui text-sm font-semibold text-brand-dark">
                    First name <span className="text-red-600">*</span>
                  </label>
                  <input
                    id={`${formId}-firstName`}
                    type="text"
                    autoComplete="given-name"
                    aria-invalid={errors.firstName ? true : undefined}
                    aria-describedby={errors.firstName ? `${formId}-firstName-error` : undefined}
                    className={`${fieldClass} ${errors.firstName ? fieldErrorClass : ''}`}
                    {...register('firstName')}
                  />
                  {errors.firstName && (
                    <p id={`${formId}-firstName-error`} className="mt-1 text-sm text-red-600">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor={`${formId}-lastName`} className="mb-1 block font-ui text-sm font-semibold text-brand-dark">
                    Last name <span className="text-red-600">*</span>
                  </label>
                  <input
                    id={`${formId}-lastName`}
                    type="text"
                    autoComplete="family-name"
                    aria-invalid={errors.lastName ? true : undefined}
                    aria-describedby={errors.lastName ? `${formId}-lastName-error` : undefined}
                    className={`${fieldClass} ${errors.lastName ? fieldErrorClass : ''}`}
                    {...register('lastName')}
                  />
                  {errors.lastName && (
                    <p id={`${formId}-lastName-error`} className="mt-1 text-sm text-red-600">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor={`${formId}-phone`} className="mb-1 block font-ui text-sm font-semibold text-brand-dark">
                  Phone <span className="text-red-600">*</span>
                </label>
                <input
                  id={`${formId}-phone`}
                  type="tel"
                  autoComplete="tel"
                  aria-invalid={errors.phone ? true : undefined}
                  aria-describedby={errors.phone ? `${formId}-phone-error` : undefined}
                  className={`${fieldClass} ${errors.phone ? fieldErrorClass : ''}`}
                  {...register('phone')}
                />
                {errors.phone && (
                  <p id={`${formId}-phone-error`} className="mt-1 text-sm text-red-600">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor={`${formId}-email`} className="mb-1 block font-ui text-sm font-semibold text-brand-dark">
                  Email
                </label>
                <input
                  id={`${formId}-email`}
                  type="email"
                  autoComplete="email"
                  aria-invalid={errors.email ? true : undefined}
                  aria-describedby={errors.email ? `${formId}-email-error` : undefined}
                  className={`${fieldClass} ${errors.email ? fieldErrorClass : ''}`}
                  {...register('email')}
                />
                {errors.email && (
                  <p id={`${formId}-email-error`} className="mt-1 text-sm text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor={`${formId}-location`} className="mb-1 block font-ui text-sm font-semibold text-brand-dark">
                    Location of project
                  </label>
                  <input
                    id={`${formId}-location`}
                    type="text"
                    className={fieldClass}
                    {...register('location')}
                  />
                </div>
                <div>
                  <label htmlFor={`${formId}-workType`} className="mb-1 block font-ui text-sm font-semibold text-brand-dark">
                    Type of work required
                  </label>
                  <input
                    id={`${formId}-workType`}
                    type="text"
                    className={fieldClass}
                    {...register('workType')}
                  />
                </div>
              </div>

              <div>
                <label htmlFor={`${formId}-referral`} className="mb-1 block font-ui text-sm font-semibold text-brand-dark">
                  How did you find us?
                </label>
                <select id={`${formId}-referral`} className={fieldClass} {...register('referral')}>
                  <option value="">Select an option</option>
                  {contactForm.referralOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              {referral === REFERRAL_OTHER && (
                <div>
                  <label htmlFor={`${formId}-referralOther`} className="mb-1 block font-ui text-sm font-semibold text-brand-dark">
                    Please specify
                  </label>
                  <input
                    id={`${formId}-referralOther`}
                    type="text"
                    aria-invalid={errors.referralOther ? true : undefined}
                    aria-describedby={errors.referralOther ? `${formId}-referralOther-error` : undefined}
                    className={`${fieldClass} ${errors.referralOther ? fieldErrorClass : ''}`}
                    {...register('referralOther')}
                  />
                  {errors.referralOther && (
                    <p id={`${formId}-referralOther-error`} className="mt-1 text-sm text-red-600">
                      {errors.referralOther.message}
                    </p>
                  )}
                </div>
              )}

              <div>
                <label htmlFor={`${formId}-message`} className="mb-1 block font-ui text-sm font-semibold text-brand-dark">
                  Message
                </label>
                <textarea id={`${formId}-message`} rows={4} className={fieldClass} {...register('message')} />
              </div>

              <div>
                <label className="flex items-start gap-3 font-ui text-sm text-brand-dark">
                  <input
                    type="checkbox"
                    className="mt-1 h-4 w-4 rounded border-gray-300 text-brand-blue focus-visible:ring-brand-blue"
                    aria-invalid={errors.gdprConsent ? true : undefined}
                    aria-describedby={errors.gdprConsent ? `${formId}-gdpr-error` : undefined}
                    {...register('gdprConsent')}
                  />
                  <span>
                    {contactForm.consentLabel} <span className="text-red-600">*</span>
                  </span>
                </label>
                {errors.gdprConsent && (
                  <p id={`${formId}-gdpr-error`} className="mt-1 text-sm text-red-600">
                    {errors.gdprConsent.message}
                  </p>
                )}
              </div>

              <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={isSubmitting}>
                {isSubmitting ? 'Sending…' : contactForm.submitLabel}
              </Button>
            </form>
          )}
        </div>
      </div>
    </Section>
  );
}
