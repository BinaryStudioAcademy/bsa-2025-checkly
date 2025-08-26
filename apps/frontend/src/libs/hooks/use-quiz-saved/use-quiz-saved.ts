import { useCallback, useEffect } from "react";

import { useAppDispatch, useAppSelector } from "~/libs/hooks/hooks.js";
import {
	clearQuizState,
	loadQuizState,
	saveQuizState,
} from "~/modules/quiz-questions/libs/storage/quiz-questions-storage.js";
import { actions } from "~/modules/quiz-questions/quiz-questions.js";

const useQuizSaved = (): { clearStorage: () => Promise<void> } => {
	const dispatch = useAppDispatch();

	const { answers, currentQuestion, notes, questions, selectedCategory } =
		useAppSelector((state) => state.quizQuestion);

	useEffect(() => {
		const initializeState = async (): Promise<void> => {
			const savedState = await loadQuizState();

			if (savedState) {
				dispatch(actions.initializeFromStorage(savedState));
			}
		};

		void initializeState();
	}, [dispatch]);

	useEffect(() => {
		const persistState = async (): Promise<void> => {
			if (selectedCategory) {
				await saveQuizState({
					answers,
					currentQuestion,
					notes,
					questions,
					selectedCategory,
				});
			}
		};

		void persistState();
	}, [answers, currentQuestion, notes, questions, selectedCategory]);

	const clearStorage = useCallback(async (): Promise<void> => {
		await clearQuizState();
	}, []);

	return { clearStorage };
};

export { useQuizSaved };
