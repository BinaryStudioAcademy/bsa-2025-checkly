import {
	Athlete,
	Camera,
	Flowers,
	Money,
	RollerSkate,
	TeddyBear,
} from "~/assets/img/shared/illustrations/categories/categories.img.js";

import { type CategoryData } from "./types/category-data.js";

const categories: CategoryData[] = [
	{
		id: "personal-dev",
		image: TeddyBear,
		name: "personal development",
	},
	{
		id: "spirituality",
		image: Flowers,
		name: "spirituality",
	},
	{ id: "sport", image: Athlete, name: "sport" },
	{ id: "money", image: Money, name: "money" },
	{
		id: "creativity",
		image: Camera,
		name: "creativity",
	},
	{ id: "hobby", image: RollerSkate, name: "hobby" },
];

export { categories };
