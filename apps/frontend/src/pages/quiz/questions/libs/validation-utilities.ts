import { QuizIndexes } from "~/libs/enums/enums.js";
import { type MultipleAnswers } from "~/libs/types/types.js";
import {
	type QuestionDto,
	type QuizAnswer,
} from "~/modules/quiz/libs/types/types.js";

const OTHER_OPTION_TITLE = "other";

const isOtherOption = (option: string): boolean => {
	const otherOption = option.trim().toLowerCase();

	return otherOption.includes(OTHER_OPTION_TITLE);
};

const hasOtherSelected = (currentAnswer: QuizAnswer): boolean => {
	return currentAnswer.selectedOptions.some((option) => {
		if (typeof option !== "string") {
			return false;
		}

		return isOtherOption(option);
	});
};

const hasNoOptions = (currentAnswer: QuizAnswer): boolean => {
	return currentAnswer.selectedOptions.length === QuizIndexes.ZERO_INDEX;
};

const hasNoUserInput = (currentAnswer: QuizAnswer): boolean => {
	return !currentAnswer.userInput.trim();
};

const hasOnlyOtherSelected = (currentAnswer: QuizAnswer): boolean => {
	return (
		hasOtherSelected(currentAnswer) &&
		currentAnswer.selectedOptions.length === QuizIndexes.FIRST_INDEX
	);
};

const isQuestionRequired = (currentQuestionData: QuestionDto): boolean => {
	return !currentQuestionData.isOptional;
};

const isNextDisabled = (
	currentAnswer: QuizAnswer | undefined,
	currentQuestionData: QuestionDto | undefined,
): boolean => {
	if (!currentQuestionData || !isQuestionRequired(currentQuestionData)) {
		return false;
	}

	if (!currentAnswer) {
		return true;
	}

	const hasNoValidOptions =
		hasNoOptions(currentAnswer) && hasNoUserInput(currentAnswer);
	const hasOnlyOtherWithNoInput =
		hasOnlyOtherSelected(currentAnswer) && hasNoUserInput(currentAnswer);

	return hasNoValidOptions || hasOnlyOtherWithNoInput;
};

const isOptionSelected = (
	option: string,
	selectedOptions: MultipleAnswers[] | undefined,
): boolean => {
	return selectedOptions?.includes(option) ?? false;
};

const toggleOption = (
	option: string,
	selectedOptions: MultipleAnswers[],
	checked: boolean,
): MultipleAnswers[] => {
	if (!checked) {
		return selectedOptions.filter((item) => item !== option);
	}

	if (!selectedOptions.includes(option)) {
		return [...selectedOptions, option];
	}

	return selectedOptions;
};

export {
	isNextDisabled,
	isOptionSelected,
	isOtherOption,
	toggleOption,
};
