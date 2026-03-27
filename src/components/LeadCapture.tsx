"use client";

import { useState } from "react";
import type { Category } from "@/types/quiz";

interface LeadCaptureProps {
  primaryCategory: Category;
  onSuccess: () => void;
}

export default function LeadCapture({ primaryCategory, onSuccess }: LeadCaptureProps) {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isValid = email.includes("@") && email.includes(".") && consent;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, primaryCategory }),
      });

      if (!res.ok) {
        throw new Error("Coś poszło nie tak. Spróbuj ponownie.");
      }

      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Spróbuj ponownie za chwilę.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="quiz-container animate-slide-up">
      <div className="quiz-card">

        {/* Nagłówek */}
        <p className="font-mono text-xs text-brand-navy/40 uppercase tracking-widest mb-6 text-center">
          Zostaw maila
        </p>

        <h2 className="font-mono font-bold text-brand-navy text-xl sm:text-2xl leading-tight mb-4 text-center">
          Wyślę Ci Twój wynik
        </h2>

        <p className="text-brand-navy/65 text-sm sm:text-base leading-relaxed mb-8 text-center max-w-sm mx-auto">
          Zostaw maila, a prześlę Ci krótką interpretację wyniku oraz wskazówkę,
          co może być dobrym następnym krokiem.{" "}
          <span className="text-brand-navy/40">
            Jeśli będziesz chcieć, w wiadomości znajdziesz też możliwość umówienia
            pierwszej konsultacji.
          </span>
        </p>

        {/* Formularz */}
        <form onSubmit={handleSubmit} noValidate className="space-y-4">

          {/* Pole email */}
          <div>
            <label htmlFor="email" className="sr-only">
              Adres e-mail
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              inputMode="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Twój adres e-mail"
              required
              className="
                w-full px-5 py-4 rounded-xl
                border-2 border-brand-navy/15
                bg-white/80
                font-sans text-base text-brand-navy
                placeholder:text-brand-navy/35
                transition-colors duration-150
                focus:outline-none focus:border-brand-sage
                focus:ring-0
              "
            />
          </div>

          {/* Zgoda */}
          <label className="flex items-start gap-3 cursor-pointer group">
            <div className="relative flex-shrink-0 mt-0.5">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                required
                className="sr-only"
              />
              <div
                className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors
                  ${consent
                    ? "bg-brand-sage border-brand-sage"
                    : "bg-white border-brand-navy/25 group-hover:border-brand-sage"
                  }`}
              >
                {consent && (
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 12 12">
                    <path
                      d="M2 6l3 3 5-5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
            </div>
            <span className="text-xs text-brand-navy/50 leading-relaxed">
              Wyrażam zgodę na kontakt mailowy od dr Zuzanny Przekop w celu
              przesłania wyniku ankiety i informacji o usługach. Możesz
              zrezygnować w każdej chwili.
            </span>
          </label>

          {/* Błąd */}
          {error && (
            <p className="text-red-500 text-sm font-mono text-center" role="alert">
              {error}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={!isValid || loading}
            className={`btn-primary mt-2 text-base ${
              (!isValid || loading) ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12" cy="12" r="10"
                    stroke="currentColor" strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                Wysyłam…
              </span>
            ) : (
              "Wyślij mi interpretację"
            )}
          </button>

        </form>

        <p className="text-center text-xs text-brand-navy/25 font-mono mt-5">
          Bez spamu. Jeden mail z wynikiem.
        </p>

      </div>
    </div>
  );
}
