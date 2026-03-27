"use client";

import { QUIZ_DATA } from "@/data/quiz";
import type { AnswerValue } from "@/types/quiz";

interface QuizQuestionProps {
  questionIndex: number; // 0–14
  answers: Record<number, AnswerValue>;
  onAnswer: (questionId: number, value: AnswerValue) => void;
  onBack: () => void;
}

const ANSWER_OPTIONS: { label: string; value: AnswerValue }[] = [
  { label: "Często",   value: 2 },
  { label: "Czasami",  value: 1 },
  { label: "Rzadko",   value: 0 },
];

export default function QuizQuestion({
  questionIndex,
  answers,
  onAnswer,
  onBack,
}: QuizQuestionProps) {
  const question = QUIZ_DATA.questions[questionIndex];
  const total = QUIZ_DATA.questions.length;
  const progress = ((questionIndex) / total) * 100;
  const currentAnswer = answers[question.id];
  const answered = currentAnswer !== undefined;

  return (
    <div className="quiz-container animate-slide-up">
      <div className="quiz-card">

        {/* Pasek postępu */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="font-mono text-xs text-brand-navy/40">
              {questionIndex + 1} z {total}
            </span>
            <span className="font-mono text-xs text-brand-navy/40">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="w-full h-1.5 bg-brand-navy/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-brand-sage rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Pytanie */}
        <p className="font-mono font-medium text-brand-navy leading-relaxed mb-8"
           style={{ fontSize: "clamp(1rem, 3.5vw, 1.25rem)" }}>
          {question.text}
        </p>

        {/* Odpowiedzi */}
        <div className="flex flex-col gap-3 mb-8">
          {ANSWER_OPTIONS.map((option) => {
            const isSelected = currentAnswer === option.value;
            return (
              <button
                key={option.value}
                onClick={() => onAnswer(question.id, option.value)}
                className={isSelected ? "answer-card-selected" : "answer-card-default"}
                aria-pressed={isSelected}
              >
                <span className="flex items-center gap-3">
                  {/* Kółko wyboru */}
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
            className="font-mono text-sm text-brand-navy/40 hover:text-brand-navy/70 transition-colors py-2 -ml-1 px-1"
            aria-label="Poprzednie pytanie"
          >
            ← Wróć
          </button>

          {/* Podpowiedź gdy jeszcze nie odpowiedziano */}
          {!answered && (
            <span className="text-xs text-brand-navy/30 font-mono">
              wybierz odpowiedź
            </span>
          )}
        </div>

      </div>
    </div>
  );
}
