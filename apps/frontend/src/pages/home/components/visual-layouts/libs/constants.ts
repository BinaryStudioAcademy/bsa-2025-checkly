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
	{ id: 2, img: ExampleMinimal, planStyle: "colorful", title: "Colorful" },
	{
		id: 3,
		img: ExampleColourful,
		planStyle: "minimal",
		title: "Minimal",
	},
	{
		id: 4,
		img: ExampleMotivating,
		planStyle: "withremarks",
		title: "With Remarks",
	},
	{
		id: 5,
		img: ExampleWithRemarks,
		planStyle: "colorful",
		title: "Colorful",
	},
	{
		id: 6,
		img: ExampleWithRemarks,
		planStyle: "minimal",
		title: "Minimal",
	},
	{
		id: 7,
		img: ExampleMinimal,
		planStyle: "withremarks",
		title: "With Remarks",
	},
];

export { layoutExamples };
