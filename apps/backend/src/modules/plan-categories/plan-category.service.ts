import { type PlanCategoryDto } from "shared";

import { type PlanCategoryRepository } from "./plan-category.repository.js";

class PlanCategoryService {
	private planCategoryRepository: PlanCategoryRepository;

	public constructor(planCategoryRepository: PlanCategoryRepository) {
		this.planCategoryRepository = planCategoryRepository;
	}

	public async findAll(): Promise<PlanCategoryDto[]> {
		return await this.planCategoryRepository
			.findAll()
			.then((categories) => categories.map((category) => category.toObject()));
	}
}

export { PlanCategoryService };
