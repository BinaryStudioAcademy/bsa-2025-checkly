import { type QuestionOptionDto } from "shared/src/modules/quiz/libs/types/question-option.dto.js";

import { type Entity } from "~/libs/types/entity.type.js";

class QuestionOptionEntity implements Entity {
	constructor(
		private id: number,
		private order: number,
		private text: string,
	) {}

	public static initialize({
		id,
		order,
		text,
	}: {
		id: number;
		order: number;
		text: string;
	}): QuestionOptionEntity {
		return new QuestionOptionEntity(id, order, text);
	}

	toNewObject(): QuestionOptionDto {
		return this.toObject();
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
