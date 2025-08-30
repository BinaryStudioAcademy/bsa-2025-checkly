import { type PlanDayDto } from "../../../plans/plans.js";
import { type TaskDto } from "../../../tasks/tasks.js";

type QuizContext = {
	days?: {
		currentDayIndex: number;
		days: PlanDayDto[];
	};
	tasks?: TaskDto[];
};

export { type QuizContext };
