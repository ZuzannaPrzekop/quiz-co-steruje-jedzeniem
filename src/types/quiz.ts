// ─── Typy danych quizu ───────────────────────────────────────────────────────

export type AnswerValue = 0 | 1 | 2; // rzadko | czasami | często

export type Category = "stress" | "chaos" | "emotions" | "allOrNothing";

export interface Question {
  id: number;
  text: string;
  category: Category;
}

export interface CategoryConfig {
  id: Category;
  name: string;
  shortPreview: string;   // zajawka przed formularzem maila
  fullDescription: string; // pełny opis wysyłany mailem
}

export interface QuizData {
  title: string;
  subtitle: string;
  questions: Question[];
  categories: Record<Category, CategoryConfig>;
  answers: {
    often: { label: string; value: 2 };
    sometimes: { label: string; value: 1 };
    rarely: { label: string; value: 0 };
  };
}

export type QuizStep =
  | "start"
  | "questions"
  | "result-preview"
  | "lead-capture"
  | "thank-you";

export interface QuizState {
  step: QuizStep;
  currentQuestion: number;           // indeks 0–14
  answers: Record<number, AnswerValue>;
  primaryCategory: Category | null;
  secondaryCategory: Category | null;
}

export interface ScoreMap {
  stress: number;
  chaos: number;
  emotions: number;
  allOrNothing: number;
}
