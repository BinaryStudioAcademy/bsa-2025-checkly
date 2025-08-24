import { QuizCategory } from "~/modules/quiz-questions/libs/enums/enums.js";
import { type QuizCategoryValue } from "~/modules/quiz-questions/quiz-questions.js";

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
