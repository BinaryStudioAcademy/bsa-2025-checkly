import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "~/libs/components/components.js";
import {
	AppRoute,
	ButtonLabels,
	ButtonSizes,
	ButtonVariants,
} from "~/libs/enums/enums.js";
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

	const navigate = useNavigate();

	const handleBack = useCallback((): void => {
		const redirect = async (): Promise<void> => {
			await navigate(AppRoute.QUIZ);
		};

		void redirect();
	}, [navigate]);

	return (
		<div
			className={getClassNames("flow-loose-lg", styles["question-navigation"])}
		>
			<div>
				{showSkip && (
					<Button
						className={getClassNames(
							styles["navigation-button"],
							styles["navigation-button-skip"],
						)}
						label={ButtonLabels.SKIP}
						onClick={onSkip}
						size={ButtonSizes.SMALL}
						variant={ButtonVariants.TRANSPARENT}
					/>
				)}
			</div>
			<div className={getClassNames("cluster", styles["navigation-buttons"])}>
				{isFirst && (
					<Button
						label={ButtonLabels.BACK_TO_START_QUIZ_PAGE}
						onClick={handleBack}
						variant={ButtonVariants.SECONDARY}
					/>
				)}

				{!isFirst && (
					<Button
						className={styles["navigation-button"]}
						label={ButtonLabels.BACK}
						onClick={onBack}
						size={ButtonSizes.LARGE}
						variant={ButtonVariants.SECONDARY}
					/>
				)}

				<Button
					className={styles["navigation-button"]}
					isDisabled={isNextDisabled}
					label={nextButtonLabel}
					onClick={onNext}
					size={ButtonSizes.LARGE}
					variant={ButtonVariants.PRIMARY}
				/>
			</div>
		</div>
	);
};

export { QuestionNavigation };
