import { type PlanStyleEntity } from "./plan-style.entity.js";
import { type PlanStyleRepository } from "./plan-style.repository.js";

class PlanStyleService {
	private planStyleRepository: PlanStyleRepository;

	public constructor(planStyleRepository: PlanStyleRepository) {
		this.planStyleRepository = planStyleRepository;
	}

	public async findAll(): Promise<PlanStyleEntity[]> {
		return await this.planStyleRepository.findAll();
	}
}

export { PlanStyleService };
