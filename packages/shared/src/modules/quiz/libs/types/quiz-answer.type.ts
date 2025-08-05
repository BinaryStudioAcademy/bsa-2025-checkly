type QuizAnswer = {
	isSkipped: boolean;
	question: string;
	questionId: number;
	selectedOptions: (number | string)[];
	userInput: string;
};

export { type QuizAnswer };
