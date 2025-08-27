import { type Service, type ValueOf } from "~/libs/types/types.js";
import { PlanEntity } from "~/modules/plans/plan.entity.js";
import { type PlanRepository } from "~/modules/plans/plan.repository.js";

import { openAiService } from "../openai/openai.js";
import { type OpenAIService } from "../openai/openai.service.js";
import { planCategoryService } from "../plan-categories/plan-categories.js";
import { type PlanCategoryService } from "../plan-categories/plan-category.service.js";
import { type PlanDayService } from "../plan-days/plan-day.service.js";
import { planDayService } from "../plan-days/plan-days.js";
import { PlanStyle } from "../plan-styles/libs/enums/enums.js";
import { type ExecutionTimeType } from "../tasks/libs/enums/enums.js";
import { type TaskService } from "../tasks/task.service.js";
import { taskService } from "../tasks/tasks.js";
import { LAST_INDEX } from "./libs/constants/constants.js";
import {
	type GeneratedPlanDTO,
	type GeneratePlanRequestDto,
	type PlanCategoryDto,
	type PlanCreateRequestDto,
	type PlanDayCreateRequestDto,
	type PlanDayDto,
	type PlanDaysTaskDto,
	type PlanDto,
	type PlanGetAllResponseDto,
	type PlanResponseDto,
	type PlanSearchQueryParameter,
	type PlanUpdateRequestDto,
	type PlanWithCategoryDto,
	type TaskCreateRequestDto,
	type TaskDto,
} from "./libs/types/types.js";
import { createPrompt } from "./libs/utilities/utilities.js";

class PlanService implements Service {
	private openAIService: OpenAIService;
	private planCategoryService: PlanCategoryService;
	private planDayService: PlanDayService;
	private planRepository: PlanRepository;
	private taskService: TaskService;

	public constructor(planRepository: PlanRepository) {
		this.planRepository = planRepository;
		this.openAIService = openAiService;
		this.planDayService = planDayService;
		this.taskService = taskService;
		this.planCategoryService = planCategoryService;
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
		payload: GeneratePlanRequestDto,
	): Promise<PlanDaysTaskDto> {
		const userPrompt = createPrompt(payload.quizAnswers);
		const plan = await this.openAIService.generatePlan({ userPrompt });

		const savedPlan = await this.saveToDB({
			category: payload.quizAnswers.category,
			plan,
			userId: payload.userId,
		});

		return savedPlan;
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

	private async saveToDB({
		category,
		plan,
		userId,
	}: {
		category: string;
		plan: GeneratedPlanDTO;
		userId: null | number;
	}): Promise<PlanDaysTaskDto> {
		const categories: PlanCategoryDto[] =
			await this.planCategoryService.findAll();

		const planEntity: PlanCreateRequestDto = {
			categoryId:
				categories.find((element) => element.key === category)?.id ??
				LAST_INDEX,
			duration: plan.duration,
			intensity: plan.intensity,
			styleId: PlanStyle.WITH_REMARKS,
			title: plan.title,
			userId,
		};

		const planResponse = await this.create(planEntity);

		const days: PlanDayDto[] = [];

		for (const day of plan.days) {
			const planDayEntity: PlanDayCreateRequestDto = {
				dayNumber: day.dayNumber,
				planId: planResponse.id,
			};
			const planDayResponse = await this.planDayService.create(planDayEntity);

			const tasks: TaskDto[] = [];

			for (const task of day.tasks) {
				const taskEntity: TaskCreateRequestDto = {
					description: task.description,
					executionTimeType: task.executionTimeType,
					isCompleted: false,
					order: task.order,
					planDayId: planDayResponse.id,
					title: task.title,
				};

				const taskResponse = await this.taskService.create(taskEntity);
				tasks.push({
					...taskResponse,
					executionTimeType: taskResponse.executionTimeType as ValueOf<
						typeof ExecutionTimeType
					>,
				});
			}

			days.push({ ...planDayResponse, tasks });
		}

		const result: PlanDaysTaskDto = {
			...planResponse,
			days,
			styleId: PlanStyle.WITH_REMARKS,
		};

		return result;
	}
}

export { PlanService };
