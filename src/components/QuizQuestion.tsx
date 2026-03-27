"use client";

import { useState } from "react";
import { QUIZ_DATA } from "@/data/quiz";
import type { AnswerValue } from "@/types/quiz";

interface QuizQuestionProps {
  questionIndex: number;
  answers: Record<number, AnswerValue>;
  onAnswer: (questionId: number, value: AnswerValue) => void;
  onBack: () => void;
}

const ANSWER_OPTIONS: { label: string; value: AnswerValue }[] = [
  { label: "Często",   value: 2 },
  { label: "Czasami",  value: 1 },
  { label: "Rzadko",   value: 0 },
];

// Delikatny element dekoracyjny — zmienia się co kilka pytań
function DecorativeBlob({ index }: { index: number }) {
  const variants = [
    // Wariant 1 — kółka sage
    <svg key="a" viewBox="0 0 120 120" fill="none" className="w-full h-full">
      <circle cx="90" cy="30" r="40" fill="#8BC9A2" fillOpacity="0.15" />
      <circle cx="60" cy="75" r="25" fill="#8BC9A2" fillOpacity="0.10" />
      <circle cx="20" cy="50" r="15" fill="#CBEA4F" fillOpacity="0.12" />
    </svg>,
    // Wariant 2 — delikatna fala
    <svg key="b" viewBox="0 0 120 120" fill="none" className="w-full h-full">
      <ellipse cx="85" cy="35" rx="45" ry="35" fill="#8BC9A2" fillOpacity="0.13" />
      <ellipse cx="30" cy="85" rx="30" ry="22" fill="#CBEA4F" fillOpacity="0.10" />
    </svg>,
    // Wariant 3 — trzy kropki
    <svg key="c" viewBox="0 0 120 120" fill="none" className="w-full h-full">
      <circle cx="95" cy="25" r="30" fill="#8BC9A2" fillOpacity="0.18" />
      <circle cx="50" cy="90" r="20" fill="#8BC9A2" fillOpacity="0.10" />
      <circle cx="15" cy="30" r="10" fill="#CBEA4F" fillOpacity="0.15" />
    </svg>,
    // Wariant 4 — duży blob
    <svg key="d" viewBox="0 0 120 120" fill="none" className="w-full h-full">
      <ellipse cx="80" cy="40" rx="50" ry="40" fill="#8BC9A2" fillOpacity="0.12" />
      <circle cx="25" cy="95" r="18" fill="#CBEA4F" fillOpacity="0.10" />
    </svg>,
  ];

  return variants[index % variants.length];
}

export default function QuizQuestion({
  questionIndex,
  answers,
  onAnswer,
  onBack,
}: QuizQuestionProps) {
  const question = QUIZ_DATA.questions[questionIndex];
  const total = QUIZ_DATA.questions.length;
  const progress = (questionIndex / total) * 100;

  // Lokalne zaznaczenie — resetuje się przy każdym remount (key prop)
  const [selected, setSelected] = useState<AnswerValue | null>(null);

  function handleSelect(value: AnswerValue) {
    setSelected(value);
    // Krótkie opóźnienie żeby animacja zaznaczenia zdążyła się pokazać
    setTimeout(() => onAnswer(question.id, value), 220);
  }

  return (
    <div className="quiz-container animate-slide-up">
      <div className="quiz-card relative overflow-hidden">

        {/* Element dekoracyjny w tle */}
        <div className="absolute top-0 right-0 w-36 h-36 pointer-events-none select-none"
             aria-hidden="true">
          <DecorativeBlob index={Math.floor(questionIndex / 4)} />
        </div>

        {/* Pasek postępu */}
        <div className="mb-7 relative">
          <div className="flex justify-between items-center mb-2">
            <span className="font-mono text-xs text-brand-navy/40">
              {questionIndex + 1} z {total}
            </span>
            <span className="font-mono text-xs text-brand-navy/40">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="w-full h-2 bg-brand-navy/8 rounded-full overflow-hidden">
            <div
              className="h-full bg-brand-sage rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Pytanie — Inter zamiast Inconsolata */}
        <p className="font-sans font-medium text-brand-navy leading-relaxed mb-8 relative"
           style={{ fontSize: "clamp(1rem, 3.5vw, 1.2rem)" }}>
          {question.text}
        </p>

        {/* Odpowiedzi */}
        <div className="flex flex-col gap-3 mb-8">
          {ANSWER_OPTIONS.map((option) => {
            const isSelected = selected === option.value;
            return (
              <button
                key={option.value}
                onClick={() => handleSelect(option.value)}
                disabled={selected !== null}
                className={`w-full text-left px-5 py-4 rounded-2xl border-2 transition-all duration-150
                  focus:outline-none focus:ring-2 focus:ring-brand-sage focus:ring-offset-2
                  active:scale-[0.98] touch-manipulation
                  ${isSelected
                    ? "border-brand-sage bg-brand-sage-light"
                    : "border-brand-navy/12 bg-white/60 hover:border-brand-sage hover:bg-brand-sage-light"
                  }`}
                aria-pressed={isSelected}
              >
                <span className="flex items-center gap-3">
                  <span
                    className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors
                      ${isSelected
                        ? "border-brand-sage bg-brand-sage"
                        : "border-brand-navy/25 bg-transparent"
                      }`}
                  >
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-white block" />
                    )}
                  </span>
                  <span className={`font-sans text-base ${isSelected ? "font-medium text-brand-navy" : "text-brand-navy/80"}`}>
                    {option.label}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Nawigacja */}
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="font-mono text-sm text-brand-navy/35 hover:text-brand-navy/60 transition-colors py-2 -ml-1 px-1"
            aria-label="Poprzednie pytanie"
          >
            ← Wróć
          </button>
          {selected === null && (
            <span className="text-xs text-brand-navy/25 font-mono">
              wybierz odpowiedź
            </span>
          )}
        </div>

      </div>
    </div>
  );
}
