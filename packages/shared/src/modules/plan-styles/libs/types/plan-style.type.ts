import { type PlanStyle } from "../enums/plan-style.enum.js";

type PlanStyleOption = "COLOURFUL" | "MINIMAL" | "WITH_REMARKS";
type PlanStyleType = (typeof PlanStyle)[keyof typeof PlanStyle];

export { type PlanStyleOption, type PlanStyleType };
