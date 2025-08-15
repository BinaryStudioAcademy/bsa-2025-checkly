import { type PlanCategoryDto } from "./libs/types/types.js";

class PlanCategoryEntity {
	constructor(
		private readonly id: number,
		private readonly title: string,
	) {}
	public static initialize({
		id,
		title,
	}: {
		id: number;
		title: string;
	}): PlanCategoryEntity {
		return new PlanCategoryEntity(id, title);
	}

	toObject(): PlanCategoryDto {
		return {
			id: this.id,
			title: this.title,
		};
	}
}

export { PlanCategoryEntity };
