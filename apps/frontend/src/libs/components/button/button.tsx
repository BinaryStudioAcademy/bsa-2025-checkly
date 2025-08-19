import { getClassNames } from "~/libs/helpers/get-class-names.js";
import { type ButtonVariant } from "~/libs/types/types.js";

import styles from "./styles.module.css";

type Properties = {
	className?: string;
	disabled?: boolean;
	icon?: React.ReactNode;
	iconOnlySize?: "large" | "medium" | "small";
	isIconOnly?: boolean;
	label: string;
	loader?: React.ReactNode;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
	size?: "large" | "small";
	type?: "button" | "submit";
	variant?: ButtonVariant;
};

const Button: React.FC<Properties> = ({
	className = "",
	disabled = false,
	icon,
	iconOnlySize = "large",
	isIconOnly = false,
	label,
	loader,
	onClick,
	size = "large",
	type = "button",
	variant = "primary",
}: Properties) => {
	const buttonClasses = getClassNames(
		styles["button"],
		styles[`button-${variant}`],
		styles[`button-${size}`],
		styles["button-cluster"],
		isIconOnly && styles["button-icon-only"],
		isIconOnly && styles[`button-icon-only-${iconOnlySize}`],
		"cluster",
		className,
	);

	return (
		<button
			aria-label={isIconOnly ? label : undefined}
			className={buttonClasses}
			disabled={disabled}
			onClick={onClick}
			type={type}
		>
			{icon && (
				<span aria-hidden="true" className={styles["button-icon"]}>
					{icon}
				</span>
			)}
			{!isIconOnly && <span className={styles["button-text"]}>{label}</span>}
			{loader}
		</button>
	);
};

export { Button };
