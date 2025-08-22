type FeedbackDto = {
	createdAt: string;
	id: number;
	text: string;
	updatedAt: string;
	user: null | UserPartialDto;
	userId: number;
};

type UserPartialDto = {
	avatarUrl: null | string;
	id: number;
	name: string;
};

export { type FeedbackDto };
