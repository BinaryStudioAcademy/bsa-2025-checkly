import { type ReactNode, useCallback, useEffect, useState } from "react";

import { Remove } from "~/assets/img/icons/icons.js";
import { Button, DecorativeImage } from "~/libs/components/components.js";
import { ButtonVariants, KeyboardKeys } from "~/libs/enums/enums.js";
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
	const [shouldRender, setShouldRender] = useState<boolean>(isOpen);
	const [isClosing, setIsClosing] = useState<boolean>(false);

	useEffect(() => {
		if (isOpen) {
			setShouldRender(true);
			setIsClosing(false);
		}
	}, [isOpen]);

	useEffect(() => {
		if (!isOpen && shouldRender) {
			setIsClosing(true);
		}
	}, [isOpen, shouldRender]);

	useEffect(() => {
		if (shouldRender) {
			const originalOverflow = document.body.style.overflow;
			const originalPaddingRight = document.body.style.paddingRight;

			const scrollbarWidth =
				window.innerWidth - document.documentElement.clientWidth;

			document.body.style.overflow = "hidden";
			document.body.style.paddingRight = `${String(scrollbarWidth)}px`;

			return (): void => {
				document.body.style.overflow = originalOverflow;
				document.body.style.paddingRight = originalPaddingRight;
			};
		}
	}, [shouldRender]);

	useEffect(() => {
		if (!shouldRender) {
			return;
		}

		const handleEscapeKey = (event: KeyboardEvent): void => {
			if (event.key === KeyboardKeys.ESCAPE) {
				event.preventDefault();
				onClose();
			}
		};

		document.addEventListener("keydown", handleEscapeKey);

		return (): void => {
			document.removeEventListener("keydown", handleEscapeKey);
		};
	}, [shouldRender, onClose]);

	const handleAnimationEnd = useCallback(() => {
		if (isClosing) {
			setShouldRender(false);
			setIsClosing(false);
		}
	}, [isClosing]);

	if (!shouldRender) {
		return null;
	}

	return (
		<dialog
			className={getClassNames(
				styles["modal-overlay"],
				isOpen && !isClosing && styles["modal-open"],
				isClosing && styles["modal-close"],
			)}
			onAnimationEnd={handleAnimationEnd}
			open
		>
			<div className={getClassNames("grid-pattern", styles["modal-content"])}>
				{title && (
					<div className={styles["modal-header"]}>
						<h3 className={styles["modal-title"]}>{title}</h3>
						<Button
							className={getClassNames(styles["modal-close"])}
							icon={<DecorativeImage src={Remove} />}
							isIconOnly
							label="Close modal"
							onClick={onClose}
							variant={ButtonVariants.PRIMARY}
						/>
					</div>
				)}
				<div className={styles["modal-body"]}>{children}</div>
			</div>
		</dialog>
	);
};

export { Modal };
