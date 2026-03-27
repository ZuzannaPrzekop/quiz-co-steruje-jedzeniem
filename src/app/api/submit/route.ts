import { NextRequest, NextResponse } from "next/server";

interface SubmitBody {
  email: string;
  primaryCategory: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as SubmitBody;
    const { email, primaryCategory } = body;

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Nieprawidłowy email" }, { status: 400 });
    }

    // Zapis do MailerLite
    const apiKey = process.env.MAILERLITE_API_KEY;
    const groupId = process.env.MAILERLITE_GROUP_ID;

    if (apiKey && groupId) {
      await addToMailerLite(email, primaryCategory, apiKey, groupId);
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
  groupId: string
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
      groups: [groupId],
      fields: { quiz_wynik: category },
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`MailerLite error: ${err}`);
  }
}
