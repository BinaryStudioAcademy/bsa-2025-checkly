type FeedbackDto = {
	createdAt: string;
	id: number;
	text: string;
	updatedAt: string;
	user: null | UserDto;
	userId: number;
};

type FeedbackServiceReturns = {
	items: FeedbackDto[];
	limit: number;
	page: number;
	total: number;
};

type UserDto = {
	email: string;
	id: number;
	name: string;
};

export { type FeedbackDto, type FeedbackServiceReturns };
