import React, { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Loader } from "~/libs/components/components.js";
import { AppRoute, DataStatus, QUIZ_CONSTANTS } from "~/libs/enums/enums.js";
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

	const safeNavigate = useCallback(
		(path: string): void => {
			const result = navigate(path);

			if (result && typeof result.then === "function") {
				result.then(() => {}).catch(() => {});
			}
		},
		[navigate],
	);

	useEffect(() => {
		const initializeQuiz = async (): Promise<void> => {
			const isIdleStatus = dataStatus === DataStatus.IDLE;
			const shouldFetchQuestions =
				selectedCategory && !questions && isIdleStatus;

			if (shouldFetchQuestions) {
				void dispatch(actions.fetchQuestions());
			}

			const hasSavedState = await storage.has(StorageKey.QUIZ_STATE);

			if (!selectedCategory && !hasSavedState) {
				safeNavigate(AppRoute.QUIZ);
			}
		};

		void initializeQuiz();
	}, [dataStatus, dispatch, questions, selectedCategory, safeNavigate]);

	const handleQuizComplete = useCallback((): void => {
		const canSubmit = selectedCategory && questions;

		if (!canSubmit) {
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
		void dispatch(actions.submitQuiz(submission));
		void clearStorage();
		dispatch(actions.resetQuiz());
		safeNavigate(AppRoute.QUIZ);
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
		const hasMoreQuestions =
			questions && currentQuestion < questions.items.length;
		const isLastQuestion =
			questions && currentQuestion === questions.items.length;

		if (hasMoreQuestions || isLastQuestion) {
			dispatch(
				actions.setCurrentQuestion(
					currentQuestion + QUIZ_CONSTANTS.FIRST_QUESTION,
				),
			);
		} else {
			handleQuizComplete();
		}
	}, [currentQuestion, dispatch, handleQuizComplete, questions]);

	const handleBack = useCallback((): void => {
		if (currentQuestion > QUIZ_CONSTANTS.FIRST_QUESTION) {
			dispatch(
				actions.setCurrentQuestion(
					currentQuestion - QUIZ_CONSTANTS.FIRST_QUESTION,
				),
			);
		}
	}, [currentQuestion, dispatch]);

	const handleSkip = useCallback((): void => {
		const currentQuestionData =
			questions?.items[currentQuestion - QUIZ_CONSTANTS.FIRST_QUESTION];

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

		const hasMoreQuestions =
			questions && currentQuestion < questions.items.length;
		const isLastQuestion =
			questions && currentQuestion === questions.items.length;

		if (hasMoreQuestions || isLastQuestion) {
			dispatch(
				actions.setCurrentQuestion(
					currentQuestion + QUIZ_CONSTANTS.FIRST_QUESTION,
				),
			);
		} else {
			handleQuizComplete();
		}
	}, [currentQuestion, dispatch, handleQuizComplete, questions]);

	const handleAnswer = useCallback(
		(answer: QuizAnswer): void => {
			const currentQuestionData =
				questions?.items[currentQuestion - QUIZ_CONSTANTS.FIRST_QUESTION];

			if (currentQuestionData) {
				dispatch(actions.saveAnswer(answer));
			}
		},
		[currentQuestion, dispatch, questions],
	);

	const totalSteps =
		(questions?.items.length ?? QUIZ_CONSTANTS.ZERO_QUESTIONS) +
		QUIZ_CONSTANTS.FIRST_QUESTION;
	const isNotesPage =
		currentQuestion >
		(questions?.items.length ?? QUIZ_CONSTANTS.ZERO_QUESTIONS);
	const currentQuestionData =
		questions?.items[currentQuestion - QUIZ_CONSTANTS.FIRST_QUESTION];
	const currentAnswer = answers[currentQuestion];

	const hasOtherSelected =
		currentAnswer?.selectedOptions.some(
			(option) =>
				typeof option === "string" &&
				option.trim().toLowerCase().includes("other"),
		) ?? false;

	const hasNoOptions =
		currentAnswer?.selectedOptions.length === QUIZ_CONSTANTS.ZERO_QUESTIONS;
	const hasNoUserInput = !currentAnswer?.userInput.trim();
	const hasOnlyOtherSelected =
		hasOtherSelected &&
		currentAnswer?.selectedOptions.length === QUIZ_CONSTANTS.FIRST_QUESTION;

	const isQuestionRequired = currentQuestionData
		? !currentQuestionData.isOptional
		: false;
	const isNextDisabled = isQuestionRequired
		? !currentAnswer ||
			(hasNoOptions && hasNoUserInput) ||
			(hasOnlyOtherSelected && hasNoUserInput)
		: false;

	const isLoading =
		dataStatus === DataStatus.PENDING || (!questions && selectedCategory);
	const hasError = dataStatus === DataStatus.REJECTED;
	const hasNoQuestions =
		questions?.items.length === QUIZ_CONSTANTS.ZERO_QUESTIONS;
	const isQuestionNotFound = !currentQuestionData;

	const renderContent = (): React.ReactElement => {
		if (isLoading) {
			return <Loader container="fullscreen" size="large" theme="brand" />;
		}

		if (hasError) {
			return (
				<div className={styles["error"]}>
					<h2>Error loading questions</h2>
					<p>Please try again later.</p>
				</div>
			);
		}

		if (hasNoQuestions) {
			return (
				<div className={styles["no-questions"]}>
					<h2>No questions available</h2>
					<p>Please select a different category.</p>
				</div>
			);
		}

		if (isNotesPage) {
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
						onNext={handleQuizComplete}
						onSkip={handleQuizComplete}
						totalQuestions={totalSteps}
					/>
				</>
			);
		}

		if (isQuestionNotFound) {
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
					isNextDisabled={isNextDisabled}
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
