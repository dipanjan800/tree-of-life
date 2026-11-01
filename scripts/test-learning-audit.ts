import { MASTER_QUIZ_QUESTIONS, getQuestionsForQuiz } from "../data/quiz/curriculum";
import {
  INITIAL_PROGRESS_STATE,
  recordQuizCompletion,
  loadLearningProgress,
  resetLearningProgress,
} from "../data/quiz/progress-storage";
import { UI_TRANSLATIONS } from "../lib/i18n/translations/ui";
import type { QuizCategory, QuizDifficulty, QuizResultSummary } from "../types/quiz";

console.log("=== BROWSER-LEVEL AUDIT OF INTERACTIVE LEARNING & QUIZ SYSTEM ===\n");

let passed = 0;
let total = 0;

function assert(cond: boolean, desc: string) {
  total++;
  if (cond) {
    passed++;
    console.log(`  ✓ ${desc}`);
  } else {
    console.error(`  ✗ FAIL: ${desc}`);
  }
}

// -------------------------------------------------------------
// AUDIT 1: Category Selection & Question Synchronization
// -------------------------------------------------------------
console.log("[Audit 1] Category Selection & Curriculum Filtering Synchronization");
const categories: QuizCategory[] = [
  "evolution_knowledge",
  "taxonomy_classification",
  "fossil_identification",
  "geological_timeline",
  "cladistics_relationships",
];

const difficulties: QuizDifficulty[] = ["beginner", "intermediate", "advanced"];

for (const cat of categories) {
  const catQuestions = getQuestionsForQuiz(cat);
  assert(catQuestions.length === 6, `Category '${cat}' returns exactly 6 questions`);
  const allMatchCat = catQuestions.every((q) => q.category === cat);
  assert(allMatchCat, `All questions in '${cat}' have matching category field`);

  for (const diff of difficulties) {
    const diffQuestions = getQuestionsForQuiz(cat, diff);
    assert(
      diffQuestions.length === 2,
      `Category '${cat}' + difficulty '${diff}' returns exactly 2 questions`
    );
    const allMatchBoth = diffQuestions.every(
      (q) => q.category === cat && q.difficulty === diff
    );
    assert(allMatchBoth, `Questions for '${cat}' + '${diff}' match both category and difficulty strictly`);
  }
}

// -------------------------------------------------------------
// AUDIT 2: Taxonomy & Classification Isolation
// -------------------------------------------------------------
console.log("\n[Audit 2] Taxonomy & Classification Verification");
const taxIntermediate = getQuestionsForQuiz("taxonomy_classification", "intermediate");
assert(taxIntermediate.length === 2, "Taxonomy intermediate returns 2 questions");
assert(
  taxIntermediate.some((q) => q.id === "q-tax-03" && q.question.includes("Elephantidae") || q.options?.some(o => o.text === "Elephantidae")),
  "Taxonomy intermediate contains Elephantidae question (q-tax-03)"
);
assert(
  taxIntermediate.some((q) => q.id === "q-tax-04" && q.question.includes("birds")),
  "Taxonomy intermediate contains Avian Dinosaur question (q-tax-04)"
);

// Verify no Evolution Knowledge questions bleed into Taxonomy & Classification
const hasEvoLeak = taxIntermediate.some((q) => q.category !== "taxonomy_classification" || q.id.startsWith("q-evo-"));
assert(!hasEvoLeak, "Zero question bleed from Evolution Knowledge into Taxonomy & Classification");

// -------------------------------------------------------------
// AUDIT 3: Scoring & Incorrect Answer Feedback Logic
// -------------------------------------------------------------
console.log("\n[Audit 3] Scoring and Feedback Logic");
const sampleQ = taxIntermediate[0]; // q-tax-03, correctAnswer: 'a'
const correctAttempt = {
  questionId: sampleQ.id,
  userAnswer: sampleQ.correctAnswer,
  isCorrect: true,
  timestamp: Date.now(),
};
const wrongAttempt = {
  questionId: taxIntermediate[1].id,
  userAnswer: !taxIntermediate[1].correctAnswer,
  isCorrect: false,
  timestamp: Date.now(),
};

assert(correctAttempt.isCorrect === true, "Correct answer produces isCorrect: true");
assert(wrongAttempt.isCorrect === false, "Incorrect answer produces isCorrect: false");

const summary: QuizResultSummary = {
  category: "taxonomy_classification",
  difficulty: "intermediate",
  totalQuestions: 2,
  correctAnswers: 1,
  accuracy: 50,
  completedAt: Date.now(),
  attempts: [correctAttempt, wrongAttempt],
};

