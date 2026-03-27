// ─── API: zapis leada ─────────────────────────────────────────────────────────
//
// Co robi ten endpoint:
//  1. Zapisuje email + wynik do pliku leads.csv w katalogu projektu
//  2. Opcjonalnie wysyła webhook (ustaw WEBHOOK_URL w .env.local)
//  3. Opcjonalnie dodaje do MailerLite (ustaw MAILERLITE_API_KEY i MAILERLITE_GROUP_ID)
//
// Żeby podpiąć narzędzie mailingowe: uzupełnij sekcję "Integracja mailingowa" poniżej.

import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

interface SubmitBody {
  email: string;
  primaryCategory: string;
}

// Gdzie zapisywać CSV z leadami (w katalogu głównym projektu)
const LEADS_FILE = path.join(process.cwd(), "leads.csv");

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as SubmitBody;
    const { email, primaryCategory } = body;

    // Prosta walidacja
    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Nieprawidłowy email" }, { status: 400 });
    }

    const timestamp = new Date().toISOString();

    // ── 1. Zapis do CSV ──────────────────────────────────────────────────────
    await appendToCSV({ email, primaryCategory, timestamp });

    // ── 2. Webhook (opcjonalny) ──────────────────────────────────────────────
    const webhookUrl = process.env.WEBHOOK_URL;
    if (webhookUrl) {
      await sendWebhook(webhookUrl, { email, primaryCategory, timestamp });
    }

    // ── 3. Integracja mailingowa (opcjonalna) ────────────────────────────────
    // Odkomentuj i uzupełnij wybraną integrację:
    //
    // MailerLite:
    // const mailerLiteKey = process.env.MAILERLITE_API_KEY;
    // const mailerLiteGroup = process.env.MAILERLITE_GROUP_ID;
    // if (mailerLiteKey && mailerLiteGroup) {
    //   await addToMailerLite(email, primaryCategory, mailerLiteKey, mailerLiteGroup);
    // }
    //
    // Brevo (SendinBlue):
    // const brevoKey = process.env.BREVO_API_KEY;
    // const brevoList = process.env.BREVO_LIST_ID;
    // if (brevoKey && brevoList) {
    //   await addToBrevo(email, primaryCategory, brevoKey, brevoList);
    // }

    return NextResponse.json({ success: true }, { status: 200 });

  } catch (error) {
    console.error("[submit] Błąd:", error);
    return NextResponse.json(
      { error: "Wewnętrzny błąd serwera" },
      { status: 500 }
    );
  }
}

// ── Pomocnicze funkcje ────────────────────────────────────────────────────────

async function appendToCSV(data: {
  email: string;
  primaryCategory: string;
  timestamp: string;
}) {
  // Dodaj nagłówek jeśli plik nie istnieje
  try {
    await fs.access(LEADS_FILE);
  } catch {
    await fs.writeFile(LEADS_FILE, "timestamp,email,primaryCategory\n", "utf8");
  }

  const line = `${data.timestamp},${data.email},${data.primaryCategory}\n`;
  await fs.appendFile(LEADS_FILE, line, "utf8");
}

async function sendWebhook(
  url: string,
  data: { email: string; primaryCategory: string; timestamp: string }
) {
  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  } catch (err) {
    console.error("[submit] Webhook failed:", err);
    // Nie przerywamy — zapis do CSV ważniejszy
  }
}

// ── Przykładowa funkcja dla MailerLite ────────────────────────────────────────
// async function addToMailerLite(
//   email: string,
//   category: string,
//   apiKey: string,
//   groupId: string
// ) {
//   await fetch("https://connect.mailerlite.com/api/subscribers", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${apiKey}`,
//     },
//     body: JSON.stringify({
//       email,
//       groups: [groupId],
//       fields: { quiz_result: category },
//     }),
//   });
// }
