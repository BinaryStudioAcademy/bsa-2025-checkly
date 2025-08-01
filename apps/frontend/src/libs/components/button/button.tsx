import { getClassNames } from "~/libs/helpers/get-class-names.js";

import styles from "./styles.module.css";

type Properties = {
	disabled?: boolean;
	icon?: React.ReactNode;
	label: string;
	size?: "large" | "small";
	type?: "button" | "submit";
	variant?: "primary" | "secondary" | "transparent";
};

const Button: React.FC<Properties> = ({
	disabled = false,
	icon,
	label,
	size = "large",
	type = "button",
	variant = "primary",
}: Properties) => {
	const buttonClasses = getClassNames(
		styles["button"],
		styles[`button-${variant}`],
		styles[`button-${size}`],
		styles["button-cluster"],
		"cluster",
	);

	return (
		<button className={buttonClasses} disabled={disabled} type={type}>
			{icon && (
				<span aria-hidden="true" className={styles["button-icon"]}>
					{icon}
				</span>
			)}
			<span>{label}</span>
		</button>
	);
};

export { Button };
