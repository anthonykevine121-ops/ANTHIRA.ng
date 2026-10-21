declare const Deno: {
  env: { get: (name: string) => string | undefined };
  serve: (handler: (request: Request) => Response | Promise<Response>) => void;
};

interface QuoteRequest {
  fullName: string;
  email: string;
  phone: string;
  websiteType: string;
  projectDetails: string;
  budgetRange?: string;
}

interface QuoteNotificationResult {
  email: { sent: boolean; error?: string };
  whatsapp: { sent: boolean; error?: string };
}

const corsHeaders = (origin: string) => ({
  'Access-Control-Allow-Origin': Deno.env.get('APP_ORIGIN') || origin,
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Content-Type': 'application/json'
});

const jsonResponse = (body: unknown, status: number, headers: Record<string, string>) =>
  new Response(JSON.stringify(body), { status, headers });

const requiredEnv = (name: string) => {
  const value = Deno.env.get(name);
  if (!value) throw new Error(`Missing server configuration: ${name}`);
  return value;
};

const isValidQuote = (value: unknown): value is QuoteRequest => {
  if (!value || typeof value !== 'object') return false;
  const quote = value as Partial<QuoteRequest>;
  return typeof quote.fullName === 'string' && quote.fullName.trim().length > 0 && quote.fullName.length <= 120
    && typeof quote.email === 'string' && quote.email.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(quote.email)
    && typeof quote.phone === 'string' && quote.phone.length <= 40
    && typeof quote.websiteType === 'string' && quote.websiteType.trim().length > 0 && quote.websiteType.length <= 160
    && typeof quote.projectDetails === 'string' && quote.projectDetails.trim().length > 0 && quote.projectDetails.length <= 5000
    && (quote.budgetRange === undefined || (typeof quote.budgetRange === 'string' && quote.budgetRange.length <= 160));
};

const sendEmail = async (quote: QuoteRequest) => {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${requiredEnv('RESEND_API_KEY')}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: requiredEnv('EMAIL_FROM'),
      to: [requiredEnv('NOTIFICATION_EMAIL')],
      reply_to: quote.email,
      subject: `New website request from ${quote.fullName}`,
      text: [
        `Name: ${quote.fullName}`,
        `Email: ${quote.email}`,
        `Phone: ${quote.phone || 'Not provided'}`,
        `Service: ${quote.websiteType}`,
        `Budget: ${quote.budgetRange || 'Not provided'}`,
        '',
        'Project details:',
        quote.projectDetails
      ].join('\n')
    })
  });

  if (!response.ok) {
    throw new Error(`Resend rejected the email (${response.status}): ${await response.text()}`);
  }
};

const sendWhatsApp = async (quote: QuoteRequest) => {
  const graphVersion = Deno.env.get('WHATSAPP_GRAPH_API_VERSION') || 'v23.0';
  const phoneNumberId = requiredEnv('WHATSAPP_PHONE_NUMBER_ID');
  const parameters = [
    quote.fullName.slice(0, 80),
    quote.email.slice(0, 100),
    (quote.phone || 'Not provided').slice(0, 30),
    quote.websiteType.slice(0, 80),
    (quote.budgetRange || 'Not provided').slice(0, 80),
    quote.projectDetails.slice(0, 400)
  ];
  const response = await fetch(`https://graph.facebook.com/${graphVersion}/${phoneNumberId}/messages`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${requiredEnv('WHATSAPP_ACCESS_TOKEN')}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      messaging_product: 'whatsapp',
      to: requiredEnv('WHATSAPP_RECIPIENT'),
      type: 'template',
      template: {
        name: requiredEnv('WHATSAPP_TEMPLATE_NAME'),
        language: { code: Deno.env.get('WHATSAPP_TEMPLATE_LANGUAGE') || 'en' },
        components: [{
          type: 'body',
          parameters: parameters.map((text) => ({ type: 'text', text }))
        }]
      }
    })
  });

  if (!response.ok) {
    throw new Error(`Meta WhatsApp API rejected the message (${response.status}): ${await response.text()}`);
  }
};

Deno.serve(async (request) => {
  const origin = request.headers.get('origin') || '';
  const headers = corsHeaders(origin);

  if (request.method === 'OPTIONS') {
    return new Response('ok', { headers });
  }
  if (request.method !== 'POST') {
    return jsonResponse({ error: 'Method not allowed.' }, 405, headers);
  }

  const allowedOrigin = Deno.env.get('APP_ORIGIN');
  if (!allowedOrigin) {
    return jsonResponse({ error: 'The notification service is missing its APP_ORIGIN configuration.' }, 500, headers);
  }
  if (origin !== allowedOrigin) {
    return jsonResponse({ error: 'Origin not allowed.' }, 403, headers);
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return jsonResponse({ error: 'Request body must be valid JSON.' }, 400, headers);
  }
  if (!isValidQuote(payload)) {
    return jsonResponse({ error: 'Please provide valid contact and project information.' }, 400, headers);
  }

  const quote = payload;
  const deliveries = await Promise.allSettled([sendEmail(quote), sendWhatsApp(quote)]);
  const channelResult = (result: PromiseSettledResult<void>) => result.status === 'fulfilled'
    ? { sent: true }
    : { sent: false, error: result.reason instanceof Error ? result.reason.message : String(result.reason) };

  const result: QuoteNotificationResult = {
    email: channelResult(deliveries[0]),
    whatsapp: channelResult(deliveries[1])
  };
  return jsonResponse(result, 200, headers);
});
