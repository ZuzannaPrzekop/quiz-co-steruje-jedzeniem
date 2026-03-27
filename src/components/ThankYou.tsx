"use client";

export default function ThankYou() {
  return (
    <div className="quiz-container animate-fade-in">
      <div className="quiz-card text-center">

        {/* Ikona potwierdzenia */}
        <div className="w-16 h-16 bg-brand-sage-light rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-8 h-8 text-brand-sage"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        {/* Nagłówek */}
        <h2 className="font-mono font-bold text-brand-navy text-2xl sm:text-3xl leading-tight mb-4">
          Gotowe!
        </h2>

        <div className="w-8 h-1 bg-brand-sage rounded-full mx-auto mb-5" />

        {/* Potwierdzenie */}
        <p className="text-brand-navy/70 text-base sm:text-lg leading-relaxed mb-3 max-w-sm mx-auto">
          Wysłałam Ci interpretację wyniku na podany adres e-mail.
        </p>

        {/* Informacja o konsultacji */}
        <p className="text-brand-navy/45 text-sm leading-relaxed mb-8 max-w-xs mx-auto">
          W wiadomości znajdziesz też informację o możliwości umówienia
          pierwszej konsultacji, jeśli będziesz chcieć pójść krok dalej.
        </p>

        {/* Powrót na stronę */}
        <a
          href="https://www.zuzannaprzekop.pl"
          className="font-mono text-sm text-brand-navy/40 hover:text-brand-navy/70 transition-colors underline underline-offset-4"
        >
          Wróć na stronę główną
        </a>

        {/* Podpis */}
        <p className="text-brand-navy/30 text-xs font-mono mt-8">
          dr Zuzanna Przekop
        </p>

      </div>
    </div>
  );
}
