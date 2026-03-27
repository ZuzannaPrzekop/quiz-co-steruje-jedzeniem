// ─── Logika scoringu ──────────────────────────────────────────────────────────

import type { AnswerValue, Category, ScoreMap } from "@/types/quiz";
import { QUIZ_DATA } from "@/data/quiz";

export function calculateScores(
  answers: Record<number, AnswerValue>
): ScoreMap {
  const scores: ScoreMap = {
    stress: 0,
    chaos: 0,
    emotions: 0,
    allOrNothing: 0,
  };

  QUIZ_DATA.questions.forEach((question) => {
    const answer = answers[question.id] ?? 0;
    scores[question.category] += answer;
  });

  return scores;
}

export function getTopCategories(scores: ScoreMap): {
  primary: Category;
  secondary: Category;
} {
  const sorted = (Object.entries(scores) as [Category, number][]).sort(
    ([, a], [, b]) => b - a
  );

  return {
    primary: sorted[0][0],
    secondary: sorted[1][0],
  };
}
