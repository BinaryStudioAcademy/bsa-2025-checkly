const MIN_INPUT_LENGTH = 0;
const MAX_INPUT_LENGTH = 1000;

const sanitizeTextInput = (input: string): string =>
	input
		.trim()
		.replaceAll(/[<>'"&]/g, "")
		.replaceAll(/\s+/g, " ")
		.slice(MIN_INPUT_LENGTH, MAX_INPUT_LENGTH);

export { sanitizeTextInput };
