import { type Service } from "~/libs/types/types.js";
import { PlanEntity } from "~/modules/plans/plan.entity.js";
import { type PlanRepository } from "~/modules/plans/plan.repository.js";

import {
	type PlanCreateRequestDto,
	type PlanDaysTaskDto,
	type PlanDto,
	type PlanGetAllResponseDto,
	type PlanResponseDto,
	type PlanUpdateRequestDto,
	type QuizAnswersRequestDto,
} from "./libs/types/types.js";
import { createPrompt } from "./libs/utilities/utilities.js";

class PlanService implements Service {
	private planRepository: PlanRepository;

	public constructor(planRepository: PlanRepository) {
		this.planRepository = planRepository;
	}

	public async create(payload: PlanCreateRequestDto): Promise<PlanResponseDto> {
		const item = await this.planRepository.create(
			PlanEntity.initializeNew(payload),
		);

		return item.toObject();
	}

	public async delete(id: number): Promise<boolean> {
		return await this.planRepository.delete(id);
	}

	public async find(id: number): Promise<null | PlanDto> {
		const item = await this.planRepository.find(id);

		return item ? item.toObject() : null;
	}

	public async findAll(): Promise<PlanGetAllResponseDto> {
		const items = await this.planRepository.findAll();

		return {
			items: items.map((item) => item.toObject()),
		};
	}

	public async findWithRelations(id: number): Promise<null | PlanDaysTaskDto> {
		const item = await this.planRepository.findWithRelations(id);

		return item ? item.toObjectWithRelations() : null;
	}

	public generateFromQuizAnswers(
		payload: QuizAnswersRequestDto,
	): PlanDaysTaskDto {
		createPrompt(payload);
		const mockedPlan = {
			"days": [
				{
					"dayNumber": 3,
					"id": 1,
					"tasks": [],
				},
				{
					"dayNumber": 3,
					"id": 2,
					"tasks": [],
				},
				{
					"dayNumber": 3,
					"id": 3,
					"tasks": [
						{
							"completedAt": null,
							"description": "Test description",
							"executionTimeType": "",
							"id": 2,
							"isCompleted": false,
							"order": 1,
							"title": "do 1",
						},
					],
				},
			],
			"duration": 2,
			"id": 1,
			"intensity": "2",
			"title": "Test title",
			"userId": 2,
		};

		return mockedPlan;
	}

	public async update(
		id: number,
		payload: PlanUpdateRequestDto,
	): Promise<null | PlanDto> {
		const plan = await this.planRepository.update(id, payload);

		return plan ? plan.toObject() : null;
	}
}

export { PlanService };
