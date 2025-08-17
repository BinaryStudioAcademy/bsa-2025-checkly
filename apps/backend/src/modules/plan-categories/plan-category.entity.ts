import { type PlanCategoryDto } from "./libs/types/types.js";

class PlanCategoryEntity {
	private readonly iconHref: string;
	private readonly id: number;
	private readonly order: number;
	private readonly title: string;

	constructor({ iconHref, id, order, title }: PlanCategoryDto) {
		this.iconHref = iconHref;
		this.id = id;
		this.order = order;
		this.title = title;
	}
	public static initialize({
		iconHref,
		id,
		order,
		title,
	}: PlanCategoryDto): PlanCategoryEntity {
		return new PlanCategoryEntity({ iconHref, id, order, title });
	}

	toObject(): PlanCategoryDto {
		return {
			iconHref: this.iconHref,
			id: this.id,
			order: this.order,
			title: this.title,
		};
	}
}

export { PlanCategoryEntity };
