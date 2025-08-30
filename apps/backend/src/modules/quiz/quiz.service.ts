import {
	type QuizCreateRequestDto,
	type QuizResponseDto,
} from "./libs/types/types.js";
import { type QuizRepository } from "./quiz.repository.js";

class QuizService {
	private quizRepository: QuizRepository;

	public constructor(quizRepository: QuizRepository) {
		this.quizRepository = quizRepository;
	}

	public async create(payload: QuizCreateRequestDto): Promise<number> {
		return await this.quizRepository.create(payload);
	}

	public async find(id: number): Promise<null | QuizResponseDto> {
		const item = await this.quizRepository.find(id);

		return item ?? null;
	}
}

export { QuizService };