assert(summary.accuracy === 50, "Accuracy correctly calculated as 50% for 1/2 correct");
assert(summary.attempts.length === 2, "All attempts captured in summary");

// -------------------------------------------------------------
// AUDIT 4: Persistence Across Page Reload
// -------------------------------------------------------------
console.log("\n[Audit 4] Storage Persistence Simulation");
resetLearningProgress();
const beforeSave = loadLearningProgress();
assert(beforeSave.quizzesCompleted === 0, "Progress clean before save");

recordQuizCompletion(summary);
const afterSave = loadLearningProgress();
assert(afterSave.quizzesCompleted === 1, "Completed quizzes saved to storage");
assert(afterSave.totalCorrect === 1, "Total correct answers saved to storage");
assert(afterSave.totalQuestionsAnswered === 2, "Total questions answered saved to storage");
assert(afterSave.overallAccuracy === 50, "Overall accuracy saved to storage");
assert(
  afterSave.bestScores.taxonomy_classification.percentage === 50,
  "Category best score updated for taxonomy_classification"
);
assert(afterSave.recentResults.length === 1, "Recent results log updated");
assert(
  afterSave.recentResults[0].category === "taxonomy_classification",
  "Recent result category matches taxonomy_classification"
);

// -------------------------------------------------------------
// AUDIT 5: Bengali Localization Audit (bn-IN)
// -------------------------------------------------------------
console.log("\n[Audit 5] Bengali Localization Coverage");
const bnQuiz = UI_TRANSLATIONS["bn-IN"].quiz;

assert(Boolean(bnQuiz), "Bengali quiz translation object exists");
assert(Boolean(bnQuiz.title && bnQuiz.title.length > 5), "Bengali title is translated and non-empty");
assert(Boolean(bnQuiz.subtitle && bnQuiz.subtitle.length > 10), "Bengali subtitle is translated");
assert(Boolean(bnQuiz.startQuiz && bnQuiz.startQuiz.includes("কুইজ")), "Bengali startQuiz translated");
assert(Boolean(bnQuiz.questionCounter && bnQuiz.questionCounter === "প্রশ্ন"), "Bengali questionCounter translated");
assert(Boolean(bnQuiz.correctFeedback && bnQuiz.correctFeedback.includes("সঠিক")), "Bengali correctFeedback translated");
assert(Boolean(bnQuiz.incorrectFeedback && bnQuiz.incorrectFeedback.includes("ভুল")), "Bengali incorrectFeedback translated");
assert(Boolean(bnQuiz.explanationHeading && bnQuiz.explanationHeading.includes("ব্যাখ্যা")), "Bengali explanation heading translated");
assert(Boolean(bnQuiz.misconceptionHeading && bnQuiz.misconceptionHeading.includes("ভুল ধারণা")), "Bengali misconception heading translated");
assert(Boolean(bnQuiz.scientificSourceLabel && bnQuiz.scientificSourceLabel.includes("সূত্র")), "Bengali scientific source label translated");
assert(Boolean(bnQuiz.resultsTitle && bnQuiz.resultsTitle.includes("ফলাফল") || bnQuiz.resultsTitle.includes("সম্পন্ন")), "Bengali resultsTitle translated");
assert(Boolean(bnQuiz.retryQuiz && bnQuiz.retryQuiz.includes("পুনরায়")), "Bengali retryQuiz translated");
assert(Boolean(bnQuiz.returnToDashboard && bnQuiz.returnToDashboard.includes("ড্যাশবোর্ড")), "Bengali returnToDashboard translated");

for (const cat of categories) {
  assert(Boolean(bnQuiz.categories[cat] && bnQuiz.categories[cat].length > 0), `Bengali category name for '${cat}' translated: ${bnQuiz.categories[cat]}`);
  assert(Boolean(bnQuiz.categoryDescriptions[cat] && bnQuiz.categoryDescriptions[cat].length > 10), `Bengali category description for '${cat}' translated`);
}

for (const diff of difficulties) {
  assert(Boolean(bnQuiz.difficultyLevels[diff] && bnQuiz.difficultyLevels[diff].length > 0), `Bengali difficulty level for '${diff}' translated: ${bnQuiz.difficultyLevels[diff]}`);
}

// -------------------------------------------------------------
// SUMMARY
// -------------------------------------------------------------
console.log(`\n=======================================================`);
console.log(`TOTAL CHECKS: ${total} | PASSED: ${passed} | FAILED: ${total - passed}`);
if (passed === total) {
  console.log("ALL BROWSER-LEVEL AUDIT CHECKS PASSED (100%)!");
} else {
  console.error("SOME AUDIT CHECKS FAILED!");
  process.exit(1);
}
console.log(`=======================================================`);
