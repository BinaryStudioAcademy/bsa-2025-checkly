import { type PlanStyleOption } from "~/libs/types/types.js";

type LayoutExample = {
	id: number;
	planStyle: PlanStyleOption;
	title: string;
};

const layoutExamples: LayoutExample[] = [
	{
		id: 1,
		planStyle: "withremarks",
		title: "With Remarks",
	},
	{ id: 2, planStyle: "colorful", title: "Colourful" },
	{
		id: 3,
		planStyle: "minimal",
		title: "Minimal",
	},
	{
		id: 4,
		planStyle: "withremarks",
		title: "With Remarks",
	},
	{
		id: 5,
		planStyle: "colorful",
		title: "Colourful",
	},
	{
		id: 6,
		planStyle: "minimal",
		title: "Minimal",
	},
	{
		id: 7,
		planStyle: "withremarks",
		title: "With Remarks",
	},
];

export { layoutExamples };
