class PromptBuilder {
	private prompt: string[] = [];

	static create(): PromptBuilder {
		return new PromptBuilder();
	}

	addContext(instructions: string): this {
		this.prompt.push(`Instructions:\n${instructions}`);

		return this;
	}

	addError(message: string): this {
		this.prompt.push(
			`The previous response contains the following error: ${message}. Please fix it.`,
		);

		return this;
	}

	addPreviousResponse(response: string): this {
		this.prompt.push(`Previous response:\n${response}`);

		return this;
	}

	build(): string {
		return this.prompt.join("\n");
	}
}

export { PromptBuilder };
