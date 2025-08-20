import { type Service } from "~/libs/types/types.js";
import { PlanEntity } from "~/modules/plans/plan.entity.js";
import { type PlanRepository } from "~/modules/plans/plan.repository.js";

import { openAiService } from "../openai/openai.js";
import { type OpenAIService } from "../openai/openai.service.js";
import { PlanDayEntity } from "../plan-days/plan-day.entity.js";
import { type PlanDayRepository } from "../plan-days/plan-day.repository.js";
import { TaskEntity } from "../tasks/task.entity.js";
import { type TaskRepository } from "../tasks/task.repository.js";
import {
	MOCK_GENERATED_PLAN,
	MOCK_GENERATED_PLAN_DAY,
	MOCK_GENERATED_TASK,
} from "./libs/constants/constants.js";
import { ErrorMessage, HTTPCode, HTTPError } from "./libs/enums/enums.js";
import {
	type GeneratedPlanDTO,
	type PlanCreateRequestDto,
	type PlanDayDto,
	type PlanDaysTaskDto,
	type PlanDto,
	type PlanGetAllResponseDto,
	type PlanResponseDto,
	type PlanUpdateRequestDto,
	type QuizAnswersRequestDto,
	type TaskDto,
} from "./libs/types/types.js";
import { createPrompt } from "./libs/utilities/utilities.js";

class PlanService implements Service {
	private openAIService: OpenAIService;
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

	public async generate(
		payload: QuizAnswersRequestDto,
	): Promise<GeneratedPlanDTO> {
		const userPrompt = createPrompt(payload);

		const plan = await this.openAIService.generatePlan({ userPrompt });

		return plan;
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
		// const generatedPlan = await this.generate({
		// 	answers,
		// 	category: name,
		// 	notes,
		// });

		const generatedPlan: PlanDaysTaskDto = MOCK_GENERATED_PLAN;
		const planEntity = PlanEntity.initialize(generatedPlan);
		await this.planRepository.regenerate(id, planEntity);

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
		const planDayEntity = PlanDayEntity.initialize(generatedPlanDay);
		await this.planDayRepository.regenerate(dayId, planDayEntity);

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

		const { planId } = existingPlanDay.toObject();

		if (Number(id) !== Number(planId)) {
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

		const { planDayId } = existingTask.toObject();

		if (Number(dayId) !== Number(planDayId)) {
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
		// const generatedTask = await this.generate({
		// 	answers,
		// 	category: name,
		// 	notes,
		// });

		const generatedTask: TaskDto = MOCK_GENERATED_TASK;
		const taskEntity = TaskEntity.initialize(generatedTask);
		await this.taskRepository.regenerate(taskId, taskEntity);

		const newPlan = await this.planRepository.findWithRelations(planId);

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
