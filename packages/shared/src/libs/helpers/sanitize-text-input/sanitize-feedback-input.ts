import { FeedbackValidationRule } from "../../../index.js";
import { InputSize } from "../../enums/enums.js";

const sanitizeFeedbackInput = (input: string): string => {
	let sanitizedText = input.replaceAll(/\n{3,}/g, "\n\n");
	const maxLineBreaks = 4;
	const lineBreaksCount = (sanitizedText.match(/\n/g) || []).length;

	if (lineBreaksCount > maxLineBreaks) {
		let count = 0;
		sanitizedText = sanitizedText.replace("\n", (match) => {
			count++;

			return count > maxLineBreaks ? " " : match;
		});
	}

	return sanitizedText
		.trim()
		.replaceAll(/\r+/g, "")
		.replaceAll(/\t+/g, " ")
		.slice(InputSize.MIN, FeedbackValidationRule.TEXT_MAX_LENGTH);
};

export { sanitizeFeedbackInput };
