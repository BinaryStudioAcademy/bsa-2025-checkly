import { ZERO } from "~/libs/constants/constants.js";
import { type Service } from "~/libs/types/types.js";
import { PlanEntity } from "~/modules/plans/plan.entity.js";
import { type PlanRepository } from "~/modules/plans/plan.repository.js";

import { openAiService } from "../openai/openai.js";
import { type OpenAIService } from "../openai/openai.service.js";
import { type PlanCategoryRepository } from "../plan-categories/plan-category.repository.js";
import { type PlanDayRepository } from "../plan-days/plan-day.repository.js";
import { type QuizAnswerRepository } from "../quiz-answers/quiz-answer.repository.js";
import { type QuizRepository } from "../quiz/quiz.repository.js";
import { type TaskRepository } from "../tasks/task.repository.js";
import {
	ErrorMessage,
	HTTPCode,
	HTTPError,
	PlanAction,
} from "./libs/enums/enums.js";
import {
	type GeneratedDayDTO,
	type GeneratedPlanDTO,
	type GeneratedTaskDTO,
	type GeneratePlanRequestDto,
	type PlanActionType,
	type PlanActionTypeMap,
	type PlanCreateRequestDto,
	type PlanDayRegenerationRequestDto,
	type PlanDaysTaskDto,
	type PlanDto,
	type PlanGetAllResponseDto,
	type PlanResponseDto,
	type PlanSearchQueryParameter,
	type PlanUpdateRequestDto,
	type PlanWithCategoryDto,
	type QuizCategoryType,
	type TaskRegenerationRequestDto,
} from "./libs/types/types.js";
import { createPrompt } from "./libs/utilities/utilities.js";

type Constructor = {
	planCategoryRepository: PlanCategoryRepository;
	planDayRepository: PlanDayRepository;
	planRepository: PlanRepository;
	quizAnswerRepository: QuizAnswerRepository;
	quizRepository: QuizRepository;
	taskRepository: TaskRepository;
};

class PlanService implements Service {
	private openAIService: OpenAIService;
	private planCategoryRepository: PlanCategoryRepository;
	private planDayRepository: PlanDayRepository;
	private planRepository: PlanRepository;
	private quizAnswerRepository: QuizAnswerRepository;
	private quizRepository: QuizRepository;
	private taskRepository: TaskRepository;

