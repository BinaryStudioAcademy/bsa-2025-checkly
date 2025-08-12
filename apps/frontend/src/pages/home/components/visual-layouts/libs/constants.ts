import {
	ExampleColourful,
	ExampleMinimal,
	ExampleMotivating,
	ExampleWithRemarks,
} from "~/assets/img/shared/illustrations/layouts/layouts.img.js";

type LayoutExample = {
	id: number;
	img: string;
	title: string;
};

const layoutExamples: LayoutExample[] = [
	{ id: 1, img: ExampleWithRemarks, title: "With Remarks" },
	{ id: 2, img: ExampleMinimal, title: "Minimal" },
	{ id: 3, img: ExampleColourful, title: "Colourful" },
	{ id: 4, img: ExampleMotivating, title: "Motivating" },
	{ id: 5, img: ExampleWithRemarks, title: "With Remarks" },
	{ id: 6, img: ExampleWithRemarks, title: "With Remarks" },
	{ id: 7, img: ExampleMinimal, title: "Minimal" },
];

export { layoutExamples };
