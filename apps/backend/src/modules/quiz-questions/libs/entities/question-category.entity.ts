import { type QuestionCategoryDto } from "../types/types.js";
import { type QuestionEntity } from "./question.entity.js";

type QuestionCategoryProperties = {
	categoryId: number;
	id: number;
	order: number;
	question: QuestionEntity;
	questionId: number;
};

class QuestionCategoryEntity {
	private categoryId: number;
	private id: number;
	private order: number;
	private question: QuestionEntity;
	private questionId: number;

	private constructor({
		categoryId,
		id,
		order,
		question,
		questionId,
	}: QuestionCategoryProperties) {
		this.id = id;
		this.categoryId = categoryId;
		this.order = order;
		this.question = question;
		this.questionId = questionId;
	}

	public static initialize({
		categoryId,
		id,
		order,
		question,
		questionId,
	}: QuestionCategoryProperties): QuestionCategoryEntity {
		return new QuestionCategoryEntity({
			categoryId,
			id,
			order,
			question,
			questionId,
		});
	}

	toObjectWithQuestion(): QuestionCategoryDto {
		return {
			categoryId: this.categoryId,
			id: this.id,
			order: this.order,
			question: this.question.toObject(),
			questionId: this.questionId,
		};
	}
}

export { QuestionCategoryEntity };