	public constructor({
		planCategoryRepository,
		planDayRepository,
		planRepository,
		quizAnswerRepository,
		quizRepository,
		taskRepository,
	}: Constructor) {
		this.planRepository = planRepository;
		this.openAIService = openAiService;
		this.quizRepository = quizRepository;
		this.planDayRepository = planDayRepository;
		this.taskRepository = taskRepository;
		this.quizAnswerRepository = quizAnswerRepository;
		this.planCategoryRepository = planCategoryRepository;
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
		userId?: number,
	): Promise<null | PlanDaysTaskDto> {
		if (!userId) {
			throw new HTTPError({
				message: ErrorMessage.USER_NOT_FOUND,
				status: HTTPCode.NOT_FOUND,
			});
		}

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

	public async generate<T extends PlanActionType>(
		payload: GeneratePlanRequestDto,
		actionType: PlanActionType,
	): Promise<PlanActionTypeMap[T]> {
		const userPrompt = createPrompt(payload.quizAnswers);

		const result = await this.openAIService.generate({
			actionType,
			userPrompt,
		});

		return result as PlanActionTypeMap[T];
	}

	public async generatePlan(
		payload: GeneratePlanRequestDto,
	): Promise<GeneratedPlanDTO | null> {
		const { quizAnswers, quizId, userId } = payload;

		if (!userId) {
			throw new HTTPError({
				message: ErrorMessage.USER_NOT_FOUND,
				status: HTTPCode.NOT_FOUND,
			});
		}

		if (!quizId) {
			throw new HTTPError({
				message: ErrorMessage.QUIZ_NOT_FOUND,
				status: HTTPCode.NOT_FOUND,
			});
		}

		const existingCategory = await this.quizRepository.find(quizId);

		if (!existingCategory) {
			throw new HTTPError({
				message: ErrorMessage.CATEGORY_NOT_FOUND,
				status: HTTPCode.NOT_FOUND,
			});
		}

		const { categoryId } = existingCategory;

		const plan = (await this.generate(
			{
				quizAnswers,
			},
			PlanAction.PLAN,
		)) as GeneratedPlanDTO;

		const planId = await this.planRepository.saveGeneratedPlan({
			categoryId,
			plan,
			quizId,
			userId,
		});

		const newPlan = await this.planRepository.findWithRelations(planId);

		return newPlan ? newPlan.toObjectWithRelations() : null;
	}

	public async regenerate(id: number): Promise<null | PlanDaysTaskDto> {
		const existingPlan = await this.planRepository.find(id);

		if (!existingPlan) {
			throw new HTTPError({
				message: ErrorMessage.PLAN_NOT_FOUND,
				status: HTTPCode.NOT_FOUND,
			});
		}

		const { categoryId, quizId } = existingPlan.toObject();
		const quizAnswers =
			await this.quizAnswerRepository.findAllWithOption(quizId);

		if (quizAnswers.length === ZERO) {
			throw new HTTPError({
				message: ErrorMessage.ANSWERS_NOT_FOUND,
				status: HTTPCode.NOT_FOUND,
			});
		}

		const category = await this.planCategoryRepository.find(categoryId);

		if (!category) {
			throw new HTTPError({
				message: ErrorMessage.CATEGORY_NOT_FOUND,
				status: HTTPCode.NOT_FOUND,
			});
		}

		const { title } = category.toObject();

		const answers = {
			answers: quizAnswers,
			category: title as QuizCategoryType,
		};

		const generatedPlan = (await this.generate(
			{
				quizAnswers: answers,
			},
			PlanAction.PLAN,
		)) as GeneratedPlanDTO;

		await this.planRepository.regenerate(id, generatedPlan);

		const newPlan = await this.planRepository.findWithRelations(id);

		return newPlan ? newPlan.toObjectWithRelations() : null;
	}

	public async regenerateDay(
		plan: PlanDayRegenerationRequestDto,
	): Promise<null | PlanDaysTaskDto> {
		const { dayId, planId } = plan;

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

		const { categoryId, quizId } = existingPlan.toObject();
		const quizAnswers =
			await this.quizAnswerRepository.findAllWithOption(quizId);

		if (quizAnswers.length === ZERO) {
			throw new HTTPError({
				message: ErrorMessage.ANSWERS_NOT_FOUND,
				status: HTTPCode.NOT_FOUND,
			});
		}

		const category = await this.planCategoryRepository.find(categoryId);

		if (!category) {
			throw new HTTPError({
				message: ErrorMessage.CATEGORY_NOT_FOUND,
				status: HTTPCode.NOT_FOUND,
			});
		}

		const { title } = category.toObject();

		const answers = {
			answers: quizAnswers,
			category: title as QuizCategoryType,
		};

		const generatedPlanDay = (await this.generate(
			{
				quizAnswers: answers,
			},
			PlanAction.DAY,
		)) as GeneratedDayDTO;

		await this.planDayRepository.regenerate(dayId, generatedPlanDay);

		const newPlan = await this.planRepository.findWithRelations(planId);

		return newPlan ? newPlan.toObjectWithRelations() : null;
	}

	public async regenerateTask(
		plan: TaskRegenerationRequestDto,
	): Promise<null | PlanDaysTaskDto> {
		const { dayId, planId, taskId } = plan;
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

		const { planId: planDayPlanId, tasks } =
			existingPlanDay.toObjectWithRelations();

		if (Number(planDayPlanId) !== Number(planId)) {
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

		const { categoryId, quizId } = existingPlan.toObject();
		const quizAnswers =
			await this.quizAnswerRepository.findAllWithOption(quizId);

		if (quizAnswers.length === ZERO) {
			throw new HTTPError({
				message: ErrorMessage.ANSWERS_NOT_FOUND,
				status: HTTPCode.NOT_FOUND,
			});
		}

		const category = await this.planCategoryRepository.find(categoryId);

		if (!category) {
			throw new HTTPError({
				message: ErrorMessage.CATEGORY_NOT_FOUND,
				status: HTTPCode.NOT_FOUND,
			});
		}

		const { title } = category.toObject();

		const answers = {
			answers: quizAnswers,
			category: title as QuizCategoryType,
			context: {
				tasks,
			},
		};

		const generatedTask = (await this.generate(
			{
				quizAnswers: answers,
			},
			PlanAction.TASK,
		)) as GeneratedTaskDTO;

		await this.taskRepository.regenerate(taskId, generatedTask);
		const newPlan = await this.planRepository.findWithRelations(planId);

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
}

export { PlanService };
