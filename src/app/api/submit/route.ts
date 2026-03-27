import { NextRequest, NextResponse } from "next/server";

interface SubmitBody {
  email: string;
  primaryCategory: string;
}

// Mapowanie kategorii na zmienne środowiskowe z ID grup w MailerLite
const CATEGORY_GROUP_ENV: Record<string, string> = {
  stress:       "MAILERLITE_GROUP_STRESS",
  chaos:        "MAILERLITE_GROUP_CHAOS",
  emotions:     "MAILERLITE_GROUP_EMOTIONS",
  allOrNothing: "MAILERLITE_GROUP_ALL_OR_NOTHING",
};

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as SubmitBody;
    const { email, primaryCategory } = body;

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Nieprawidłowy email" }, { status: 400 });
    }

    const apiKey     = process.env.MAILERLITE_API_KEY;
    const mainGroup  = process.env.MAILERLITE_GROUP_ID;
    const resultGroup = process.env[CATEGORY_GROUP_ENV[primaryCategory]];

    if (apiKey && mainGroup) {
      // Dodaj do głównej grupy + grupy wyniku (jeśli skonfigurowana)
      const groups = [mainGroup, ...(resultGroup ? [resultGroup] : [])];
      await addToMailerLite(email, primaryCategory, apiKey, groups);
    }

    return NextResponse.json({ success: true }, { status: 200 });

  } catch (error) {
    console.error("[submit] Błąd:", error);
    return NextResponse.json({ error: "Wewnętrzny błąd serwera" }, { status: 500 });
  }
}

async function addToMailerLite(
  email: string,
  category: string,
  apiKey: string,
  groups: string[]
) {
  const res = await fetch("https://connect.mailerlite.com/api/subscribers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      email,
      groups,
      status: "active",
      fields: { quiz_wynik: category },
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`MailerLite error: ${err}`);
  }
}
