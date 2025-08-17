import { type PlanDaily } from "./plan.type.js";

type PlanEditForm = {
	days: PlanDaily[];
	notes: string;
};

export { type PlanEditForm };
