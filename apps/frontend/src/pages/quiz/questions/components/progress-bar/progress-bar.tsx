import { QuizIndexes } from "~/libs/enums/enums.js";
import { getClassNames } from "~/libs/helpers/get-class-names.js";
import { type ProgressBarProperties } from "~/libs/types/types.js";
import {
	isCurrentQuestion,
	isQuestionCompleted,
} from "~/pages/quiz/questions/libs/utilities.js";

import styles from "./styles.module.css";

const ProgressBar: React.FC<ProgressBarProperties> = ({
	currentQuestion,
	totalQuestions,
}: ProgressBarProperties): React.ReactElement => {
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
						<div
							className={getClassNames(
								styles["progress-circle"],
								isCompleted && styles["completed"],
								isCurrent && styles["current"],
							)}
							key={questionNumber}
						>
							{isCompleted ? (
								<span className={styles["checkmark"]}>✓</span>
							) : (
								<span className={styles["number"]}>{questionNumber}</span>
							)}
						</div>
					);
				})}
			</div>
		</div>
	);
};

export { ProgressBar };
