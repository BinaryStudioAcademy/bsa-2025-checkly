import { type Repository } from "~/libs/types/types.js";
import { PlanStyleEntity } from "~/modules/plan-styles/plan-style.entity.js";
import { type PlanStyleModel } from "~/modules/plan-styles/plan-style.model.js";

class PlanStyleRepository implements Repository {
	private planStyleModel: typeof PlanStyleModel;

	public constructor(planStyleModel: typeof PlanStyleModel) {
		this.planStyleModel = planStyleModel;
	}

	public async create(entity: PlanStyleEntity): Promise<PlanStyleEntity> {
		const planStyle = await this.planStyleModel
			.query()
			.insert(entity.toNewObject())
			.returning("*")
			.execute();

		return PlanStyleEntity.initialize(planStyle);
	}

	public async delete(id: number): Promise<boolean> {
		const deletedPlanStyle = await this.planStyleModel.query().deleteById(id);

		return Boolean(deletedPlanStyle);
	}

	public async find(id: number): Promise<null | PlanStyleEntity> {
		const planStyle = await this.planStyleModel.query().findById(id);

		return planStyle ? PlanStyleEntity.initialize(planStyle) : null;
	}

	public async findAll(): Promise<PlanStyleEntity[]> {
		const planStyles = await this.planStyleModel.query().execute();

		return planStyles.map((planStyle) => PlanStyleEntity.initialize(planStyle));
	}

	public async update(
		id: number,
		payload: Partial<PlanStyleModel>,
	): Promise<null | PlanStyleEntity> {
		const updatedPlanStyle = await this.planStyleModel
			.query()
			.patchAndFetchById(id, payload);

		return PlanStyleEntity.initialize(updatedPlanStyle);
	}
}

export { PlanStyleRepository };
