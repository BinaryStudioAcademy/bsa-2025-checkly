import { Button } from "~/libs/components/components.js";
import { ButtonLabels } from "~/libs/enums/enums.js";
import { getClassNames } from "~/libs/helpers/get-class-names.js";
import { type QuestionNavigationProperties } from "~/libs/types/types.js";
import {
	getNextButtonLabel,
	isFirstQuestion,
	shouldShowSkip,
} from "~/pages/quiz/questions/libs/utilities.js";

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
	const isFirst = isFirstQuestion(currentQuestion);
	const showSkip = shouldShowSkip(
		currentQuestion,
		totalQuestions,
		isQuestionRequired,
	);
	const nextButtonLabel = getNextButtonLabel(currentQuestion, totalQuestions);

	return (
		<div className={styles["question-navigation"]}>
			<div className={getClassNames("cluster", styles["navigation-buttons"])}>
				{!isFirst && (
					<Button
						label={ButtonLabels.BACK}
						onClick={onBack}
						size="large"
						variant="secondary"
					/>
				)}

				<Button
					disabled={isNextDisabled}
					label={nextButtonLabel}
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
