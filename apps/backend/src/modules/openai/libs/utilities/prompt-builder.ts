class PromptBuilder {
	private prompt: string[] = [];

	public static create(): PromptBuilder {
		return new PromptBuilder();
	}

	public addContext(instructions: string): this {
		this.prompt.push(`Instructions:\n${instructions}`);

		return this;
	}

	public addError(message: string): this {
		this.prompt.push(
			`The previous response contains the following error: ${message}. Please fix it.`,
		);

		return this;
	}

	public addPreviousResponse(response: string): this {
		this.prompt.push(`Previous response:\n${response}`);

		return this;
	}

	public build(): string {
		return this.prompt.join("\n");
	}
}

export { PromptBuilder };
