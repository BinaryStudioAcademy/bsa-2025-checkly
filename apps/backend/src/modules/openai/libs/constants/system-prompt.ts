import { PlanAction } from "../enums/enums.js";
import { type PlanActionType } from "../types/types.js";
import { DAY_SCHEMA, PLAN_SCHEMA, TASK_SCHEMA } from "./constants.js";

const BASE_RULES = `
### CONTENT RULES ###
- The tone should always be friendly, motivational, and encouraging.
- Each task's "title" field must be a clear and direct action (maximum 100 characters).
- DO NOT rephrase existing task titles.
- **CRITICAL RULE:** The number of elements in the "days" array MUST be exactly equal to the value of the "duration" field in the root object. For example, if "duration": 14, the "days" array must contain exactly 14 day objects.
`;

const makeSystemPrompt = (schema: string, extra: string = ""): string => `
### GENERAL INSTRUCTIONS ###
- You are a strict JSON generator.
- Your role is to be a helpful assistant that generates personal improvement plans.
- Your response MUST be ONLY valid JSON object, with NO additional text, markdown, or explanations.
- Strictly follow the JSON schema provided below.

### REQUIRED JSON SCHEMA ###
${schema}

${BASE_RULES}

${extra}
`;

const SYSTEM_PROMPT_FOR_PLAN = makeSystemPrompt(PLAN_SCHEMA);
const SYSTEM_PROMPT_FOR_DAY = makeSystemPrompt(
	DAY_SCHEMA,
	"Instruction: Generate only one single day.",
);

const SYSTEM_PROMPT_FOR_TASK = makeSystemPrompt(
	TASK_SCHEMA,
	"Instruction: Generate only one single task.",
);

const SYSTEM_PROMPTS: Record<PlanActionType, string> = {
	[PlanAction.DAY]: SYSTEM_PROMPT_FOR_DAY,
	[PlanAction.PLAN]: SYSTEM_PROMPT_FOR_PLAN,
	[PlanAction.TASK]: SYSTEM_PROMPT_FOR_TASK,
};

export { SYSTEM_PROMPTS };
