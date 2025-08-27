import {
	createFeedback,
	deleteFeedback,
	fetchAllFeedbacks,
	fetchFeedbackById,
	updateFeedback,
} from "~/modules/feedbacks/slices/actions.js";
import { actions } from "~/modules/feedbacks/slices/feedbacks.slice.js";

const allActions = {
	...actions,
	createFeedback,
	deleteFeedback,
	fetchAllFeedbacks,
	fetchFeedbackById,
	updateFeedback,
};

export { allActions as actions };
export { reducer } from "~/modules/feedbacks/slices/feedbacks.slice.js";
