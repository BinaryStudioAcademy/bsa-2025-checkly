import { type TASK_GENERATION_RULES } from "../constants/constants.js";

type Style = keyof typeof TASK_GENERATION_RULES;
type Time = keyof (typeof TASK_GENERATION_RULES)[Style];

export { type Style, type Time };
