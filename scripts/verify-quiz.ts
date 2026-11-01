import { MASTER_QUIZ_QUESTIONS, getQuestionsForQuiz } from "../data/quiz/curriculum";
import {
  INITIAL_PROGRESS_STATE,
  recordQuizCompletion,
  loadLearningProgress,
  resetLearningProgress,
} from "../data/quiz/progress-storage";
import type { QuizCategory, QuizDifficulty, QuizResultSummary } from "../types/quiz";
import { ALL_NODES } from "../data/tree";
import { SCIENTIFIC_CLAIMS } from "../data/evidence/claims";

console.log("=== Tree of Life — Interactive Learning & Quiz Verification Suite ===\n");

let totalPassed = 0;
let totalFailed = 0;

function assert(condition: boolean, msg: string) {
  if (condition) {
    console.log(`  ✓ ${msg}`);
    totalPassed++;
  } else {
    console.error(`  ✗ FAIL: ${msg}`);
    totalFailed++;
  }
}

// [1] Master Curriculum Coverage & Integrity (30 Questions)
console.log("[1] Master Curriculum Coverage & Question Integrity");
assert(MASTER_QUIZ_QUESTIONS.length === 30, `Exactly 30 verified questions present (${MASTER_QUIZ_QUESTIONS.length}/30)`);

const requiredCategories: QuizCategory[] = [
  "evolution_knowledge",
  "taxonomy_classification",
  "fossil_identification",
  "geological_timeline",
  "cladistics_relationships",
];

const requiredDifficulties: QuizDifficulty[] = ["beginner", "intermediate", "advanced"];

// Check unique IDs
const idSet = new Set<string>();
const questionTextSet = new Set<string>();

MASTER_QUIZ_QUESTIONS.forEach((q) => {
  assert(!idSet.has(q.id), `Question ID '${q.id}' is globally unique`);
  idSet.add(q.id);

  assert(!questionTextSet.has(q.question), `Question statement for '${q.id}' is unique`);
  questionTextSet.add(q.question);

  assert(requiredCategories.includes(q.category), `Question '${q.id}' has valid category '${q.category}'`);
  assert(requiredDifficulties.includes(q.difficulty), `Question '${q.id}' has valid difficulty '${q.difficulty}'`);
  assert(Boolean(q.question && q.question.trim().length > 10), `Question '${q.id}' has substantive question text`);
  assert(Boolean(q.explanation && q.explanation.trim().length > 20), `Question '${q.id}' has substantive scientific explanation`);
  assert(Boolean(q.scientificSource && q.scientificSource.trim().length > 5), `Question '${q.id}' cites authentic scientific source: ${q.scientificSource.slice(0, 45)}...`);

  // Multiple choice validation
  if (q.format === "multiple_choice") {
    assert(Boolean(q.options && q.options.length >= 3), `Question '${q.id}' has at least 3 multiple choice options`);
    const optionIds = q.options?.map((o) => o.id) || [];
    assert(optionIds.includes(String(q.correctAnswer)), `Question '${q.id}' correct answer '${q.correctAnswer}' is present in options`);
  }

  // True/false validation
  if (q.format === "true_false") {
    assert(typeof q.correctAnswer === "boolean", `True/False question '${q.id}' has boolean correct answer`);
  }

  // Supporting Taxon ID Linkage
  if (q.supportingTaxonId) {
    const taxonExists = ALL_NODES.some((n) => n.id === q.supportingTaxonId);
    assert(taxonExists, `Question '${q.id}' references valid canonical taxon '${q.supportingTaxonId}'`);
  }

  // Supporting Claim ID Linkage
  if (q.supportingClaimId) {
    const claimExists = SCIENTIFIC_CLAIMS.some((c) => c.id === q.supportingClaimId);
    assert(claimExists, `Question '${q.id}' references registered evidence claim '${q.supportingClaimId}'`);
  }
});

