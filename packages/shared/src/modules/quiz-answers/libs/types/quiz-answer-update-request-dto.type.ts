type QuizAnswerUpdateRequestDto = {
	isSkipped?: boolean;
	questionId?: number;
	questionText?: string;
	selectedOptions?: (number | string)[];
	userInput?: string;
};

export { type QuizAnswerUpdateRequestDto };
