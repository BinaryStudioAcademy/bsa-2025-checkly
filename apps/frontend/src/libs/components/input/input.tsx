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

type Properties<T extends FieldValues> = {
	control: Control<T, null>;
	errors: FieldErrors<T>;
	label: string;
	name: FieldPath<T>;
	placeholder?: string;
	required?: boolean;
	type?: "email" | "password" | "text";
};

const Input = <T extends FieldValues>({
	control,
	errors,
	label,
	name,
	placeholder = "",
	required,
	type = "text",
}: Properties<T>): JSX.Element => {
	const inputId = useId();
	const { field } = useFormController({ control, name });
	const error = errors[name]?.message;
	const hasError = Boolean(error);
	const inputWrapperClass = getClassNames(
		getClassNames(styles["input-wrapper"], "cluster"),
	);
	const inputFieldClass = getClassNames(
		styles["input-field"],
		hasError && styles["input-field--error"],
	);

	return (
		<div className={inputWrapperClass}>
			<label className={styles["input-label"]} htmlFor={inputId}>
				{label}
			</label>
			<input
				{...field}
				aria-invalid={hasError}
				className={inputFieldClass}
				id={inputId}
				name={name}
				placeholder={placeholder}
				required={required}
				type={type}
			/>
			{hasError && (
				<p className={styles["input-field__error"]}>{error as string}</p>
			)}
		</div>
	);
};

export { Input };
