import { type JSX, useCallback, useId, useState } from "react";
import {
	type Control,
	type FieldErrors,
	type FieldPath,
	type FieldValues,
} from "react-hook-form";

import { EyeClosedIcon, EyeOpenIcon } from "~/assets/img/icons/icons.js";
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
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const inputId = useId();
	const { field } = useFormController({ control, name });
	const error = errors[name]?.message;
	const hasError = Boolean(error);
	const isPasswordField = type === "password";
	const inputType = isPasswordField && showPassword ? "text" : type;

	const togglePasswordVisibility = useCallback(() => {
		setShowPassword((previous) => !previous);
	}, []);

	const inputContainerClass = getClassNames(
		styles["input-container"],
		"cluster",
	);
	const inputFieldClass = getClassNames(
		styles["input-field"],
		hasError && styles["input-field--error"],
		isPasswordField && styles["input-field--password"],
	);

	const passwordIcon = showPassword ? <EyeOpenIcon /> : <EyeClosedIcon />;

	return (
		<div className={inputContainerClass}>
			<label className={styles["input-label"]} htmlFor={inputId}>
				{label}
			</label>
			<div className={styles["input-wrapper"]}>
				<input
					{...field}
					aria-invalid={hasError}
					className={inputFieldClass}
					id={inputId}
					name={name}
					placeholder={placeholder}
					required={required}
					type={inputType}
				/>
				{isPasswordField && (
					<button
						aria-label={showPassword ? "Hide password" : "Show password"}
						className={styles["password-toggle-button"]}
						onClick={togglePasswordVisibility}
						type="button"
					>
						<span aria-hidden="true">{passwordIcon}</span>
					</button>
				)}
			</div>
			{hasError && (
				<p className={styles["input-field__error"]}>{error as string}</p>
			)}
		</div>
	);
};

export { Input };
