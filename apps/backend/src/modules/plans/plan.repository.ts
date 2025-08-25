import { type Repository } from "~/libs/types/types.js";
import { PlanEntity } from "~/modules/plans/plan.entity.js";
import { type PlanModel } from "~/modules/plans/plan.model.js";

import { type SearchProperties } from "./libs/types/types.js";

class PlanRepository implements Repository {
	private planModel: typeof PlanModel;

	public constructor(planModel: typeof PlanModel) {
		this.planModel = planModel;
	}

	public async create(entity: PlanEntity): Promise<PlanEntity> {
		const { categoryId, duration, intensity, styleId, title, userId } =
			entity.toNewObject();

		const plan = await this.planModel
			.query()
			.insert({
				categoryId,
				duration,
				intensity,
				styleId,
				title,
				userId,
			})
			.returning("*")
			.execute();

		return PlanEntity.initialize(plan);
	}

	public async delete(id: number): Promise<boolean> {
		const deletedPlan = await this.planModel.query().deleteById(id);

		return Boolean(deletedPlan);
	}

	public async find(id: number): Promise<null | PlanEntity> {
		const plan = await this.planModel.query().findById(id);

		return plan ? PlanEntity.initialize(plan) : null;
	}

	public async findAll(): Promise<PlanEntity[]> {
		const plans = await this.planModel.query().execute();

		return plans.map((plan) => PlanEntity.initialize(plan));
	}

	public async findAllUserPlans(userId: number): Promise<PlanEntity[]> {
		return await this.planModel
			.query()
			.where({ userId })
			.orderBy("createdAt", "desc")
			.withGraphFetched("days.tasks")
			.withGraphFetched("category")
			.then((plans) => plans.map((plan) => PlanEntity.initialize(plan)));
	}

	public async findWithRelations(id: number): Promise<null | PlanEntity> {
		const plan = await this.planModel
			.query()
			.findById(id)
			.withGraphFetched("days.tasks");

		return plan ? PlanEntity.initialize(plan) : null;
	}

	public async search({
		categoryId,
		title,
		userId,
	}: SearchProperties): Promise<PlanEntity[]> {
		let query = this.planModel
			.query()
			.where({ userId })
			.withGraphFetched("days.tasks")
			.withGraphFetched("category");

		if (title) {
			query = query.whereILike("title", `%${title}%`);
		}

		if (categoryId) {
			query = query.where({ categoryId });
		}

		const foundPlans = await query;

		return foundPlans.map((plan) => PlanEntity.initialize(plan));
	}

	public async update(
		id: number,
		payload: Partial<PlanModel>,
	): Promise<null | PlanEntity> {
		const updatedPlan = await this.planModel
			.query()
			.patchAndFetchById(id, payload);

		return PlanEntity.initialize(updatedPlan);
	}

	public async updateStyle(
		userId: number,
		planId: number,
		styleId: number,
	): Promise<null | PlanEntity> {
		const updatedPlan = await this.planModel
			.query()
			.where({ id: planId, userId })
			.patch({ styleId })
			.returning("*")
			.first();

		return updatedPlan ? PlanEntity.initialize(updatedPlan) : null;
	}
}

export { PlanRepository };
