import {
	creativity,
	hobby,
	money,
	personalDev,
	spirituality,
	sport,
} from "~/assets/img/categories/categories.js";

import { type CategoryData } from "./types/category-data.js";

const categories: CategoryData[] = [
	{
		id: "personal-dev",
		image: personalDev,
		name: "personal development",
	},
	{
		id: "spirituality",
		image: spirituality,
		name: "spirituality",
	},
	{ id: "sport", image: sport, name: "sport" },
	{ id: "money", image: money, name: "money" },
	{
		id: "creativity",
		image: creativity,
		name: "creativity",
	},
	{ id: "hobby", image: hobby, name: "hobby" },
];

export { categories };
