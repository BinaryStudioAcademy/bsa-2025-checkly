import { type Repository } from "~/libs/types/types.js";
import { PlanEntity } from "~/modules/plans/plan.entity.js";
import { type PlanModel } from "~/modules/plans/plan.model.js";

class PlanRepository implements Repository {
	private planModel: typeof PlanModel;
	public constructor(planModel: typeof PlanModel) {
		this.planModel = planModel;
	}

	public async create(entity: PlanEntity): Promise<PlanEntity> {
		const { duration, intensity, isActive, parentPlanId, title, userId } =
			entity.toNewObject();

		const plan = await this.planModel
			.query()
			.insert({
				duration,
				intensity,
				isActive,
				parentPlanId,
				title,
				userId,
			})
			.returning("*")
			.execute();

		return PlanEntity.initialize(plan);
	}

	public delete(): ReturnType<Repository["delete"]> {
		return Promise.resolve(true);
	}

	public find(): ReturnType<Repository["find"]> {
		return Promise.resolve(null);
	}

	public async findAll(): Promise<PlanEntity[]> {
		const plans = await this.planModel.query().execute();

		return plans.map((plan) => PlanEntity.initialize(plan));
	}

	public async findById(id: number): Promise<null | PlanEntity> {
		const plan = await this.planModel
			.query()
			.findById(id)
			.withGraphFetched("days.tasks");

		return plan ? PlanEntity.initialize(plan) : null;
	}

	public update(): ReturnType<Repository["find"]> {
		return Promise.resolve(null);
	}
}

export { PlanRepository };
