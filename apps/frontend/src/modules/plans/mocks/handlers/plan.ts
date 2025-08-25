import { planGenerationHandlers } from "./plan-generation.handler.js";
import { planTaskRegenerationHandlers } from "./plan-task-regeneration.handler.js";
import { planGetHandlers } from "./plan-get.handler.js";
import { planDayRegenerationHandlers } from "./plan-day-regeneration.handler.js";

const handlers = [
	...planGenerationHandlers,
	...planGetHandlers,
	...planTaskRegenerationHandlers,
	...planDayRegenerationHandlers,
];

export { handlers as planHandlers };
