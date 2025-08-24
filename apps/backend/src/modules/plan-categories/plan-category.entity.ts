import { type PlanCategoryDto } from "./libs/types/types.js";

class PlanCategoryEntity {
	private iconHref: string;
	private id: number;
	private key: string;
	private order: number;
	private title: string;

	constructor({ iconHref, id, key, order, title }: PlanCategoryDto) {
		this.iconHref = iconHref;
		this.id = id;
		this.order = order;
		this.title = title;
		this.key = key;
	}
	public static initialize({
		iconHref,
		id,
		key,
		order,
		title,
	}: PlanCategoryDto): PlanCategoryEntity {
		return new PlanCategoryEntity({ iconHref, id, key, order, title });
	}

	toObject(): PlanCategoryDto {
		return {
			iconHref: this.iconHref,
			id: this.id,
			key: this.key,
			order: this.order,
			title: this.title,
		};
	}
}

export { PlanCategoryEntity };
