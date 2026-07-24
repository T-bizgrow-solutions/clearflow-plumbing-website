import type { VercelRequest, VercelResponse } from '@vercel/node';
import { contactFormSchema } from '../src/lib/validations/contact.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const parsed = contactFormSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      error: 'Invalid form data',
      issues: parsed.error.flatten(),
    });
  }

  const webhookUrl = process.env.N8N_WEBHOOK_URL;
  if (!webhookUrl) {
    console.error('N8N_WEBHOOK_URL is not configured');
    return res.status(503).json({
      error: 'Enquiry service is temporarily unavailable. Please call us.',
    });
  }

  const payload = {
    ...parsed.data,
    email: parsed.data.email || '',
    submittedAt:
      typeof req.body?.submittedAt === 'string' ? req.body.submittedAt : new Date().toISOString(),
    source: 'clearflow-contact-form' as const,
  };

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  const secret = process.env.N8N_WEBHOOK_SECRET;
  if (secret) {
    headers['X-Webhook-Secret'] = secret;
  }

  try {
    const upstream = await fetch(webhookUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    });

    if (!upstream.ok) {
      console.error('n8n webhook failed', upstream.status);
      return res.status(502).json({
        error: 'Could not deliver your enquiry. Please try again or call us.',
      });
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error('n8n webhook error', error);
    return res.status(502).json({
      error: 'Could not deliver your enquiry. Please try again or call us.',
    });
  }
}
