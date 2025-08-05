type QuizAnswer = {
	isSkipped: boolean;
	questionId: number;
	selectedOptions: (number | string)[];
	userInput?: string;
};

export { type QuizAnswer };
