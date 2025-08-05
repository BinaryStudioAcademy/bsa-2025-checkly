type QuizAnswer = {
	isSkipped: boolean;
	question: string;
	questionId: number;
	selectedOptions: (number | string)[];
	userInput: string;
};

type QuizAnswersRequestDto = {
	answers: QuizAnswer[];
	category: string;
	notes: string;
};

export { type QuizAnswer, type QuizAnswersRequestDto };