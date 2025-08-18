type FeedbackPaginationOptions = {
	body: unknown;
	params: unknown;
	query: feedbackPaginationParameters;
};

type feedbackPaginationParameters = {
	limit?: number;
	offset?: number;
};

export { type FeedbackPaginationOptions, type feedbackPaginationParameters };
