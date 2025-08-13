import { type PlanStyleOption } from "~/libs/types/types.js";

type StyleCard = {
	id: string;
	label: string;
	planStyle: PlanStyleOption;
};

const styleCards: StyleCard[] = [
	{ id: "box-1", label: "Minimal", planStyle: "minimal" },
	{
		id: "box-2",
		label: "With Remarks",
		planStyle: "withremarks",
	},
	{
		id: "box-3",
		label: "Colourful",
		planStyle: "colorful",
	},
];

export { styleCards };
