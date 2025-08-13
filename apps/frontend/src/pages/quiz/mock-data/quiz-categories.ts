import {
	Athlete,
	Camera,
	Flowers,
	Money,
	RollerSkate,
	TeddyBear,
} from "~/assets/img/shared/illustrations/categories/categories.img.js";
import { CategoriesColors } from "~/libs/enums/enums.js";
import { type QuizCategoryProperties } from "~/libs/types/types.js";
import { QuizCategory } from "~/modules/quiz/libs/enums/enums.js";

const QUIZ_CATEGORIES: QuizCategoryProperties[] = [
	{
		category: QuizCategory.PERSONAL_DEVELOPMENT,
		color: CategoriesColors.CARD_PEACH,
		icon: TeddyBear,
		selected: false,
	},
	{
		category: QuizCategory.SPIRITUALITY,
		color: CategoriesColors.CARD_PURPLE,
		icon: Flowers,
		selected: false,
	},
	{
		category: QuizCategory.SPORT,
		color: CategoriesColors.CARD_YELLOW,
		icon: Athlete,
		selected: false,
	},
	{
		category: QuizCategory.MONEY,
		color: CategoriesColors.CARD_GRAY,
		icon: Money,
		selected: false,
	},
	{
		category: QuizCategory.CREATIVITY,
		color: CategoriesColors.CARD_PINK,
		icon: Camera,
		selected: false,
	},
	{
		category: QuizCategory.HOBBY,
		color: CategoriesColors.CARD_CYAN,
		icon: RollerSkate,
		selected: false,
	},
] as const;

export { QUIZ_CATEGORIES };
