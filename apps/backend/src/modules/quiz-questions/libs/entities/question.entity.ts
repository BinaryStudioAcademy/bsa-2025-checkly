import { type QuestionDto, type QuestionType } from "../types/types.js";
import { type QuestionOptionEntity } from "./question-option.entity.js";

type QuestionProperties = {
	id: number;
	isOptional: boolean;
	options: QuestionOptionEntity[];
	text: string;
	type: QuestionType;
};

class QuestionEntity {
	private id: number;
	private isOptional: boolean;
	private options: QuestionOptionEntity[];
	private text: string;
	private type: QuestionType;

	private constructor({
		id,
		isOptional,
		options,
		text,
		type,
	}: QuestionProperties) {
		this.id = id;
		this.isOptional = isOptional;
		this.text = text;
		this.type = type;
		this.options = options;
	}

	public static initialize({
		id,
		isOptional,
		options,
		text,
		type,
	}: QuestionProperties): QuestionEntity {
		return new QuestionEntity({
			id,
			isOptional,
			options,
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
			text: this.text,
			type: this.type,
		};
	}
}

export { QuestionEntity };
