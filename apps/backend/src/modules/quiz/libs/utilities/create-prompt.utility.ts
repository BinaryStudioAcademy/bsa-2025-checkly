import { type QuizAnswersRequestDto, sanitizeTextInput } from "shared";

const PROMPT_HEADER =
	"Based on the given answers below, please generate a personalized plan to help user improve their life goals in the chosen category";

const createPrompt = ({
	answers,
	category,
	notes,
}: QuizAnswersRequestDto): string => {
	return [
		`${PROMPT_HEADER} - ${category.replace("_", " ")}`,
		"Quiz Answers",
		...answers
			.map((answer, index) => {
				if (answer.isSkipped) {
					return "";
				}

				const inputs = [
					...answer.selectedOptions,
					sanitizeTextInput(answer.userInput),
				];

				return `${String(++index)}. ${answer.questionText} - ${inputs.join(", ")}`;
			})
			.filter(Boolean),
		notes
			? `User notes (just for your reference): ${sanitizeTextInput(notes)}`
			: "",
	].join("\n");
};

export { createPrompt };
