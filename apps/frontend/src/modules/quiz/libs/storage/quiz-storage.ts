import { ErrorMessage } from "~/libs/enums/enums.js";
import { storage, StorageKey } from "~/libs/modules/storage/storage.js";

import { type QuizState } from "../../slices/quiz.slice.js";

const saveQuizState = async (state: Partial<QuizState>): Promise<void> => {
	try {
		await storage.set(StorageKey.QUIZ_STATE, JSON.stringify(state));
	} catch {
		throw new Error(ErrorMessage.QUIZ_STORAGE_ERROR_MESSAGE);
	}
};

const loadQuizState = async (): Promise<null | Partial<QuizState>> => {
	try {
		const stored = await storage.get(StorageKey.QUIZ_STATE);

		return stored ? (JSON.parse(stored) as Partial<QuizState>) : null;
	} catch {
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
