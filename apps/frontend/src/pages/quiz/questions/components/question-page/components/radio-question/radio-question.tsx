import { logoIcon } from "~/assets/img/shared/shared.img.js";
import { ElementTypes } from "~/libs/enums/enums.js";
import { useCallback } from "~/libs/hooks/hooks.js";
import { type RadioQuestionProperties } from "~/libs/types/types.js";
import { AnswersAmount } from "~/pages/quiz/questions/libs/enums/answers-amount.enum.js";

import styles from "./styles.module.css";

const RadioQuestion: React.FC<RadioQuestionProperties> = ({
	currentAnswer,
	onAnswer,
	question,
}: RadioQuestionProperties): React.ReactElement => {
	const handleOptionSelect = useCallback(
		(optionText: string) => (): void => {
			onAnswer(optionText);
		},
		[onAnswer],
	);

	const hasFewOptions = question.options.length < AnswersAmount.FEW;
	const containerClassName = hasFewOptions
		? `${styles["radio-question"] ?? ""} ${styles["radio-question-few-options"] ?? ""}`
		: (styles["radio-question"] ?? "");

	return (
		<div className={containerClassName}>
			{question.options.map((option) => (
				<label className={styles["radio-option"]} key={option.text}>
					<input
						checked={currentAnswer === option.text}
						className={styles["radio-input"]}
						name="radio-option"
						onChange={handleOptionSelect(option.text)}
						type={ElementTypes.RADIO}
						value={option.text}
					/>
					<div className={styles["radio-custom"]}>
						{currentAnswer === option.text && (
							<img alt="Selected" src={logoIcon} />
						)}
					</div>
					<span className={styles["radio-text"]}>{option.text}</span>
				</label>
			))}
		</div>
	);
};

export { RadioQuestion };
