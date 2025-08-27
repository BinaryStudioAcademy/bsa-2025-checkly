import { fetchQuestions } from "~/modules/quiz-questions/slices/actions.js";
import { actions } from "~/modules/quiz-questions/slices/quiz-questions.slice.js";

const allActions = {
	...actions,
	fetchQuestions,
};

export { allActions as actions };
export { reducer } from "~/modules/quiz-questions/slices/quiz-questions.slice.js";
