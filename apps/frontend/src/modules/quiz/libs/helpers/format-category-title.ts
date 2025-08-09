import { QuizCategory } from "shared";

import { type QuizCategoryValue } from "~/modules/quiz/quiz.js";

const formatCategoryTitle = (category: QuizCategoryValue): string => {
	const titleMap: Record<QuizCategoryValue, string> = {
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
