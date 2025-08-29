/* eslint-disable unicorn/prefer-string-replace-all */
import { FeedbackValidationRule } from "../../../index.js";
import { InputSize } from "../../enums/enums.js";

const sanitizeFeedbackInput = (input: string): string => {
	let sanitizedText = input.replace(/\n{3,}/g, "\n\n");
	const maxLineBreaks = 3;
	let lineCount = 0;
	sanitizedText = sanitizedText.replace(/\n/g, (match) => {
		lineCount++;

		return lineCount > maxLineBreaks ? " " : match;
	});

	sanitizedText = sanitizedText.replace(
		/<\s*script\b[^>]*>([\s\S]*?)<\s*\/\s*script\s*>/gi,
		"",
	);
	sanitizedText = sanitizedText.replace(/on\w+=".*?"/gi, "");

	sanitizedText = sanitizedText.replace(/[<>"&]/g, "");

	sanitizedText = sanitizedText
		.trim()
		.replaceAll("\t", " ")
		.replaceAll("\r", "");

	sanitizedText = sanitizedText.slice(
		InputSize.MIN,
		FeedbackValidationRule.TEXT_MAX_LENGTH,
	);

	return sanitizedText;
};

export { sanitizeFeedbackInput };
