import { type Plan, type PlanDay, type Task } from "~/libs/types/types.js";

const ZERO = 0;
const ONE = 1;
const TASK_NUM = 5;
const DAY_NUM = 7;
const DESCRIPTION = "Test description. Demonstration purposes";
const PLAN_TITLE = "Plan title";

const tasks: Task[] = [];
const days: PlanDay[] = [];

for (let index = ZERO; index < TASK_NUM; index++) {
	tasks.push({
		description: DESCRIPTION,
		id: index.toString(),
		isCompleted: false,
	});
}

for (let index = ZERO; index < DAY_NUM; index++) {
	days.push({
		dayNumber: index + ONE,
		id: index.toString(),
		tasks,
	});
}

const plan: Plan = {
	days,
	id: ZERO.toString(),
	title: PLAN_TITLE,
};

export { plan };
