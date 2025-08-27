import { ErrorMessage } from "~/libs/enums/enums.js";
import { storage, StorageKey } from "~/libs/modules/storage/storage.js";
import { quizStateValidationSchema } from "~/modules/quiz-questions/libs/validation-schemas/quiz-questions.validation-schema.js";
import { type QuizState } from "~/modules/quiz-questions/slices/quiz-questions.slice.js";

const saveQuizState = async (state: Partial<QuizState>): Promise<void> => {
	try {
		await storage.set(StorageKey.QUIZ_STATE, JSON.stringify(state));
	} catch {
		throw new Error(ErrorMessage.QUIZ_STORAGE_ERROR_MESSAGE);
	}
};

const loadQuizState = async (): Promise<null | Partial<QuizState>> => {
	try {
		const storedState = await storage.get(StorageKey.QUIZ_STATE);

		if (!storedState) {
			return null;
		}

		const parsedData = JSON.parse(storedState) as Partial<QuizState>;
		const validatedData = quizStateValidationSchema.partial().parse(parsedData);

		return validatedData as Partial<QuizState>;
	} catch {
		await storage.drop(StorageKey.QUIZ_STATE);

		throw new Error(ErrorMessage.QUIZ_STORAGE_LOAD_ERROR_MESSAGE);
	}
};

const clearQuizState = async (): Promise<void> => {
	try {
		await storage.drop(StorageKey.QUIZ_STATE);
	} catch {
		throw new Error(ErrorMessage.QUIZ_STORAGE_CLEAR_ERROR_MESSAGE);
	}
};

export { clearQuizState, loadQuizState, saveQuizState };
