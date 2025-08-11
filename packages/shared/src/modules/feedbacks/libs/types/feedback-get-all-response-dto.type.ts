type FeedbackGetAllResponseDto = {
	createdAt: string;
	id: number;
	text: string;
	updatedAt: string;
	user: null | UserDto;
	userId: number;
};

type UserDto = {
	email: string;
	id: number;
	name: string;
};

export { type FeedbackGetAllResponseDto };
