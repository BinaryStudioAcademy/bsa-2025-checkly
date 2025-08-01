import { type Repository } from "~/libs/types/types.js";
import { PlanDayEntity } from "~/modules/plan-days/plan-day.entity.js";
import { type PlanDayModel } from "~/modules/plan-days/plan-day.model.js";

class PlanDayRepository implements Repository {
	private planDayModel: typeof PlanDayModel;
	public constructor(planDayModel: typeof PlanDayModel) {
		this.planDayModel = planDayModel;
	}

	public async create(entity: PlanDayEntity): Promise<PlanDayEntity> {
		const { dayNumber, planId } = entity.toNewObject();

		const planDays = await this.planDayModel
			.query()
			.insert({
				dayNumber,
				planId,
			})
			.returning("*")
			.execute();

		return PlanDayEntity.initialize(planDays);
	}

	public delete(): ReturnType<Repository["delete"]> {
		return Promise.resolve(true);
	}

	public find(): ReturnType<Repository["find"]> {
		return Promise.resolve(null);
	}

	public async findAll(): Promise<PlanDayEntity[]> {
		const planDays = await this.planDayModel.query().execute();

		return planDays.map((planDay) => PlanDayEntity.initialize(planDay));
	}

	public async findById(id: number): Promise<null | PlanDayEntity> {
		const planDay = await this.planDayModel.query().where({ id }).first();

		return planDay ? PlanDayEntity.initialize(planDay) : null;
	}

	public update(): ReturnType<Repository["find"]> {
		return Promise.resolve(null);
	}
}

export { PlanDayRepository };
