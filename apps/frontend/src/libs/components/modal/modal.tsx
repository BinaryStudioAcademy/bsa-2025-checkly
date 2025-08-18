import { type ReactNode } from "react";

import { Remove } from "~/assets/img/icons/icons.js";
import { Button, DecorativeImage } from "~/libs/components/components.js";
import { ButtonVariants } from "~/libs/enums/enums.js";
import { getClassNames } from "~/libs/helpers/helpers.js";

import styles from "./styles.module.css";

type Properties = {
	children: ReactNode;
	isOpen: boolean;
	onClose: () => void;
	title?: string;
};

const Modal: React.FC<Properties> = ({
	children,
	isOpen,
	onClose,
	title,
}: Properties) => {
	if (!isOpen) {
		return null;
	}

	return (
		<div aria-modal="true" className={styles["modal-overlay"]} role="dialog">
			<div className={styles["modal-content"]}>
				{title && (
					<div className={styles["modal-header"]}>
						<h3 className={styles["modal-title"]}>{title}</h3>
						<Button
							className={getClassNames(styles["modal-close"])}
							icon={<DecorativeImage src={Remove} />}
							isIconOnly
							label="Close modal"
							onClick={onClose}
							variant={ButtonVariants.TRANSPARENT}
						/>
					</div>
				)}
				<div className={styles["modal-body"]}>{children}</div>
			</div>
		</div>
	);
};

export { Modal };
