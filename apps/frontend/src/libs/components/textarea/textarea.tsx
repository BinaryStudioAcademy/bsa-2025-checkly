import { type JSX, useId } from "react";
import {
	type Control,
	type FieldErrors,
	type FieldPath,
	type FieldValues,
} from "react-hook-form";

import { getClassNames } from "~/libs/helpers/get-class-names.js";
import { useFormController } from "~/libs/hooks/hooks.js";

import styles from "./styles.module.css";

const ROWS = 4;
const MIN_CHARACTERS = 0;

type Properties<T extends FieldValues> = {
	control: Control<T, null>;
	errors: FieldErrors<T>;
	label: string;
	maxLength?: number;
	name: FieldPath<T>;
	placeholder?: string;
	required?: boolean;
	resize?: "both" | "horizontal" | "none" | "vertical";
	rows?: number;
};

const Textarea = <T extends FieldValues>({
	control,
	errors,
	label,
	maxLength,
	name,
	placeholder = "",
	required,
	resize = "vertical",
	rows = ROWS,
}: Properties<T>): JSX.Element => {
	const textareaId = useId();
	const { field } = useFormController({ control, name });
	const errorMessage = errors[name]?.message;
	const hasError = Boolean(errorMessage);

	const textareaContainerClass = getClassNames(
		"cluster",
		styles["textarea-container"],
	);
	const textareaFieldClass = getClassNames(
		styles["textarea-field"],
		hasError && styles["textarea-field--error"],
		styles[`textarea-field--resize-${resize}`],
	);

	const characterCount = (field.value as string).length || MIN_CHARACTERS;
	const showCharacterCount = Boolean(maxLength);

	return (
		<div className={textareaContainerClass}>
			<label className={styles["textarea-label"]} htmlFor={textareaId}>
				{label}
			</label>
			<div className={styles["textarea-wrapper"]}>
				<textarea
					{...field}
					aria-invalid={hasError}
					className={textareaFieldClass}
					id={textareaId}
					maxLength={maxLength}
					name={name}
					placeholder={placeholder}
					required={required}
					rows={rows}
				/>
				{showCharacterCount && (
					<div className={styles["character-count"]}>
						{characterCount}
						{maxLength && `/${String(maxLength)}`}
					</div>
				)}
			</div>
			{hasError && (
				<p className={styles["textarea-field__error"]}>{errorMessage as string}</p>
			)}
		</div>
	);
};

export { Textarea };
