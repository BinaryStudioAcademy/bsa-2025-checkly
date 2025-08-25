import { type PlanStyleOption } from "~/libs/types/types.js";

type LayoutExample = {
	id: number;
	planStyle: PlanStyleOption;
	title: string;
};

const layoutExamples: LayoutExample[] = [
	{
		id: 1,
		planStyle: "WITH_REMARKS",
		title: "With Remarks",
	},
	{ id: 2, planStyle: "COLOURFUL", title: "Colourful" },
	{
		id: 3,
		planStyle: "MINIMAL",
		title: "Minimal",
	},
];

export { layoutExamples };
