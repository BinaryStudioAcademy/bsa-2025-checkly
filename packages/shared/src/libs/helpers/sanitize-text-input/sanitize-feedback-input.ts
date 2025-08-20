import { FeedbackSize } from "../../enums/enums.js";

const sanitizeFeedbackInput = (input: string): string =>
	input
		.trim()
		.replaceAll(/[\n\r\t]/g, "")
		.replaceAll(/\s+/g, " ")
		.slice(FeedbackSize.MIN, FeedbackSize.MAX);

export { sanitizeFeedbackInput };
