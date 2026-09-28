import { site } from "./content";

export type ContactLead = {
  name: string;
  phone: string;
  email: string;
  help: string;
};

type ProviderResult = { ok: true } | { ok: false; reason: string; needsActivation?: boolean };

function isSuccessFlag(value: unknown): boolean {
  return value === true || value === "true" || value === 1 || value === "1";
}

async function sendViaWeb3Forms(lead: ContactLead, accessKey: string): Promise<ProviderResult> {
  const res = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      access_key: accessKey,
      subject: `New portfolio chat — ${lead.name}`,
      from_name: "Aditya Portfolio Bot",
      name: lead.name,
      phone: lead.phone,
      email: lead.email,
      message: lead.help,
      source: "portfolio-contact-bot",
      page: typeof window !== "undefined" ? window.location.href : "",
    }),
  });

  const data = (await res.json().catch(() => null)) as {
    success?: boolean | string;
    message?: string;
  } | null;

  if (!res.ok || !data || !isSuccessFlag(data.success)) {
    return { ok: false, reason: data?.message || `Web3Forms failed (${res.status})` };
  }
  return { ok: true };
}

async function sendViaFormSubmit(lead: ContactLead, to: string): Promise<ProviderResult> {
  const endpoint = `https://formsubmit.co/ajax/${encodeURIComponent(to)}`;

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      name: lead.name,
      phone: lead.phone,
      email: lead.email,
      message: lead.help,
      source: "portfolio-contact-bot",
      page: typeof window !== "undefined" ? window.location.href : "",
      _subject: `New portfolio chat — ${lead.name}`,
      _template: "table",
      _captcha: "false",
      _replyto: lead.email,
    }),
  });

  const data = (await res.json().catch(() => null)) as {
    success?: boolean | string;
    message?: string;
  } | null;

  const message = data?.message || "";
  const needsActivation = /activat/i.test(message);

  // FormSubmit returns success as the string "false" on failure
  if (!res.ok || !data || !isSuccessFlag(data.success)) {
    return {
      ok: false,
      reason: message || `FormSubmit failed (${res.status})`,
      needsActivation,
    };
  }

  return { ok: true };
}

/**
 * Emails completed chat-bot leads to `site.notifyEmail`.
 * Prefers Web3Forms when `VITE_WEB3FORMS_ACCESS_KEY` is set; otherwise FormSubmit.
 */
export async function sendContactLead(lead: ContactLead): Promise<void> {
  const to = site.notifyEmail || site.email;
  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as string | undefined;

  const result = accessKey?.trim()
    ? await sendViaWeb3Forms(lead, accessKey.trim())
    : await sendViaFormSubmit(lead, to);

  if (result.ok) return;

  const err = new Error(result.reason) as Error & { needsActivation?: boolean };
  err.needsActivation = result.needsActivation;
  throw err;
}
