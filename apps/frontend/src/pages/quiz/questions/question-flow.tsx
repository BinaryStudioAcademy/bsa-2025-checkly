import React, { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Loader } from "~/libs/components/components.js";
import { AppRoute, ErrorMessage, QuizIndexes } from "~/libs/enums/enums.js";
import { getClassNames } from "~/libs/helpers/get-class-names.js";
import {
	useAppDispatch,
	useAppSelector,
	useQuizSaved,
} from "~/libs/hooks/hooks.js";
import { storage, StorageKey } from "~/libs/modules/storage/storage.js";
import { actions, type QuizAnswer } from "~/modules/quiz/quiz.js";

import { NotesPage } from "./components/notes-page/notes-page.js";
import { ProgressBar } from "./components/progress-bar/progress-bar.js";
import { QuestionNavigation } from "./components/question-navigation/question-navigation.js";
import { QuestionPage } from "./components/question-page/question-page.js";
import {
	canGoBack,
	canSubmitQuiz,
	getCurrentAnswer,
	getCurrentQuestionData,
	getTotalSteps,
	hasError,
	hasNoQuestions,
	isLoading,
	isNextDisabled,
	isNotesPage,
	isQuestionNotFound,
	shouldFetchQuestions,
	shouldMoveToNext,
	shouldRedirectToQuiz,
} from "./libs/utilities.js";
import styles from "./styles.module.css";

