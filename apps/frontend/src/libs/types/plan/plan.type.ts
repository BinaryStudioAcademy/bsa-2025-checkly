import { type PlanDay } from "./plan-day.type.js";

type Plan = {
	createdAt?: string;
	days: PlanDay[];
	duration?: number;
	id: string;
	intensity?: string;
	title: string;
};

export { type Plan };
