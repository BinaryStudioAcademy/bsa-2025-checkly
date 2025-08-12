const generateAssistantPrompt = (
	errorMessage: string,
	previousResponse: string,
): string => {
	return `The previous response contains the following error: ${errorMessage}. Please fix it.\nPrevious response:\n${previousResponse}`;
};

export { generateAssistantPrompt };
