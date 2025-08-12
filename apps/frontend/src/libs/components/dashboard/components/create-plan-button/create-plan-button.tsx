import { Button } from "~/libs/components/components.js";
import { getClassNames } from "~/libs/helpers/get-class-names.js";

import styles from "./styles.module.css";

type Properties = {
	className?: string;
	disabled?: boolean;
	icon?: React.ReactNode;
	label: string;
	onClick: React.MouseEventHandler<HTMLButtonElement>;
};

const CreatePlanButton: React.FC<Properties> = ({
	className,
	disabled = false,
	icon,
	label,
	onClick,
}: Properties) => {
	const buttonClasses = getClassNames(styles["button"], className);

	return (
		<Button
			className={buttonClasses}
			disabled={disabled}
			icon={icon}
			label={label}
			onClick={onClick}
			size="large"
			variant="primary"
		/>
	);
};

export { CreatePlanButton };
