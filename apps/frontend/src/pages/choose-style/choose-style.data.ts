import { PlanStyleOptions } from "~/libs/enums/enums.js";
import { type PlanStyleOption } from "~/libs/types/types.js";

type StyleCard = {
	id: string;
	label: string;
	planStyle: PlanStyleOption;
};

const styleCards: StyleCard[] = [
	{ id: "box-1", label: "Minimal", planStyle: PlanStyleOptions.MINIMAL },
	{
		id: "box-2",
		label: "With Remarks",
		planStyle: PlanStyleOptions.WITH_REMARKS,
	},
	{
		id: "box-3",
		label: "Colourful",
		planStyle: PlanStyleOptions.COLOURFUL,
	},
];

export { styleCards };
