import {
	type QuizAnswersRequestDto,
	type QuizAnswersResponseDto,
	type QuizQuestionsResponseDto,
} from "shared";

import { type QuizRepository } from "./quiz.repository.js";

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

	public submitAnswers(body: QuizAnswersRequestDto): QuizAnswersResponseDto {
		// TODO: Prepare prompt based on received answers
		// For now just returning the response with the answers back to the client

		return {
			response: body,
		};
	}
}

export { QuizService };
