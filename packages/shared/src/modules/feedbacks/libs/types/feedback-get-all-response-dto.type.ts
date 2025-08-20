type FeedbackDto = {
	createdAt: string;
	id: number;
	text: string;
	updatedAt: string;
	user: null | UserPartialDto;
	userId: number;
};

type feedbackPaginationParameters = {
	items: FeedbackDto[];
	limit: number;
	page: number;
	total: number;
};

type FeedbackServiceReturns = {
	items: FeedbackDto[];
	limit: number;
	page: number;
	total: number;
};

type UserPartialDto = {
	avatarUrl: null | string;
	id: number;
	name: string;
};

export {
	type FeedbackDto,
	type feedbackPaginationParameters,
	type FeedbackServiceReturns,
};
