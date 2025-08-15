import { openAiService } from "../openai/openai.js";
import { type OpenAIService } from "../openai/openai.service.js";

class QuizService {
	private openAIService: OpenAIService;

	public constructor() {
		this.openAIService = openAiService;
	}

	public async handleAnswers(
		payload: QuizAnswersRequestDto,
	): Promise<GeneratedPlanDTO> {
		const userPrompt = createPrompt(payload);

		const plan = await this.openAIService.generatePlan({ userPrompt });

		return {
			response: {
				meta: {
					prompt: `prompt: ${prompt} `,
				},
				plan: planData,
			},
		};
	}
}

export { QuizService };
