import { type Entity } from "~/libs/types/types.js";

class QuizAnswerEntity implements Entity {
	private id: null | number;

	private isSkipped: boolean;

	private questionId: number;

	private quizId: number;

	private userInput: string;

	private constructor({
		id,
		isSkipped,
		questionId,
		quizId,
		userInput,
	}: {
		id: null | number;
		isSkipped: boolean;
		questionId: number;
		quizId: number;
		userInput: string;
	}) {
		this.id = id;
		this.questionId = questionId;
		this.isSkipped = isSkipped;
		this.userInput = userInput;
		this.quizId = quizId;
	}

	public static initialize({
		id,
		isSkipped,
		questionId,
		quizId,
		userInput,
	}: {
		id: number;
		isSkipped: boolean;
		questionId: number;
		quizId: number;
		userInput: string;
	}): QuizAnswerEntity {
		return new QuizAnswerEntity({
			id,
			isSkipped,
			questionId,
			quizId,
			userInput,
		});
	}

	public static initializeNew({
		isSkipped,
		questionId,
		quizId,
		userInput,
	}: {
		isSkipped: boolean;
		questionId: number;
		quizId: number;
		userInput: string;
	}): QuizAnswerEntity {
		return new QuizAnswerEntity({
			id: null,
			isSkipped,
			questionId,
			quizId,
			userInput,
		});
	}

	public toNewObject(): {
		isSkipped: boolean;
		questionId: number;
		quizId: number;
		userInput: string;
	} {
		return {
			isSkipped: this.isSkipped,
			questionId: this.questionId,
			quizId: this.quizId,
			userInput: this.userInput,
		};
	}

	public toObject(): {
		id: number;
		isSkipped: boolean;
		questionId: number;
		quizId: number;
		userInput: string;
	} {
		return {
			id: this.id as number,
			isSkipped: this.isSkipped,
			questionId: this.questionId,
			quizId: this.quizId,
			userInput: this.userInput,
		};
	}
}

export { QuizAnswerEntity };
