import { type Service } from "~/libs/types/types.js";
import { PlanEntity } from "~/modules/plans/plan.entity.js";
import { type PlanRepository } from "~/modules/plans/plan.repository.js";

import { openAiService } from "../openai/openai.js";
import { type OpenAIService } from "../openai/openai.service.js";
import {
	type GeneratedPlanDTO,
	type PlanCreateRequestDto,
	type PlanDto,
	type PlanGetAllResponseDto,
	type PlanResponseDto,
	type PlanSearchQueryParameter,
	type PlanUpdateRequestDto,
	type PlanWithCategoryDto,
	type QuizAnswersRequestDto,
} from "./libs/types/types.js";
import { createPrompt } from "./libs/utilities/utilities.js";

class PlanService implements Service {
	private openAIService: OpenAIService;
	private planRepository: PlanRepository;

	public constructor(planRepository: PlanRepository) {
		this.planRepository = planRepository;
		this.openAIService = openAiService;
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

	public async findAllUserPlans(
		userId: number,
	): Promise<PlanWithCategoryDto[]> {
		return await this.planRepository
			.findAllUserPlans(userId)
			.then((plan) => plan.map((item) => item.toObjectWithCategory()));
	}

	public async findWithRelations(
		id: number,
	): Promise<null | PlanWithCategoryDto> {
		const item = await this.planRepository.findWithRelations(id);

		return item ? item.toObjectWithCategory() : null;
	}

	public async generate(
		payload: QuizAnswersRequestDto,
	): Promise<GeneratedPlanDTO> {
		const userPrompt = createPrompt(payload);
		const plan = await this.openAIService.generatePlan({ userPrompt });

		return plan;
	}

	public async search(
		userId: number,
		filters: PlanSearchQueryParameter,
	): Promise<PlanWithCategoryDto[]> {
		return await this.planRepository
			.search({
				userId,
				...filters,
			})
			.then((plans) => plans.map((plan) => plan.toObjectWithCategory()));
	}

	public async update(
		id: number,
		payload: PlanUpdateRequestDto,
	): Promise<null | PlanDto> {
		const plan = await this.planRepository.update(id, payload);

		return plan ? plan.toObject() : null;
	}

	public async updateStyle(
		userId: number,
		planId: number,
		styleId: number,
	): Promise<null | PlanDto> {
		const plan = await this.planRepository.updateStyle(userId, planId, styleId);

		return plan ? plan.toObject() : null;
	}
}

export { PlanService };
