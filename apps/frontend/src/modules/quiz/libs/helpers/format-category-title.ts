import { type EnumValue, QuizCategory } from "~/modules/quiz/libs/enums/enums.js";

const formatCategoryTitle = (category: EnumValue<typeof QuizCategory>): string => {
	const titleMap: Record<EnumValue<typeof QuizCategory>, string> = {
		[QuizCategory.CREATIVITY]: "Creativity",
		[QuizCategory.HOBBY]: "Hobby",
		[QuizCategory.MONEY]: "Money",
		[QuizCategory.PERSONAL_DEVELOPMENT]: "Personal Development",
		[QuizCategory.SPIRITUALITY]: "Spirituality",
		[QuizCategory.SPORT]: "Sport",
	};

	return titleMap[category];
};

export { formatCategoryTitle }; 