import { type QuestionDto, type QuestionType } from "../types/types.js";
import { type QuestionOptionEntity } from "./question-option.entity.js";

type QuestionProperties = {
	id: number;
	isOptional: boolean;
	options: QuestionOptionEntity[];
	order: number;
	text: string;
	type: QuestionType;
};

class QuestionEntity {
	private id: number;
	private isOptional: boolean;
	private options: QuestionOptionEntity[];
	private order: number;
	private text: string;
	private type: QuestionType;

	private constructor({
		id,
		isOptional,
		options,
		order,
		text,
		type,
	}: QuestionProperties) {
		this.id = id;
		this.isOptional = isOptional;
		this.order = order;
		this.text = text;
		this.type = type;
		this.options = options;
	}

	public static initialize({
		id,
		isOptional,
		options,
		order,
		text,
		type,
	}: QuestionProperties): QuestionEntity {
		return new QuestionEntity({
			id,
			isOptional,
			options,
			order,
			text,
			type,
		});
	}

	toObject(): QuestionDto {
		return {
			id: this.id,
			isOptional: this.isOptional,
			options: this.options.map((option: QuestionOptionEntity) =>
				option.toObject(),
			),
			order: this.order,
			text: this.text,
			type: this.type,
		};
	}
}

export { QuestionEntity };
