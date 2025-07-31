import {
	cat,
	greenFlower,
	pinkStars,
	yellowStars,
	yellowTwinkles,
} from "~/assets/img/home/home.img.js";

type DecorativeImageItem = {
	className: string;
	id: number;
	src: string;
};

const decorativeImagesList: DecorativeImageItem[] = [
	{
		className: "green-flower",
		id: 1,
		src: greenFlower,
	},
	{
		className: "yellow-twinkles",
		id: 2,
		src: yellowTwinkles,
	},
	{
		className: "yellow-stars",
		id: 3,
		src: yellowStars,
	},
	{
		className: "pink-stars",
		id: 4,
		src: pinkStars,
	},
	{
		className: "cat",
		id: 5,
		src: cat,
	},
];

export { decorativeImagesList };
