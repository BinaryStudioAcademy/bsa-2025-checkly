import { type Service, type ValueOf } from "~/libs/types/types.js";
import { PlanEntity } from "~/modules/plans/plan.entity.js";
import { type PlanRepository } from "~/modules/plans/plan.repository.js";

import { PlanDayEntity } from "../plan-days/plan-day.entity.js";
import { type PlanDayRepository } from "../plan-days/plan-day.repository.js";
import { TaskEntity } from "../tasks/task.entity.js";
import { type TaskRepository } from "../tasks/task.repository.js";
import {
	MOCK_GENERATED_PLAN,
	MOCK_GENERATED_PLAN_DAY,
	MOCK_GENERATED_TASK,
} from "./libs/constants/constants.js";
import {
	ErrorMessage,
	type ExecutionTimeType,
	HTTPCode,
	HTTPError,
} from "./libs/enums/enums.js";
import {
	type PlanCreateRequestDto,
	type PlanDayDto,
	type PlanDaysTaskDto,
	type PlanDto,
	type PlanGetAllResponseDto,
	type PlanResponseDto,
	type PlanUpdateRequestDto,
	type TaskDto,
} from "./libs/types/types.js";

class PlanService implements Service {
	private planDayRepository: PlanDayRepository;
	private planRepository: PlanRepository;
	private taskRepository: TaskRepository;

	public constructor(
		planRepository: PlanRepository,
		planDayRepository: PlanDayRepository,
		taskRepository: TaskRepository,
	) {
		this.planRepository = planRepository;
		this.planDayRepository = planDayRepository;
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

	public async regenerateDay(id: number): Promise<null | PlanDaysTaskDto> {
		const existingPlan = await this.planRepository.find(id);

		if (!existingPlan) {
			throw new HTTPError({
				message: ErrorMessage.PLAN_NOT_FOUND,
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

		const generatedPlanDay: PlanDayDto = MOCK_GENERATED_PLAN_DAY;
		const planDayEntity = PlanDayEntity.initialize(generatedPlanDay);

		const newPlanDayId = await this.planDayRepository.regenerate(planDayEntity);

		if (!newPlanDayId) {
			throw new HTTPError({
				message: ErrorMessage.PLAN_DAY_REGENERATION_FAILED,
				status: HTTPCode.INTERNAL_SERVER_ERROR,
			});
		}

		const newPlan = await this.planRepository.findWithRelations(id);

		return newPlan ? newPlan.toObjectWithRelations() : null;
	}

	public async regenerateTask(id: number): Promise<null | PlanDaysTaskDto> {
		const existingPlan = await this.planRepository.find(id);

		if (!existingPlan) {
			throw new HTTPError({
				message: ErrorMessage.PLAN_NOT_FOUND,
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

		const taskEntity = TaskEntity.initialize({
			completedAt: generatedTask.completedAt,
			description: generatedTask.description,
			executionTimeType: generatedTask.executionTimeType as null | ValueOf<
				typeof ExecutionTimeType
			>,
			id: generatedTask.id,
			isCompleted: generatedTask.isCompleted,
			order: generatedTask.order,
			planDayId: generatedTask.planDayId,
			title: generatedTask.title,
		});

		await this.taskRepository.create(taskEntity);

		const newPlan = await this.planRepository.findWithRelations(id);

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
