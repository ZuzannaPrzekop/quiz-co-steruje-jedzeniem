"use client";

import { QUIZ_DATA } from "@/data/quiz";

interface QuizStartProps {
  onStart: () => void;
}

export default function QuizStart({ onStart }: QuizStartProps) {
  return (
    <div className="quiz-container animate-fade-in">
      <div className="quiz-card text-center">

        {/* Subtelny znacznik autorki */}
        <p className="font-mono text-xs text-brand-navy/50 uppercase tracking-widest mb-8">
          dr Zuzanna Przekop
        </p>

        {/* Tytuł */}
        <h1 className="font-mono font-bold text-brand-navy leading-tight mb-5"
            style={{ fontSize: "clamp(1.6rem, 6vw, 2.6rem)" }}>
          {QUIZ_DATA.title}
        </h1>

        {/* Ozdobna linia */}
        <div className="w-12 h-1 bg-brand-sage rounded-full mx-auto mb-6" />

        {/* Podtytuł */}
        <p className="text-brand-navy/70 text-base sm:text-lg leading-relaxed mb-3 max-w-sm mx-auto">
          {QUIZ_DATA.subtitle}
        </p>

        {/* Informacja o długości */}
        <p className="text-brand-navy/40 text-sm font-mono mb-10">
          15 pytań · ok. 3 minuty
        </p>

        {/* CTA */}
        <button
          onClick={onStart}
          className="btn-primary text-lg px-10 py-5 mx-auto block"
        >
          Zacznij
        </button>

        {/* Zapewnienie */}
        <p className="text-brand-navy/35 text-xs mt-6">
          Bez rejestracji — wynik zobaczysz od razu
        </p>
      </div>
    </div>
  );
}
