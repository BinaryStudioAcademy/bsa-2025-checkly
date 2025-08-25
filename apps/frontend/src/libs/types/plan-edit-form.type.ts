import { type PlanDay, type PlanStyleOption } from "./types.js";

type PlanEditForm = {
	days: PlanDay[];
	notes: string;
	startDate: string;
	theme: PlanStyleOption;
	title: string;
};

export { type PlanEditForm };
