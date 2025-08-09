import {
	type QuizAnswersRequestDto,
	type QuizQuestionsResponseDto,
} from "./libs/types/types.js";
import { createPrompt } from "./libs/utilities/utilities.js";
import { type QuizRepository } from "./quiz.repository.js";

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
	private quizRepository: QuizRepository;

	public constructor(quizRepository: QuizRepository) {
		this.quizRepository = quizRepository;
	}

	public async findAllQuestions(): Promise<QuizQuestionsResponseDto> {
		const questions = await this.quizRepository.findAllQuestionsWithOptions();

		return {
			items: questions.map((question) => question.toObject()),
		};
	}

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
