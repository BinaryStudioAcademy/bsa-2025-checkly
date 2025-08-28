import { type Task } from "~/libs/types/types.js";

type PlanDay = {
	dayNumber: number;
	id: string;
	tasks: Task[];
};

export { type PlanDay };
