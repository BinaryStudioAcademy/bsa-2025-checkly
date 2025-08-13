import { logoIcon } from "~/assets/img/shared/shared.img.js";
import { ElementTypes } from "~/libs/enums/enums.js";
import { useCallback } from "~/libs/hooks/hooks.js";
import { type RadioQuestionProperties } from "~/libs/types/types.js";

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

	return (
		<div className={styles["radio-question"]}>
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
