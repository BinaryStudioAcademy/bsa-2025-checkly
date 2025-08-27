import { type store } from "~/libs/modules/store/store.js";
import { type FeedbackDto } from "~/modules/feedbacks/feedbacks.js";

type RootState = ReturnType<typeof store.instance.getState>;

const selectFeedbackByUserId = (
	state: RootState,
	userId: number | undefined,
): FeedbackDto | undefined => {
	if (!userId) {
		return undefined;
	}

	return state.feedbacks.feedbacks.find((f) => f.userId === userId);
};

export { selectFeedbackByUserId };
