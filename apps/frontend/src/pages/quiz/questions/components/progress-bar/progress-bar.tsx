import { QuizIndexes } from "~/libs/enums/enums.js";
import { getClassNames } from "~/libs/helpers/get-class-names.js";
import {
	useAppDispatch,
	useAppSelector,
	useCallback,
} from "~/libs/hooks/hooks.js";
import { type ProgressBarProperties } from "~/libs/types/types.js";
import { actions } from "~/modules/quiz-questions/quiz-questions.js";
import {
	isCurrentQuestion,
	isQuestionCompleted,
} from "~/pages/quiz/questions/libs/utilities.js";

import styles from "./styles.module.css";

const ProgressBar: React.FC<ProgressBarProperties> = ({
	currentQuestion,
	totalQuestions,
}: ProgressBarProperties): React.ReactElement => {
	const dispatch = useAppDispatch();
	const { answers } = useAppSelector((state) => state.quizQuestion);

	const handleQuestionNavigation = useCallback(
		(questionIndex: number): void => {
			const isNavigatingForward = currentQuestion <= questionIndex;
			const isWithinRangeOfAnsweredQuestions =
				Object.values(answers).length >= questionIndex;

			if (isNavigatingForward && !isWithinRangeOfAnsweredQuestions) {
				return;
			}

			void dispatch(actions.setCurrentQuestion(questionIndex));
		},
		[answers, currentQuestion, dispatch],
	);

	const isAnswered = (questionIndex: number): string => {
		return Object.values(answers).length >= questionIndex ? "answered" : "";
	};

	const createNavigationHandler = useCallback(
		(questionIndex: number) => (): void => {
			handleQuestionNavigation(questionIndex);
		},
		[handleQuestionNavigation],
	);

	return (
		<div className={styles["progress-bar"]}>
			<div className={styles["progress-container"]}>
				{Array.from({ length: totalQuestions }, (_, index) => {
					const questionNumber = index + QuizIndexes.FIRST_INDEX;
					const isCompleted = isQuestionCompleted(
						currentQuestion,
						questionNumber,
					);
					const isCurrent = isCurrentQuestion(currentQuestion, questionNumber);

					return (
						<button
							className={getClassNames(
								styles["progress-circle"],
								isCompleted && styles["completed"],
								isCurrent && styles["current"],
								styles[isAnswered(questionNumber)],
							)}
							key={questionNumber}
							onClick={createNavigationHandler(questionNumber)}
						>
							{isCompleted ? (
								<span className={styles["checkmark"]}>&#10003;</span>
							) : (
								<span className={styles["number"]}>{questionNumber}</span>
							)}
						</button>
					);
				})}
			</div>
		</div>
	);
};

export { ProgressBar };
