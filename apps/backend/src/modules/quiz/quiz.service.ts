import { type QuizAnswersRequestDto } from "./libs/types/types.js";
import { createPrompt } from "./libs/utilities/utilities.js";

const MockPlan = {
	"days": [
		{
			"dayNumber": 3,
			"id": 1,
			"tasks": [],
		},
		{
			"dayNumber": 3,
			"id": 2,
			"tasks": [],
		},
		{
			"dayNumber": 3,
			"id": 3,
			"tasks": [
				{
					"completedAt": null,
					"description": "Test description",
					"executionTimeType": null,
					"id": 2,
					"isCompleted": false,
					"order": 1,
					"title": "do 1",
				},
			],
		},
	],
	"duration": 2,
	"id": 1,
	"intensity": "2",
	"title": "Test title",
	"userId": 2,
};

class QuizService {
	public handleAnswers(payload: QuizAnswersRequestDto): unknown {
		const prompt = createPrompt(payload);

		return {
			response: {
				...MockPlan,
				meta: {
					prompt,
				},
			},
		};
	}
}

export { QuizService };
