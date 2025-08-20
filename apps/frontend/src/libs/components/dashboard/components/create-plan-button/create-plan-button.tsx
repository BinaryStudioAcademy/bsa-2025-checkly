import { Button } from "~/libs/components/components.js";
import { getClassNames } from "~/libs/helpers/get-class-names.js";

import styles from "./styles.module.css";

type Properties = {
	className?: string;
	icon?: React.ReactNode;
	isDisabled?: boolean;
	label: string;
	onClick: React.MouseEventHandler<HTMLButtonElement>;
};

const CreatePlanButton: React.FC<Properties> = ({
	className,
	icon,
	isDisabled = false,
	label,
	onClick,
}: Properties) => {
	const buttonClasses = getClassNames(styles["button"], className);

	return (
		<Button
			className={buttonClasses}
			icon={icon}
			isDisabled={isDisabled}
			label={label}
			onClick={onClick}
			size="large"
			variant="primary"
		/>
	);
};

export { CreatePlanButton };
