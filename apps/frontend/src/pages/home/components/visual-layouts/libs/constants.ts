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
	{
		id: 4,
		planStyle: "WITH_REMARKS",
		title: "With Remarks",
	},
	{
		id: 5,
		planStyle: "COLOURFUL",
		title: "Colourful",
	},
	{
		id: 6,
		planStyle: "MINIMAL",
		title: "Minimal",
	},
	{
		id: 7,
		planStyle: "WITH_REMARKS",
		title: "With Remarks",
	},
];

export { layoutExamples };
