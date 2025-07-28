import { type JSX } from "react";
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
	const { field } = useFormController({ control, name });

	const error = errors[name]?.message;
	const hasError = Boolean(error);

	return (
		<label className={getClassNames(styles["input-wrapper"], "cluster")}>
			<span className={styles["input-label"]}>{label}</span>
			<input
				{...field}
				className={styles["input-field"]}
				name={name}
				placeholder={placeholder}
				required={required}
				type={type}
			/>
			{hasError && <span>{error as string}</span>}
		</label>
	);
};

export { Input };
