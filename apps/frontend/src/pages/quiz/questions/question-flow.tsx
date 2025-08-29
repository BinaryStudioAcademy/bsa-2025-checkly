import React, { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { Loader } from "~/libs/components/components.js";
import {
	AppRoute,
	ErrorMessage,
	QuizIndexes,
	ZERO,
} from "~/libs/enums/enums.js";
import { getClassNames } from "~/libs/helpers/get-class-names.js";
import {
	useAppDispatch,
	useAppSelector,
	useQuizSaved,
} from "~/libs/hooks/hooks.js";
import { storage, StorageKey } from "~/libs/modules/storage/storage.js";
import { type AppRouteType } from "~/libs/types/types.js";
import { actions as categoryActions } from "~/modules/plan-categories/plan-categories.js";
import { actions as quizAnswerActions } from "~/modules/quiz-answers/quiz-answers.js";
import {
	actions,
	type QuizAnswer,
} from "~/modules/quiz-questions/quiz-questions.js";
import { type QuizState } from "~/modules/quiz-questions/slices/quiz-questions.slice.js";

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
	shouldMoveToNext,
	shouldRedirectToQuiz,
} from "./libs/utilities.js";
import styles from "./styles.module.css";

const QuestionFlow: React.FC = (): React.ReactElement => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const { answers, currentQuestion, dataStatus, questions, selectedCategory } =
		useAppSelector((state) => state.quizQuestion);
	const { planCategories } = useAppSelector((state) => state.planCategory);

	useQuizSaved();

	const handleSafeNavigate = useCallback(
		async (path: AppRouteType): Promise<void> => {
			try {
				await navigate(path);
			} catch {
				throw new Error(ErrorMessage.DEFAULT_ERROR_MESSAGE);
			}
		},
		[navigate],
	);

	const categoryId = planCategories.find(
		(category) => category.key === selectedCategory,
	)?.id;

	useEffect(() => {
		if (categoryId) {
			void dispatch(actions.fetchQuestions({ categoryId }));
		}
	}, [categoryId, dispatch]);

	useEffect(() => {
		void dispatch(categoryActions.getAll());
	}, [dispatch]);

	useEffect(() => {
		const initializeQuiz = async (): Promise<void> => {
			const hasSavedState = await storage.has(StorageKey.QUIZ_STATE);

			if (shouldRedirectToQuiz(selectedCategory, hasSavedState)) {
				void handleSafeNavigate(AppRoute.QUIZ);
			}
		};

		void initializeQuiz();
	}, [selectedCategory, handleSafeNavigate]);

	const handleQuizComplete = useCallback(async (): Promise<void> => {
		if (!canSubmitQuiz(selectedCategory, questions)) {
			return;
		}

		if (!categoryId) {
			return;
		}

		const stored = await storage.get(StorageKey.QUIZ_STATE);

		if (!stored) {
			toast.error(ErrorMessage.QUIZ_NOT_COMPLETED);

			return;
		}

		const quizState = JSON.parse(stored) as QuizState;
		const answers = Object.values(quizState.answers);

		if (answers.length === ZERO) {
			toast.error(ErrorMessage.QUIZ_NO_ANSWERS);

			return;
		}

		await dispatch(quizAnswerActions.saveAnswers({ answers, categoryId }));
		void handleSafeNavigate(AppRoute.PLAN_GENERATION);
	}, [handleSafeNavigate, categoryId, dispatch, questions, selectedCategory]);

	const handleNext = useCallback((): void => {
		if (shouldMoveToNext(questions, currentQuestion)) {
			dispatch(
				actions.setCurrentQuestion(currentQuestion + QuizIndexes.FIRST_INDEX),
			);
		} else {
			void handleQuizComplete();
		}
	}, [currentQuestion, dispatch, handleQuizComplete, questions]);

	const handleBack = useCallback((): void => {
		if (canGoBack(currentQuestion)) {
			dispatch(
				actions.setCurrentQuestion(currentQuestion - QuizIndexes.FIRST_INDEX),
			);
		}
	}, [currentQuestion, dispatch]);

	const handleSkip = useCallback((): void => {
		const currentQuestionData = getCurrentQuestionData(
			questions,
			currentQuestion,
		);

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
				actions.setCurrentQuestion(currentQuestion + QuizIndexes.FIRST_INDEX),
			);
		} else {
			void handleQuizComplete();
		}
	}, [currentQuestion, dispatch, handleQuizComplete, questions]);

	const handleAnswer = useCallback(
		(answer: QuizAnswer): void => {
			const currentQuestionData = getCurrentQuestionData(
				questions,
				currentQuestion,
			);

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
	const currentQuestionData = getCurrentQuestionData(
		questions,
		currentQuestion,
	);
	const currentAnswer = getCurrentAnswer(answers, currentQuestion);
	const isNextDisabledValue = isNextDisabled(
		currentAnswer,
		currentQuestionData,
	);
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
					<div className="show-mobile-large-up">
						<ProgressBar
							currentQuestion={currentQuestion}
							totalQuestions={totalSteps}
						/>
					</div>
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
				<div className="show-mobile-large-up">
					<ProgressBar
						currentQuestion={currentQuestion}
						totalQuestions={totalSteps}
					/>
				</div>
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
			<div className="wrapper flow-loose-xl">{renderContent()}</div>
		</div>
	);
};

export { QuestionFlow };
