import { type TaskDto } from "~/modules/tasks/libs/types/types.js";

type PlanDay = {
	dayNumber: number;
	id: string;
	tasks: TaskDto[];
};

export { type PlanDay };
