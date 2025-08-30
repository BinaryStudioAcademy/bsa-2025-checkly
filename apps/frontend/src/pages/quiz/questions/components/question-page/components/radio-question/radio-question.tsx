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
		(optionId: number) => (): void => {
			onAnswer(optionId);
		},
		[onAnswer],
	);

	return (
		<div className={styles["radio-question"]}>
			{question.options.map((option) => (
				<label className={styles["radio-option"]} key={option.id}>
					<input
						checked={currentAnswer === option.id}
						className={styles["radio-input"]}
						name="radio-option"
						onChange={handleOptionSelect(option.id)}
						type={ElementTypes.RADIO}
						value={option.id}
					/>
					<div className={styles["radio-custom"]}>
						{currentAnswer === option.id && (
							<img
								alt="Selected"
								className={styles["radio-icon"]}
								src={logoIcon}
							/>
						)}
					</div>
					<span className={styles["radio-text"]}>{option.text}</span>
				</label>
			))}
		</div>
	);
};

export { RadioQuestion };
