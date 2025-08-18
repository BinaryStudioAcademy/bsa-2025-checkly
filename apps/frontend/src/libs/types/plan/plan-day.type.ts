import { type Task } from "./task.type.js";

type PlanDay = {
	dayNumber: number;
	id: string;
	tasks: Task[];
};

export { type PlanDay };
