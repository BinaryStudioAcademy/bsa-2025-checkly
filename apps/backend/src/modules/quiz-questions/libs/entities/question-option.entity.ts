import {
	type QuestionOptionDto,
	type QuestionOptionProperties,
} from "../types/types.js";

class QuestionOptionEntity {
	constructor(
		private readonly id: number,
		private readonly order: number,
		private readonly text: string,
	) {}
	public static initialize({
		id,
		order,
		text,
	}: QuestionOptionProperties): QuestionOptionEntity {
		return new QuestionOptionEntity(id, order, text);
	}

	toObject(): QuestionOptionDto {
		return {
			id: this.id,
			order: this.order,
			text: this.text,
		};
	}
}

export { QuestionOptionEntity };
