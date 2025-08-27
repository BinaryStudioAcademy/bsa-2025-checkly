import { saveAnswers } from "./actions.js";
import { actions } from "./quiz-answers.slice.js";

const allActions = {
	...actions,
	saveAnswers,
};

export { allActions as actions };
export { reducer } from "./quiz-answers.slice.js";