const QuestionFlow: React.FC = (): React.ReactElement => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const {
		answers,
		currentQuestion,
		dataStatus,
		notes,
		questions,
		selectedCategory,
	} = useAppSelector((state) => state.quiz);

	const { clearStorage } = useQuizSaved();

	const safeNavigate = useCallback(async (path: string): Promise<void> => {
		try {
			await navigate(path);
		} catch {
			throw new Error(ErrorMessage.DEFAULT_ERROR_MESSAGE);
		}
	}, [navigate]);

	useEffect(() => {
		const initializeQuiz = async (): Promise<void> => {
			if (shouldFetchQuestions(selectedCategory, questions, dataStatus)) {
				void dispatch(actions.fetchQuestions());
			}

			const hasSavedState = await storage.has(StorageKey.QUIZ_STATE);

			if (shouldRedirectToQuiz(selectedCategory, hasSavedState)) {
				void safeNavigate(AppRoute.QUIZ);
			}
		};

		void initializeQuiz();
	}, [dataStatus, dispatch, questions, selectedCategory, safeNavigate]);

	const handleQuizComplete = useCallback(async (): Promise<void> => {
		if (!canSubmitQuiz(selectedCategory, questions)) {
			return;
		}

		if (!selectedCategory) {
			return;
		}

		const submission = {
			answers: Object.values(answers),
			category: selectedCategory,
			notes,
		};

		const timestamp = new Date().toISOString();
		const localStorageKey = `quiz_submission_${timestamp}`;

		const JSON_INDENTATION = 2;
		localStorage.setItem(
			localStorageKey,
			JSON.stringify(submission, null, JSON_INDENTATION),
		);
		const result = await dispatch(actions.submitQuiz(submission));
		const isFulfilled = /fulfilled/.test(result.type);
		
		if (isFulfilled) {
			void clearStorage();
			dispatch(actions.resetQuiz());
			void safeNavigate(AppRoute.QUIZ);
		}
	}, [
		answers,
		dispatch,
		notes,
		safeNavigate,
		questions,
		selectedCategory,
		clearStorage,
	]);

	const handleNext = useCallback((): void => {
		if (shouldMoveToNext(questions, currentQuestion)) {
			dispatch(
				actions.setCurrentQuestion(
					currentQuestion + QuizIndexes.FIRST_INDEX,
				),
			);
		} else {
			void handleQuizComplete();
		}
	}, [currentQuestion, dispatch, handleQuizComplete, questions]);

	const handleBack = useCallback((): void => {
		if (canGoBack(currentQuestion)) {
			dispatch(
				actions.setCurrentQuestion(
					currentQuestion - QuizIndexes.FIRST_INDEX,
				),
			);
		}
	}, [currentQuestion, dispatch]);

	const handleSkip = useCallback((): void => {
		const currentQuestionData = getCurrentQuestionData(questions, currentQuestion);

		if (currentQuestionData) {
			dispatch(
				actions.saveAnswer({
					isSkipped: true,
					questionId: currentQuestionData.id,
					questionText: currentQuestionData.text,
					selectedOptions: [],
					userInput: "",
				}),
			);
		}

		if (shouldMoveToNext(questions, currentQuestion)) {
			dispatch(
				actions.setCurrentQuestion(
					currentQuestion + QuizIndexes.FIRST_INDEX,
				),
			);
		} else {
			void handleQuizComplete();
		}
	}, [currentQuestion, dispatch, handleQuizComplete, questions]);

	const handleAnswer = useCallback(
		(answer: QuizAnswer): void => {
			const currentQuestionData = getCurrentQuestionData(questions, currentQuestion);

			if (currentQuestionData) {
				dispatch(actions.saveAnswer(answer));
			}
		},
		[currentQuestion, dispatch, questions],
	);

	const handleNotesNext = useCallback((): void => {
		void handleQuizComplete();
	}, [handleQuizComplete]);

	const handleNotesSkip = useCallback((): void => {
		void handleQuizComplete();
	}, [handleQuizComplete]);

	const totalSteps = getTotalSteps(questions);
	const isNotesPageValue = isNotesPage(currentQuestion, questions);
	const currentQuestionData = getCurrentQuestionData(questions, currentQuestion);
	const currentAnswer = getCurrentAnswer(answers, currentQuestion);
	const isNextDisabledValue = isNextDisabled(currentAnswer, currentQuestionData);
	const isLoadingValue = isLoading(dataStatus, questions, selectedCategory);
	const hasErrorValue = hasError(dataStatus);
	const hasNoQuestionsValue = hasNoQuestions(questions);
	const isQuestionNotFoundValue = isQuestionNotFound(currentQuestionData);

	const renderContent = (): React.ReactElement => {
		if (isLoadingValue) {
			return <Loader container="fullscreen" size="large" theme="brand" />;
		}

		if (hasErrorValue) {
			return (
				<div className={styles["error"]}>
					<h2>Error loading questions</h2>
					<p>Please try again later.</p>
				</div>
			);
		}

		if (hasNoQuestionsValue) {
			return (
				<div className={styles["no-questions"]}>
					<h2>No questions available</h2>
					<p>Please select a different category.</p>
				</div>
			);
		}

		if (isNotesPageValue) {
			return (
				<>
					<ProgressBar
						currentQuestion={currentQuestion}
						totalQuestions={totalSteps}
					/>
					<NotesPage />
					<QuestionNavigation
						currentQuestion={currentQuestion}
						isNextDisabled={false}
						isQuestionRequired={false}
						onBack={handleBack}
						onNext={handleNotesNext}
						onSkip={handleNotesSkip}
						totalQuestions={totalSteps}
					/>
				</>
			);
		}

		if (isQuestionNotFoundValue) {
			return (
				<div className={styles["error"]}>
					<h2>Question not found</h2>
					<p>Sorry, this question could not be loaded.</p>
				</div>
			);
		}

		if (!currentQuestionData) {
			return (
				<div className={styles["error"]}>
					<h2>Question not found</h2>
					<p>Sorry, this question could not be loaded.</p>
				</div>
			);
		}

		return (
			<>
				<ProgressBar
					currentQuestion={currentQuestion}
					totalQuestions={totalSteps}
				/>
				<QuestionPage
					currentAnswer={currentAnswer as QuizAnswer}
					onAnswer={handleAnswer}
					question={currentQuestionData}
					questionNumber={currentQuestion}
				/>
				<QuestionNavigation
					currentQuestion={currentQuestion}
					isNextDisabled={isNextDisabledValue}
					isQuestionRequired={!currentQuestionData.isOptional}
					onBack={handleBack}
					onNext={handleNext}
					onSkip={handleSkip}
					totalQuestions={totalSteps}
				/>
			</>
		);
	};

	return (
		<div className={getClassNames(styles["question-flow"], "grid-pattern")}>
			{renderContent()}
		</div>
	);
};

export { QuestionFlow };
