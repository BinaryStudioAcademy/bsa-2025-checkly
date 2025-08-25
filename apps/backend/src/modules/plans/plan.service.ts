import { type Service } from "~/libs/types/types.js";
import { PlanEntity } from "~/modules/plans/plan.entity.js";
import { type PlanRepository } from "~/modules/plans/plan.repository.js";

import { openAiService } from "../openai/openai.js";
import { type OpenAIService } from "../openai/openai.service.js";
import { planCategoryService } from "../plan-categories/plan-categories.js";
import { type PlanCategoryService } from "../plan-categories/plan-category.service.js";
import { type PlanDayRepository } from "../plan-days/plan-day.repository.js";
import { type PlanDayService } from "../plan-days/plan-day.service.js";
import { planDayService } from "../plan-days/plan-days.js";
import { type TaskRepository } from "../tasks/task.repository.js";
import { type TaskService } from "../tasks/task.service.js";
import { taskService } from "../tasks/tasks.js";
import {
	LAST_INDEX,
	MOCK_GENERATED_PLAN,
	MOCK_GENERATED_PLAN_DAY,
	MOCK_GENERATED_TASK,
} from "./libs/constants/constants.js";
import { ErrorMessage, HTTPCode, HTTPError } from "./libs/enums/enums.js";
import {
	type GeneratedDayDTO,
	type GeneratedPlanDTO,
	type GeneratedTaskDTO,
	type GeneratePlanRequestDto,
	type PlanActionType,
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

type ActionType = keyof ActionTypeMap;

type ActionTypeMap = {
	day: GeneratedDayDTO;
	plan: GeneratedPlanDTO;
	task: GeneratedTaskDTO;
};

class PlanService implements Service {
	private openAIService: OpenAIService;
	private planCategoryService: PlanCategoryService;
	private planDayRepository: PlanDayRepository;
	private planDayService: PlanDayService;
	private planRepository: PlanRepository;
	private taskRepository: TaskRepository;
	private taskService: TaskService;

	public constructor(
		planRepository: PlanRepository,
		planDayRepository: PlanDayRepository,
		taskRepository: TaskRepository,
	) {
		this.planRepository = planRepository;
		this.openAIService = openAiService;
		this.planDayService = planDayService;
		this.planDayRepository = planDayRepository;
		this.taskService = taskService;
		this.planCategoryService = planCategoryService;
		this.taskRepository = taskRepository;
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

	public async findActiveByUserId(
		userId: number,
	): Promise<null | PlanDaysTaskDto> {
		const item = await this.planRepository.findActiveByUserId(userId);

		return item ? item.toObjectWithRelations() : null;
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

	public async generate<T extends ActionType>(
		payload: GeneratePlanRequestDto,
		actionType: PlanActionType,
	): Promise<ActionTypeMap[T]> {
		const userPrompt = createPrompt(payload.quizAnswers);
		const result = await this.openAIService.generate({
			actionType,
			userPrompt,
		});

		return result as ActionTypeMap[T];
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
		await this.planRepository.regenerate(id, generatedPlan);

		const newPlan = await this.planRepository.findWithRelations(id);

		return newPlan ? newPlan.toObjectWithRelations() : null;
	}

	public async regenerateDay(
		planId: number,
		dayId: number,
	): Promise<null | PlanDaysTaskDto> {
		const existingPlan = await this.planRepository.find(planId);

		if (!existingPlan) {
			throw new HTTPError({
				message: ErrorMessage.PLAN_NOT_FOUND,
				status: HTTPCode.NOT_FOUND,
			});
		}

		const existingPlanDay = await this.planDayRepository.find(dayId);

		if (!existingPlanDay) {
			throw new HTTPError({
				message: ErrorMessage.PLAN_DAY_NOT_FOUND,
				status: HTTPCode.NOT_FOUND,
			});
		}

		const { planId: planDayPlanId } = existingPlanDay.toObject();

		if (Number(planId) !== Number(planDayPlanId)) {
			throw new HTTPError({
				message: ErrorMessage.PLAN_DAY_NOT_FOUND,
				status: HTTPCode.NOT_FOUND,
			});
		}

		// TODO: Replace with actual quizId from plan when available
		// const { quizId } = existingPlan.toObject();
		// const answers = await this.quizAnswerRepository.findAllWithOption(quizId);
		// if (!answers.length) {
		// 	throw new HTTPError({
		// 		message: ErrorMessage.ANSWERS_NOT_FOUND,
		// 		status: HTTPCode.NOT_FOUND,
		// 	});
		// }
		// const category = await this.categoryRepository.find(categoryId);
		// if (!category) {
		// 	throw new HTTPError({
		// 		message: ErrorMessage.CATEGORY_NOT_FOUND,
		// 		status: HTTPCode.NOT_FOUND,
		// 	});
		// }
		// const { name } = category.toObject();
		// const notes = "";
		// const generatedPlanDay = await this.generate({
		// 	answers,
		// 	category: name,
		// 	notes,
		// });

		const generatedPlanDay: PlanDayDto = MOCK_GENERATED_PLAN_DAY;
		await this.planDayRepository.regenerate(dayId, generatedPlanDay);

		const newPlan = await this.planRepository.findWithRelations(planId);

		return newPlan ? newPlan.toObjectWithRelations() : null;
	}

	public async regenerateTask(
		id: number,
		dayId: number,
		taskId: number,
	): Promise<null | PlanDaysTaskDto> {
		const existingPlan = await this.planRepository.find(id);

		if (!existingPlan) {
			throw new HTTPError({
				message: ErrorMessage.PLAN_NOT_FOUND,
				status: HTTPCode.NOT_FOUND,
			});
		}

		const existingPlanDay = await this.planDayRepository.find(dayId);

		if (!existingPlanDay) {
			throw new HTTPError({
				message: ErrorMessage.PLAN_DAY_NOT_FOUND,
				status: HTTPCode.NOT_FOUND,
			});
		}

		const { planId: planDayPlanId } = existingPlanDay.toObject();

		if (Number(id) !== Number(planDayPlanId)) {
			throw new HTTPError({
				message: ErrorMessage.PLAN_DAY_NOT_FOUND,
				status: HTTPCode.NOT_FOUND,
			});
		}

		const existingTask = await this.taskRepository.find(taskId);

		if (!existingTask) {
			throw new HTTPError({
				message: ErrorMessage.TASK_NOT_FOUND,
				status: HTTPCode.NOT_FOUND,
			});
		}

		// TODO: Replace with actual quizId from plan when available
		// const quizId = 1;
		// const answers = await this.quizAnswerRepository.findAllWithOptionExceptId(quizId, planDayId);
		// const summaryOfOtherDayTasks = await this.openAIService.summaryOfOtherDayTasks(answers);

		// TODO: Replace mock with OpenAI service
		// const prompt = createPrompt({ answers, category: "creativity", notes: "", additional: summaryOfOtherDayTasks });
		// const generatedPlan = await this.openAIService.generatePlan(prompt);

		const generatedTask: TaskDto = MOCK_GENERATED_TASK;
		await this.taskRepository.regenerate(taskId, generatedTask);
		const newPlan = await this.planRepository.findWithRelations(id);

		return newPlan ? newPlan.toObjectWithRelations() : null;
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

	private async saveToDB({
		category,
		plan,
		userId,
	}: {
		category: string;
		plan: GeneratedPlanDTO;
		userId: null | number;
	}): Promise<PlanDaysTaskDto> {
		const quizId = 2;
		const categories: PlanCategoryDto[] =
			await this.planCategoryService.findAll();

		const planEntity: PlanCreateRequestDto = {
			categoryId:
				categories.find((element) => element.key === category)?.id ??
				LAST_INDEX,
			duration: plan.duration,
			intensity: plan.intensity,
			quizId,
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
					executionTimeType: taskResponse.executionTimeType ?? null,
				});
			}

			days.push({ ...planDayResponse, tasks });
		}

		const result: PlanDaysTaskDto = { ...planResponse, days, quizId };

		return result;
	}
}

export { PlanService };
