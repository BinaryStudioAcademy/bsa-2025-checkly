import { Button } from "~/libs/components/components.js";
import { ButtonLabels, NAVIGATION_CONSTANTS } from "~/libs/enums/enums.js";
import { getClassNames } from "~/libs/helpers/get-class-names.js";
import { type QuestionNavigationProperties } from "~/libs/types/types.js";

import styles from "./styles.module.css";

const QuestionNavigation: React.FC<QuestionNavigationProperties> = ({
	currentQuestion,
	isNextDisabled,
	isQuestionRequired,
	onBack,
	onNext,
	onSkip,
	totalQuestions,
}: QuestionNavigationProperties): React.ReactElement => {
	const isFirstQuestion =
		currentQuestion === NAVIGATION_CONSTANTS.FIRST_QUESTION;
	const isLastQuestion = currentQuestion === totalQuestions;
	const showSkip = !isLastQuestion && !isQuestionRequired;

	const getNextButtonLabel = (): string =>
		isLastQuestion ? ButtonLabels.SUBMIT : ButtonLabels.NEXT;

	return (
		<div className={styles["question-navigation"]}>
			<div className={getClassNames("cluster", styles["navigation-buttons"])}>
				{!isFirstQuestion && (
					<Button
						label={ButtonLabels.BACK}
						onClick={onBack}
						size="large"
						variant="secondary"
					/>
				)}

				<Button
					disabled={isNextDisabled}
					label={getNextButtonLabel()}
					onClick={onNext}
					size="large"
					variant="primary"
				/>

				{showSkip && (
					<Button
						label={ButtonLabels.SKIP}
						onClick={onSkip}
						size="large"
						variant="transparent"
					/>
				)}
			</div>

			<div className={styles["question-counter"]}>
				Question {currentQuestion} of {totalQuestions}
			</div>
		</div>
	);
};

export { QuestionNavigation };
