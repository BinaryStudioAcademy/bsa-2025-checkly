import { type QuestionType } from "shared";
import { type QuestionDto } from "shared/src/modules/quiz/libs/types/question.dto.js";

import { type Entity } from "~/libs/types/entity.type.js";

import { type QuestionOptionEntity } from "./question-option.entity.js";

class QuestionEntity implements Entity {
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
	}: {
		id: number;
		isOptional: boolean;
		options: QuestionOptionEntity[];
		order: number;
		text: string;
		type: QuestionType;
	}) {
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
	}: {
		id: number;
		isOptional: boolean;
		options: QuestionOptionEntity[];
		order: number;
		text: string;
		type: QuestionType;
	}): QuestionEntity {
		return new QuestionEntity({
			id,
			isOptional,
			options,
			order,
			text,
			type,
		});
	}

	toNewObject(): unknown {
		throw new Error("Method not implemented.");
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
