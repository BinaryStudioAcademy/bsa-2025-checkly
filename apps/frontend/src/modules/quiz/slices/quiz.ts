import { fetchQuestions, submitQuiz } from "./actions.js";
import { actions } from "./quiz.slice.js";

const allActions = {
	...actions,
	fetchQuestions,
	submitQuiz,
};

export { allActions as actions };
export { reducer } from "./quiz.slice.js"; 