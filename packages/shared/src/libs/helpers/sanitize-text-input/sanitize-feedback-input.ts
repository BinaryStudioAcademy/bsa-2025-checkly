import { FeedbackValidationRule } from "../../../index.js";
import { InputSize } from "../../enums/enums.js";

const sanitizeFeedbackInput = (input: string): string =>
	input
		.trim()
		.replaceAll(/[\n\r\t]/g, "")
		.replaceAll(/\s+/g, " ")
		.slice(InputSize.MIN, FeedbackValidationRule.TEXT_MAX_LENGTH);

export { sanitizeFeedbackInput };
