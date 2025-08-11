import {
	ExampleColourful,
	ExampleMinimal,
	ExampleMotivating,
	ExampleWithRemarks,
} from "~/assets/img/shared/illustrations/layouts/layouts.img.js";
import { type PlanStyleOption } from "~/libs/types/types.js";

type LayoutExample = {
	id: number;
	img: string;
	planStyle: PlanStyleOption;
	title: string;
};

const layoutExamples: LayoutExample[] = [
	{
		id: 1,
		img: ExampleWithRemarks,
		planStyle: "withremarks",
		title: "With Remarks",
	},
	{ id: 2, img: ExampleMinimal, planStyle: "colorful", title: "Minimal" },
	{
		id: 3,
		img: ExampleColourful,
		planStyle: "withremarks",
		title: "Colourful",
	},
	{ id: 4, img: ExampleMotivating, planStyle: "colorful", title: "Motivating" },
	{
		id: 5,
		img: ExampleWithRemarks,
		planStyle: "withremarks",
		title: "With Remarks",
	},
	{
		id: 6,
		img: ExampleWithRemarks,
		planStyle: "colorful",
		title: "With Remarks",
	},
	{ id: 7, img: ExampleMinimal, planStyle: "withremarks", title: "Minimal" },
];

export { layoutExamples };
