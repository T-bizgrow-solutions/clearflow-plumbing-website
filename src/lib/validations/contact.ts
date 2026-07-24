import { z } from 'zod';

export const REFERRAL_OTHER = 'Other — please specify';

export const contactFormSchema = z
  .object({
    firstName: z.string().trim().min(1, 'Enter your first name'),
    lastName: z.string().trim().min(1, 'Enter your last name'),
    phone: z.string().trim().min(8, 'Enter a valid phone number'),
    email: z
      .string()
      .trim()
      .refine((value) => value === '' || z.string().email().safeParse(value).success, {
        message: 'Enter a valid email',
      })
      .optional(),
    location: z.string().trim().optional(),
    workType: z.string().trim().optional(),
    referral: z.string().trim().optional(),
    referralOther: z.string().trim().optional(),
    message: z.string().trim().optional(),
    gdprConsent: z.boolean().refine((value) => value === true, {
      message: 'Consent is required to send your enquiry',
    }),
  })
  .superRefine((data, ctx) => {
    if (data.referral === REFERRAL_OTHER && !data.referralOther?.trim()) {
      ctx.addIssue({
        code: 'custom',
        path: ['referralOther'],
        message: 'Please specify how you found us',
      });
    }
  });

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export type ContactPayload = Omit<ContactFormValues, 'gdprConsent'> & {
  gdprConsent: true;
  submittedAt: string;
  source: 'clearflow-contact-form';
};
