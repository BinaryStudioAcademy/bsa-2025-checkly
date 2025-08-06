import { useState } from "react";

import { logoIcon } from "~/assets/img/shared/shared.img.js";
import { sanitizeTextInput } from "~/libs/helpers/helpers.js";
import { useCallback } from "~/libs/hooks/hooks.js";
import {
	type MultipleAnswers,
	type QuestionDto,
	type SingleAnswer,
} from "~/libs/types/types.js";

import styles from "./styles.module.css";

interface MixedQuestionProperties {
	currentAnswer?: {
		selectedOptions: MultipleAnswers;
		userInput: string;
	};
	onAnswer: (answer: {
		selectedOptions: MultipleAnswers;
		userInput: string;
	}) => void;
	question: QuestionDto;
}

const MixedQuestion: React.FC<MixedQuestionProperties> = ({
	currentAnswer,
	onAnswer,
	question,
}: MixedQuestionProperties): React.ReactElement => {
	const [selectedOptions, setSelectedOptions] = useState<MultipleAnswers>(
		currentAnswer?.selectedOptions || [],
	);
	const [userInput, setUserInput] = useState<string>(
		currentAnswer?.userInput || "",
	);

	const handleOptionChange = useCallback(
		(option: string, checked: boolean): void => {
			const newSelectedOptions = checked
				? [...selectedOptions, option]
				: selectedOptions.filter((item: SingleAnswer) => item !== option);

			let newUserInput = userInput;

			if (option.trim().toLowerCase().includes("other") && !checked) {
				newUserInput = "";
				setUserInput("");
			}

			setSelectedOptions(newSelectedOptions);
			onAnswer({
				selectedOptions: newSelectedOptions,
				userInput: newUserInput,
			});
		},
		[onAnswer, selectedOptions, userInput],
	);

	const handleInputChange = useCallback(
		(optionText: string) => {
			return function (event_: React.ChangeEvent<HTMLInputElement>): void {
				handleOptionChange(optionText, event_.target.checked);
			};
		},
		[handleOptionChange],
	);

	const handleTextChange = useCallback(
		(event_: React.ChangeEvent<HTMLInputElement>): void => {
			const newUserInput = sanitizeTextInput(event_.target.value);
			setUserInput(newUserInput);
			onAnswer({ selectedOptions, userInput: newUserInput });
		},
		[onAnswer, selectedOptions],
	);

	const isOthersSelected = selectedOptions.some(
		(option) =>
			typeof option === "string" &&
			option.trim().toLowerCase().includes("other"),
	);

	return (
		<div className={styles["mixed-question"]}>
			<div className={styles["checkbox-section"]}>
				<div className={styles["options-container"]}>
					{question.options.map((option) => (
						<label className={styles["checkbox-option"]} key={option.text}>
							<input
								checked={selectedOptions.includes(option.text) || false}
								className={styles["checkbox-input"]}
								onChange={handleInputChange(option.text)}
								type="checkbox"
							/>
							<div className={styles["checkbox-custom"]}>
								{selectedOptions.includes(option.text) && (
									<img alt="Selected" src={logoIcon} />
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
						onChange={handleTextChange}
						placeholder="Enter your additional options..."
						type="text"
						value={userInput}
					/>
				</div>
			)}
		</div>
	);
};

export { MixedQuestion };
