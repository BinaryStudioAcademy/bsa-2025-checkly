import { FeedbackValidationRule } from "../../../index.js";

const sanitizeFeedbackInput = (input: string): string =>
	input
		.trim()
		.replaceAll(/[\n\r\t]/g, "")
		.replaceAll(/\s+/g, " ")
		.slice(
			FeedbackValidationRule.TEXT_MIN_LENGTH,
			FeedbackValidationRule.TEXT_MAX_LENGTH,
		);

export { sanitizeFeedbackInput };
