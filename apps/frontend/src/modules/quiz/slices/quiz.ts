import { fetchQuestions } from "~/modules/quiz/slices/actions.js";
import { actions } from "~/modules/quiz/slices/quiz.slice.js";

const allActions = {
	...actions,
	fetchQuestions,
};

export { allActions as actions };
export { reducer } from "~/modules/quiz/slices/quiz.slice.js";
