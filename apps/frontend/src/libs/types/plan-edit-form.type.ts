import { type PlanDayDto, type PlanStyleOption } from "./types.js";

type PlanEditForm = {
	days: PlanDayDto[];
	notes?: string;
	startDate: string;
	theme: PlanStyleOption;
	title: string;
};

export { type PlanEditForm };
