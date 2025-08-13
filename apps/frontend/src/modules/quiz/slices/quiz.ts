import { fetchQuestions, submitQuiz } from "~/modules/quiz/slices/actions.js";
import { actions } from "~/modules/quiz/slices/quiz.slice.js";

const allActions = {
	...actions,
	fetchQuestions,
	submitQuiz,
};

export { allActions as actions };
export { reducer } from "~/modules/quiz/slices/quiz.slice.js";
