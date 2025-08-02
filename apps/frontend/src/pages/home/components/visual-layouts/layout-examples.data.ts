import {
	exampleColourful,
	exampleMinimal,
	exampleMotivating,
	exampleRemarks,
} from "~/assets/img/visual-layouts/visual-layouts.img.js";

type LayoutExample = {
	id: number;
	img: string;
	title: string;
};

const layoutExamples: LayoutExample[] = [
	{ id: 1, img: exampleRemarks, title: "With Remarks" },
	{ id: 2, img: exampleMinimal, title: "Minimal" },
	{ id: 3, img: exampleColourful, title: "Colourful" },
	{ id: 4, img: exampleMotivating, title: "Motivating" },
	{ id: 5, img: exampleRemarks, title: "With Remarks" },
	{ id: 6, img: exampleRemarks, title: "With Remarks" },
	{ id: 7, img: exampleMinimal, title: "Minimal" },
];

export { layoutExamples };
