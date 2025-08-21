import { Cat } from "~/assets/img/shared/illustrations/illustrations.img.js";
import {
	FlowerGreen,
	StarsPink01,
	StarsYellow01,
	TwinklesYellow,
} from "~/assets/img/shared/shapes/shapes.img.js";

type DecorativeImageItem = {
	className: string;
	id: number;
	src: string;
};

const DECORATIVE_IMAGES_LIST: DecorativeImageItem[] = [
	{
		className: "green-flower",
		id: 1,
		src: FlowerGreen,
	},
	{
		className: "yellow-twinkles",
		id: 2,
		src: TwinklesYellow,
	},
	{
		className: "yellow-stars",
		id: 3,
		src: StarsYellow01,
	},
	{
		className: "pink-stars",
		id: 4,
		src: StarsPink01,
	},
	{
		className: "cat",
		id: 5,
		src: Cat,
	},
];

export { DECORATIVE_IMAGES_LIST };
