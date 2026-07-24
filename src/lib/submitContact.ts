import type { ContactFormValues, ContactPayload } from './validations/contact';

export type SubmitContactResult =
  | { ok: true }
  | { ok: false; message: string };

export async function submitContact(values: ContactFormValues): Promise<SubmitContactResult> {
  const payload: ContactPayload = {
    ...values,
    email: values.email || '',
    gdprConsent: true,
    submittedAt: new Date().toISOString(),
    source: 'clearflow-contact-form',
  };

  try {
    const response = await fetch('/api/submit-contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const data = (await response.json().catch(() => null)) as { error?: string } | null;
      return {
        ok: false,
        message: data?.error || 'Something went wrong. Please try again or call us.',
      };
    }

    return { ok: true };
  } catch {
    return {
      ok: false,
      message: 'Network error. Please check your connection or call us directly.',
    };
  }
}
