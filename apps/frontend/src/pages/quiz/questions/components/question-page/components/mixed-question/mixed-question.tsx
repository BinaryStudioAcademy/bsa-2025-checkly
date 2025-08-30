import { useState } from "react";

import { logoIcon } from "~/assets/img/shared/shared.img.js";
import { ElementTypes, PlaceholderValues } from "~/libs/enums/enums.js";
import { sanitizeTextInput } from "~/libs/helpers/helpers.js";
import { useCallback } from "~/libs/hooks/hooks.js";
import {
	type MixedQuestionProperties,
	type MultipleAnswers,
} from "~/libs/types/types.js";
import {
	isOptionSelected,
	isOtherOption,
	toggleOption,
} from "~/pages/quiz/questions/libs/utilities.js";

import styles from "./styles.module.css";

const MixedQuestion: React.FC<MixedQuestionProperties> = ({
	currentAnswer,
	onAnswer,
	question,
}: MixedQuestionProperties): React.ReactElement => {
	const [selectedOptions, setSelectedOptions] = useState<MultipleAnswers[]>(
		currentAnswer?.selectedOptions ?? [],
	);
	const [userInput, setUserInput] = useState<string>(
		currentAnswer?.userInput ?? "",
	);

	const isOthersSelected = selectedOptions.some(
		(option) => typeof option === "string" && isOtherOption(option),
	);

	const handleOptionChange = useCallback(
		(option: number, optionText: string, isChecked: boolean): void => {
			const newSelectedOptions = toggleOption(
				option,
				selectedOptions,
				isChecked,
			);
			const isSwitchingFromOther = isOtherOption(optionText) && !isChecked;
			const newUserInput = isSwitchingFromOther ? "" : userInput;

			setSelectedOptions(newSelectedOptions);
			onAnswer({
				selectedOptions: newSelectedOptions,
				userInput: newUserInput,
			});

			if (isSwitchingFromOther) {
				setUserInput("");
			}
		},
		[onAnswer, selectedOptions, userInput],
	);

	const handleInputChange = useCallback(
		(optionId: number, optionText: string) =>
			(event_: React.ChangeEvent<HTMLInputElement>): void => {
				handleOptionChange(optionId, optionText, event_.target.checked);
			},
		[handleOptionChange],
	);

	const handleTextChange = useCallback(
		(event_: React.ChangeEvent<HTMLInputElement>): void => {
			const newUserInput = event_.target.value;
			setUserInput(newUserInput);
			onAnswer({ selectedOptions, userInput: newUserInput });
		},
		[onAnswer, selectedOptions],
	);

	const handleTextBlur = useCallback((): void => {
		const sanitizedValue = sanitizeTextInput(userInput);
		setUserInput(sanitizedValue);
		onAnswer({ selectedOptions, userInput: sanitizedValue });
	}, [onAnswer, selectedOptions, userInput]);

	return (
		<div
			className={`${styles["mixed-question"] ?? ""} ${isOthersSelected ? (styles["has-text-input"] ?? "") : ""}`}
		>
			<div className={styles["checkbox-section"]}>
				<div className={styles["options-container"]}>
					{question.options.map((option) => (
						<label className={styles["checkbox-option"]} key={option.id}>
							<input
								checked={isOptionSelected(option.id, selectedOptions)}
								className={styles["checkbox-input"]}
								onChange={handleInputChange(option.id, option.text)}
								type={ElementTypes.CHECKBOX}
							/>
							<div className={styles["checkbox-custom"]}>
								{isOptionSelected(option.id, selectedOptions) && (
									<img
										alt="Selected"
										className={styles["checkbox-icon"]}
										src={logoIcon}
									/>
								)}
							</div>
							<span className={styles["option-text"]}>{option.text}</span>
						</label>
					))}
				</div>
			</div>

			{isOthersSelected && (
				<div className={styles["text-section"]}>
					<label className={styles["label"]} htmlFor="mixed-text-answer">
						What other options would you like to add?
					</label>
					<input
						className={styles["text-input"]}
						id="mixed-text-answer"
						onBlur={handleTextBlur}
						onChange={handleTextChange}
						placeholder={PlaceholderValues.ENTER_YOUR_ADDITIONAL_OPTIONS}
						type={ElementTypes.TEXT}
						value={userInput}
					/>
				</div>
			)}
		</div>
	);
};

export { MixedQuestion };
