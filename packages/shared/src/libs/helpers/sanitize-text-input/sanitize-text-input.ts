import { InputSize } from "../../enums/enums.js";

const sanitizeTextInput = (input: string): string =>
	input
		.trim()
		.replaceAll(/[<>'"&]/g, "")
		.replaceAll(/\s+/g, " ")
		.slice(InputSize.MIN, InputSize.MAX);

export { sanitizeTextInput };
