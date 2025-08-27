import { PlanAction } from "../enums/enums.js";
import { type PlanActionType } from "../types/types.js";
import { DAY_SCHEMA, PLAN_SCHEMA, TASK_SCHEMA } from "./constants.js";

const BASE_RULES = `
Rules:
- You are a strict JSON generator.
- Return ONLY valid JSON following the schema.
- No explanations, no markdown, no extra text.
- The "title" field in the plan (root object) must be a string up to 100 characters.
- The "title" field of each task must be a string up to 150 characters.
- The "description" field of each task must contain a concise description, limit "description" to max 140 characters.
- The "tasks" array for each day must contain 5 elements.
- Refresh all parts of the plan with new content when regenerating.
- Do NOT rephrase existing descriptions.
`;

const makeSystemPrompt = (schema: string, extra: string = ""): string => `
You are a strict JSON generator.
Schema:
${schema}

${BASE_RULES}

${extra}
`;

const SYSTEM_PROMPT_FOR_PLAN = makeSystemPrompt(PLAN_SCHEMA);
const SYSTEM_PROMPT_FOR_DAY = makeSystemPrompt(
	DAY_SCHEMA,
	"Instruction: Generate one single day with exactly 5 tasks.",
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
