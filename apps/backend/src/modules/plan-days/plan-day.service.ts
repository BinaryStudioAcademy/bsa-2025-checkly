import { type Service } from "~/libs/types/types.js";
import { PlanDayEntity } from "~/modules/plan-days/plan-day.entity.js";
import { type PlanDayRepository } from "~/modules/plan-days/plan-day.repository.js";

import {
	type PlanDayCreateRequestDto,
	type PlanDayGetAllResponseDto,
	type PlanDayResponseDto,
} from "./libs/types/types.js";

class PlanDayService implements Service {
	private planDayRepository: PlanDayRepository;

	public constructor(planRepository: PlanDayRepository) {
		this.planDayRepository = planRepository;
	}

	public async create(
		payload: PlanDayCreateRequestDto,
	): Promise<PlanDayResponseDto> {
		const item = await this.planDayRepository.create(
			PlanDayEntity.initializeNew(payload),
		);

		return item.toObject();
	}

	public async delete(id: number): Promise<boolean> {
		return await this.planDayRepository.delete(id);
	}

	public async find(id: number): Promise<null | PlanDayResponseDto> {
		const item = await this.planDayRepository.find(id);

		return item ? item.toObject() : null;
	}

	public async findAll(): Promise<PlanDayGetAllResponseDto> {
		const items = await this.planDayRepository.findAll();

		return {
			items: items.map((item) => item.toObject()),
		};
	}
}

export { PlanDayService };
