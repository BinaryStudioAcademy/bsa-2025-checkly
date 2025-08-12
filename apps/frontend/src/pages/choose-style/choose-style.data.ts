import {
	ExampleColourful,
	ExampleMinimal,
	ExampleMotivating,
	ExampleWithRemarks,
} from "~/assets/img/shared/illustrations/layouts/layouts.img.js";

type StyleCard = {
	id: string;
	img: string;
	label: string;
};

const styleCards: StyleCard[] = [
	{ id: "box-1", img: ExampleMinimal, label: "Minimal" },
	{ id: "box-2", img: ExampleWithRemarks, label: "With Remarks" },
	{ id: "box-3", img: ExampleMotivating, label: "Motivating" },
	{ id: "box-4", img: ExampleColourful, label: "Colourful" },
];

export { styleCards };
