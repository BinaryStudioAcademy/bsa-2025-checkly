import { planGenerationHandlers } from "./plan-generation.handler.js";
import { planTaskRegenerationHandlers } from "./plan-task-regeneration.handler.js";
import { planGetHandlers } from "./plan-get.handler.js";

const handlers = [
	...planGenerationHandlers,
	...planGetHandlers,
	...planTaskRegenerationHandlers,
];

export { handlers as planHandlers };
