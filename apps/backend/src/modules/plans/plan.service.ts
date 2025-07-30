import { type Repository, type Service } from "~/libs/types/types.js";
import { PlanEntity } from "~/modules/plans/plan.entity.js";
import { type PlanRepository } from "~/modules/plans/plan.repository.js";

import {
	type PlanDaysTaskDto,
	type PlanGetAllResponseDto,
	type PlanRequestDto,
	type PlanResponseDto,
} from "./libs/types/types.js";

class PlanService implements Service {
	private planRepository: PlanRepository;

	public constructor(planRepository: PlanRepository) {
		this.planRepository = planRepository;
	}

	public async create(payload: PlanRequestDto): Promise<PlanResponseDto> {
		const item = await this.planRepository.create(
			PlanEntity.initializeNew(payload),
		);

		return item.toObject();
	}

	public delete(): ReturnType<Repository["delete"]> {
		return Promise.resolve(true);
	}

	public find(): ReturnType<Repository["find"]> {
		return Promise.resolve(null);
	}

	public async findAll(): Promise<PlanGetAllResponseDto> {
		const items = await this.planRepository.findAll();

		return {
			items: items.map((item) => item.toObject()),
		};
	}

	public async findById(id: number): Promise<null | PlanDaysTaskDto> {
		const item = await this.planRepository.findById(id);

		return item ? item.toObjectWithRelations() : null;
	}

	public update(): ReturnType<Repository["find"]> {
		return Promise.resolve(null);
	}
}

export { PlanService };
