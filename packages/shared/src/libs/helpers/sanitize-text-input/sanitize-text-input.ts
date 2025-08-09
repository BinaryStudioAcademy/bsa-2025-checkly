import { INPUT_SIZE } from "../../enums/enums.js";

const sanitizeTextInput = (input: string): string =>
	input
		.trim()
		.replaceAll(/[<>'"&]/g, "")
		.replaceAll(/\s+/g, " ")
		.slice(INPUT_SIZE.MIN, INPUT_SIZE.MAX);

export { sanitizeTextInput };
