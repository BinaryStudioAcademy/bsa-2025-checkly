import {
	camera,
	flowers,
	money,
	rollerskates,
	shirtlessBodybuilder,
	teddyBear,
} from "~/assets/img/shared/shared.img.js";
import { type QuizCategoryProperties } from "~/libs/types/types.js";
import { QuizCategory } from "~/modules/quiz/libs/enums/enums.js";

const QUIZ_CATEGORIES: readonly QuizCategoryProperties[] = [
	{
		category: QuizCategory.PERSONAL_DEVELOPMENT,
		color: "card-peach",
		icon: teddyBear,
		selected: false,
	},
	{
		category: QuizCategory.SPIRITUALITY,
		color: "card-purple",
		icon: flowers,
		selected: false,
	},
	{
		category: QuizCategory.SPORT,
		color: "card-yellow",
		icon: shirtlessBodybuilder,
		selected: false,
	},
	{
		category: QuizCategory.MONEY,
		color: "card-gray",
		icon: money,
		selected: false,
	},
	{
		category: QuizCategory.CREATIVITY,
		color: "card-pink",
		icon: camera,
		selected: false,
	},
	{
		category: QuizCategory.HOBBY,
		color: "card-cyan",
		icon: rollerskates,
		selected: false,
	},
] as const;

export { QUIZ_CATEGORIES };
