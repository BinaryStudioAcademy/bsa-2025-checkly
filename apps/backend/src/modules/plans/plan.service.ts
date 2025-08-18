import { type Service } from "~/libs/types/types.js";
import { PlanEntity } from "~/modules/plans/plan.entity.js";
import { type PlanRepository } from "~/modules/plans/plan.repository.js";

import { MOCK_GENERATED_PLAN } from "./libs/constants/constants.js";
import { ErrorMessage, HTTPCode, HTTPError } from "./libs/enums/enums.js";
import {
	type PlanCreateRequestDto,
	type PlanDaysTaskDto,
	type PlanDto,
	type PlanGetAllResponseDto,
	type PlanResponseDto,
	type PlanUpdateRequestDto,
} from "./libs/types/types.js";

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

	public async regenerate(id: number): Promise<null | PlanDaysTaskDto> {
		const existingPlan = await this.planRepository.find(id);

		if (!existingPlan) {
			throw new HTTPError({
				message: ErrorMessage.PLAN_NOT_FOUND,
				status: HTTPCode.NOT_FOUND,
			});
		}

		// TODO: Replace with actual quizId from plan when available
		// const quizId = 1;
		// const answers = await this.quizAnswerRepository.findAllWithOption(quizId);

		// TODO: Replace mock with OpenAI service
		// const prompt = createPrompt({ answers, category: "creativity", notes: "" });
		// const generatedPlan = await this.openAIService.generatePlan(prompt);

		const generatedPlan: PlanDaysTaskDto = MOCK_GENERATED_PLAN;
		const planEntity = PlanEntity.initialize(generatedPlan);

		const newPlanId = await this.planRepository.regenerate(planEntity);

		if (!newPlanId) {
			throw new HTTPError({
				message: ErrorMessage.PLAN_REGENERATION_FAILED,
				status: HTTPCode.INTERNAL_SERVER_ERROR,
			});
		}

		const newPlan = await this.planRepository.findWithRelations(newPlanId);

		return newPlan ? newPlan.toObjectWithRelations() : null;
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
