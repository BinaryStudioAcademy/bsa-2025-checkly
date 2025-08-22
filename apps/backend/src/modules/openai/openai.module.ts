import { OpenAI } from "openai";

import { config } from "~/libs/modules/config/config.js";

class OpenAIModule {
	public readonly client: OpenAI;

	public constructor() {
		this.client = new OpenAI({
			apiKey: config.ENV.OPEN_AI.OPEN_AI_KEY,
		});
	}
}

export { OpenAIModule };