// [2] Category and Difficulty Distribution
console.log("\n[2] Category and Difficulty Distribution");
requiredCategories.forEach((cat) => {
  const catQuestions = MASTER_QUIZ_QUESTIONS.filter((q) => q.category === cat);
  assert(catQuestions.length === 6, `Category '${cat}' has exactly 6 questions`);

  requiredDifficulties.forEach((diff) => {
    const diffQuestions = catQuestions.filter((q) => q.difficulty === diff);
    assert(diffQuestions.length >= 1, `Category '${cat}' has questions for difficulty '${diff}' (${diffQuestions.length})`);
  });
});

// [3] Query Service Integrity
console.log("\n[3] Curriculum Query Service Functionality");
const evoBeginner = getQuestionsForQuiz("evolution_knowledge", "beginner");
assert(evoBeginner.length >= 1, `Query 'evolution_knowledge' + 'beginner' returned ${evoBeginner.length} questions`);
assert(evoBeginner.every((q) => q.category === "evolution_knowledge"), "All returned questions match requested category");

const cladIntermediate = getQuestionsForQuiz("cladistics_relationships", "intermediate");
assert(cladIntermediate.length >= 1, `Query 'cladistics_relationships' + 'intermediate' returned ${cladIntermediate.length} questions`);

// [4] Client-Side Progress Storage Engine Integrity
console.log("\n[4] Local Storage Progress Tracking & Scoring Calculations");
assert(INITIAL_PROGRESS_STATE.version === 1, "Storage initial state version is 1");
assert(INITIAL_PROGRESS_STATE.quizzesCompleted === 0, "Initial quizzes completed is 0");

// Mock quiz result
const mockSummary: QuizResultSummary = {
  category: "evolution_knowledge",
  difficulty: "beginner",
  totalQuestions: 2,
  correctAnswers: 2,
  accuracy: 100,
  completedAt: Date.now(),
  attempts: [
    { questionId: "q-evo-01", userAnswer: "opt-b", isCorrect: true, timestamp: Date.now() },
    { questionId: "q-evo-02", userAnswer: false, isCorrect: true, timestamp: Date.now() },
  ],
};

const updatedState = recordQuizCompletion(mockSummary);
assert(updatedState.quizzesCompleted === 1, "Recording result incremented quizzesCompleted to 1");
assert(updatedState.totalCorrect === 2, "Recording result updated totalCorrect to 2");
assert(updatedState.overallAccuracy === 100, "Recording result calculated overallAccuracy to 100%");
assert(updatedState.bestScores.evolution_knowledge.percentage === 100, "Best score percentage updated for evolution_knowledge");
assert(updatedState.recentResults.length === 1, "Recent results list contains 1 entry");

// Second mock quiz result with lower score
const mockSummary2: QuizResultSummary = {
  category: "evolution_knowledge",
  difficulty: "intermediate",
  totalQuestions: 2,
  correctAnswers: 1,
  accuracy: 50,
  completedAt: Date.now(),
  attempts: [
    { questionId: "q-evo-03", userAnswer: "opt-a", isCorrect: true, timestamp: Date.now() },
    { questionId: "q-evo-04", userAnswer: "opt-c", isCorrect: false, timestamp: Date.now() },
  ],
};

const state2 = recordQuizCompletion(mockSummary2);
assert(state2.quizzesCompleted === 2, "Second result incremented quizzesCompleted to 2");
assert(state2.bestScores.evolution_knowledge.percentage === 100, "Best score remains at highest percentage (100%)");
assert(state2.overallAccuracy === 75, "Overall accuracy dynamically calculated to 75% ((2+1)/(2+2))");

// Reset test
const resetState = resetLearningProgress();
assert(resetState.quizzesCompleted === 0, "Reset learning progress returned quizzesCompleted to 0");
assert(resetState.overallAccuracy === 0, "Reset learning progress returned overallAccuracy to 0");

// [5] Final Summary
console.log("\n=======================================================");
console.log(`TOTAL CHECKS: ${totalPassed + totalFailed} | PASSED: ${totalPassed} | FAILED: ${totalFailed}`);
if (totalFailed === 0) {
  console.log("ALL INTERACTIVE LEARNING & QUIZ SYSTEM CHECKS PASSED (100%)!");
} else {
  console.error("SOME CHECKS FAILED!");
  process.exit(1);
}
console.log("=======================================================");
