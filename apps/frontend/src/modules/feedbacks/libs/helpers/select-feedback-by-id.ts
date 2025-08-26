import { createSelector } from "reselect";

import { type store } from "~/libs/modules/store/store.js";
import { type FeedbackDto } from "~/modules/feedbacks/feedbacks.js";

type RootState = ReturnType<typeof store.instance.getState>;

const selectFeedbacks = (state: RootState): FeedbackDto[] =>
	state.feedbacks.feedbacks;

const selectUserId = (
	_: RootState,
	userId: number | undefined,
): number | undefined => userId;

const selectFeedbackByUserId = createSelector(
	[selectFeedbacks, selectUserId],
	(feedbacks, userId): FeedbackDto | undefined => {
		if (!userId) {
			return undefined;
		}

		return feedbacks.find((f) => f.userId === userId);
	},
);

export { selectFeedbackByUserId };
