type QuizAnswer = {
	isSkipped: boolean;
	questionId: number;
	questionText: string;
	selectedOptions: (number | string)[];
	userInput: string;
};

export { type QuizAnswer };