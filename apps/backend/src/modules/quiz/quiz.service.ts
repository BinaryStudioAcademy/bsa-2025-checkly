import { type QuizRepository } from "./quiz.repository.js";

class QuizService {
	private quizRepository: QuizRepository;

	public constructor(quizRepository: QuizRepository) {
		this.quizRepository = quizRepository;
	}

	public async create(): Promise<number> {
		return await this.quizRepository.create();
	}
}

export { QuizService };
