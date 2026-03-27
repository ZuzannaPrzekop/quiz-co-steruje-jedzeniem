"use client";

import { QUIZ_DATA } from "@/data/quiz";
import type { Category } from "@/types/quiz";

interface QuizResultProps {
  primaryCategory: Category;
  secondaryCategory: Category;
  onContinue: () => void;
}

// Ikony dla każdej kategorii (emoji jako placeholder, łatwo podmienić)
const CATEGORY_ICONS: Record<Category, string> = {
  stress:       "🌊",
  chaos:        "🌀",
  emotions:     "🌸",
  allOrNothing: "⚖️",
};

export default function QuizResult({
  primaryCategory,
  secondaryCategory,
  onContinue,
}: QuizResultProps) {
  const primary = QUIZ_DATA.categories[primaryCategory];
  const secondary = QUIZ_DATA.categories[secondaryCategory];
  const showSecondary = secondaryCategory !== primaryCategory;

  return (
    <div className="quiz-container animate-fade-in">
      <div className="quiz-card">

        {/* Nagłówek */}
        <p className="font-mono text-xs text-brand-navy/40 uppercase tracking-widest mb-5 text-center">
          Twój wynik
        </p>

        {/* Wynik główny */}
        <div className="bg-brand-sage-light border border-brand-sage rounded-2xl px-6 py-6 mb-5">
          <div className="text-3xl mb-3 text-center">
            {CATEGORY_ICONS[primaryCategory]}
          </div>
          <h2 className="font-mono font-bold text-brand-navy text-xl sm:text-2xl leading-tight mb-3 text-center">
            {primary.name}
          </h2>
          <div className="w-8 h-0.5 bg-brand-sage rounded-full mx-auto mb-4" />
          <p className="text-brand-navy/70 text-sm sm:text-base leading-relaxed text-center">
            {primary.shortPreview}
          </p>
        </div>

        {/* Wynik drugorzędny */}
        {showSecondary && (
          <div className="bg-white/50 border border-brand-navy/10 rounded-xl px-5 py-4 mb-6">
            <p className="font-mono text-xs text-brand-navy/40 uppercase tracking-wide mb-2">
              Dodatkowy wątek
            </p>
            <p className="font-mono text-sm font-medium text-brand-navy/70">
              {secondary.name}
            </p>
          </div>
        )}

        {/* Separator */}
        <div className="w-full h-px bg-brand-navy/8 mb-6" />

        {/* Zachęta do maila */}
        <p className="text-brand-navy/65 text-sm sm:text-base leading-relaxed mb-6 text-center">
          Zostaw maila, a prześlę Ci krótką interpretację wyniku oraz wskazówkę,
          co może być dobrym następnym krokiem.
        </p>

        {/* CTA */}
        <button onClick={onContinue} className="btn-primary mx-auto block text-base">
          Chcę otrzymać pełny wynik
        </button>

        <p className="text-center text-xs text-brand-navy/30 font-mono mt-4">
          Bez spamu — jeden mail z wynikiem
        </p>

      </div>
    </div>
  );
}
