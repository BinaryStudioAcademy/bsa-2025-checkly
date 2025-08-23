import { PlanCategoryEntity } from "./plan-category.entity.js";
import { type PlanCategoryModel } from "./plan-category.model.js";

class PlanCategoryRepository {
	private planCategoryModel: typeof PlanCategoryModel;

	public constructor(planCategoryModel: typeof PlanCategoryModel) {
		this.planCategoryModel = planCategoryModel;
	}

	public async find(id: number): Promise<null | PlanCategoryEntity> {
		const category = await this.planCategoryModel.query().findById(id);

		return category ? PlanCategoryEntity.initialize(category) : null;
	}

	public async findAll(): Promise<PlanCategoryEntity[]> {
		return await this.planCategoryModel
			.query()
			.then((categories) =>
				categories.map((category) => PlanCategoryEntity.initialize(category)),
			);
	}
}

export { PlanCategoryRepository };
