import {
	Athlete,
	Camera,
	Flowers,
	Money,
	RollerSkate,
	TeddyBear,
} from "~/assets/img/shared/illustrations/categories/categories.img.js";
import { type QuizCategoryProperties } from "~/libs/types/types.js";
import { QuizCategory } from "~/modules/quiz/libs/enums/enums.js";

const QUIZ_CATEGORIES: readonly QuizCategoryProperties[] = [
	{
		category: QuizCategory.PERSONAL_DEVELOPMENT,
		color: "card-peach",
		icon: TeddyBear,
		selected: false,
	},
	{
		category: QuizCategory.SPIRITUALITY,
		color: "card-purple",
		icon: Flowers,
		selected: false,
	},
	{
		category: QuizCategory.SPORT,
		color: "card-yellow",
		icon: Athlete,
		selected: false,
	},
	{
		category: QuizCategory.MONEY,
		color: "card-gray",
		icon: Money,
		selected: false,
	},
	{
		category: QuizCategory.CREATIVITY,
		color: "card-pink",
		icon: Camera,
		selected: false,
	},
	{
		category: QuizCategory.HOBBY,
		color: "card-cyan",
		icon: RollerSkate,
		selected: false,
	},
] as const;

export { QUIZ_CATEGORIES };
