"use client";

import { useState, useCallback } from "react";

import QuizStart    from "@/components/QuizStart";
import QuizQuestion from "@/components/QuizQuestion";
import QuizResult   from "@/components/QuizResult";
import LeadCapture  from "@/components/LeadCapture";
import ThankYou     from "@/components/ThankYou";

import { QUIZ_DATA }           from "@/data/quiz";
import { calculateScores, getTopCategories } from "@/lib/scoring";
import type { AnswerValue, Category, QuizStep } from "@/types/quiz";

// ─── Stan quizu ──────────────────────────────────────────────────────────────

interface State {
  step: QuizStep;
  currentQuestion: number;
  answers: Record<number, AnswerValue>;
  primaryCategory: Category | null;
  secondaryCategory: Category | null;
}

const INITIAL_STATE: State = {
  step: "start",
  currentQuestion: 0,
  answers: {},
  primaryCategory: null,
  secondaryCategory: null,
};

// ─── Komponent ───────────────────────────────────────────────────────────────

export default function QuizPage() {
  const [state, setState] = useState<State>(INITIAL_STATE);

  const total = QUIZ_DATA.questions.length;

  // Krok 1: Start → pytania
  const handleStart = useCallback(() => {
    setState((s) => ({ ...s, step: "questions", currentQuestion: 0 }));
  }, []);

  // Krok 2: Udziel odpowiedzi i przejdź dalej automatycznie
  const handleAnswer = useCallback(
    (questionId: number, value: AnswerValue) => {
      setState((s) => {
        const newAnswers = { ...s.answers, [questionId]: value };
        const isLast = s.currentQuestion === total - 1;

        if (isLast) {
          // Policz wyniki i przejdź do podglądu
          const scores = calculateScores(newAnswers);
          const { primary, secondary } = getTopCategories(scores);
          return {
            ...s,
            answers: newAnswers,
            step: "result-preview",
            primaryCategory: primary,
            secondaryCategory: secondary,
          };
        }

        // Małe opóźnienie UX — użytkowniczka widzi że odpowiedź jest zaznaczona
        return {
          ...s,
          answers: newAnswers,
          currentQuestion: s.currentQuestion + 1,
        };
      });
    },
    [total]
  );

  // Krok 2b: Cofnij pytanie
  const handleBack = useCallback(() => {
    setState((s) => {
      if (s.step === "questions" && s.currentQuestion === 0) {
        return { ...s, step: "start" };
      }
      if (s.step === "questions") {
        return { ...s, currentQuestion: s.currentQuestion - 1 };
      }
      if (s.step === "result-preview") {
        return { ...s, step: "questions", currentQuestion: total - 1 };
      }
      return s;
    });
  }, [total]);

  // Krok 3: Podgląd wyniku → formularz maila
  const handleContinueToLead = useCallback(() => {
    setState((s) => ({ ...s, step: "lead-capture" }));
  }, []);

  // Krok 4: Sukces formularza → podziękowanie
  const handleLeadSuccess = useCallback(() => {
    setState((s) => ({ ...s, step: "thank-you" }));
  }, []);

  // ── Renderowanie odpowiedniego ekranu ──────────────────────────────────────

  if (state.step === "start") {
    return <QuizStart onStart={handleStart} />;
  }

  if (state.step === "questions") {
    return (
      <QuizQuestion
        key={state.currentQuestion}
        questionIndex={state.currentQuestion}
        answers={state.answers}
        onAnswer={handleAnswer}
        onBack={handleBack}
      />
    );
  }

  if (state.step === "result-preview" && state.primaryCategory && state.secondaryCategory) {
    return (
      <QuizResult
        primaryCategory={state.primaryCategory}
        secondaryCategory={state.secondaryCategory}
        onContinue={handleContinueToLead}
      />
    );
  }

  if (state.step === "lead-capture" && state.primaryCategory) {
    return (
      <LeadCapture
        primaryCategory={state.primaryCategory}
        onSuccess={handleLeadSuccess}
      />
    );
  }

  if (state.step === "thank-you") {
    return <ThankYou />;
  }

  // Fallback (nie powinno się zdarzyć)
  return <QuizStart onStart={handleStart} />;
}
