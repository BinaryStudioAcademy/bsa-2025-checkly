import { type ReactNode, useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { Remove } from "~/assets/img/icons/icons.js";
import { Button, DecorativeImage } from "~/libs/components/components.js";
import { ButtonVariants, KeyboardKeys } from "~/libs/enums/enums.js";
import { getClassNames } from "~/libs/helpers/helpers.js";

import styles from "./styles.module.css";

type Properties = {
	children: ReactNode;
	isOpen: boolean;
	modalReference?: React.RefObject<HTMLDialogElement | null>;
	onClose: () => void;
	title?: string;
};

const Modal: React.FC<Properties> = ({
	children,
	isOpen,
	modalReference,
	onClose,
	title,
}: Properties) => {
	const [portalElement, setPortalElement] = useState<HTMLElement | null>(null);
	const [shouldRender, setShouldRender] = useState<boolean>(isOpen);
	const [isClosing, setIsClosing] = useState<boolean>(false);

	useEffect(() => {
		setPortalElement(document.body);
	}, []);

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
		const originalOverflow = document.body.style.overflow;
		const originalPaddingRight = document.body.style.paddingRight;

		if (isOpen) {
			const scrollbarWidth =
				window.innerWidth - document.documentElement.clientWidth;

			document.body.style.overflow = "hidden";
			document.body.style.paddingRight = `${String(scrollbarWidth)}px`;
		} else {
			document.body.style.overflow = originalOverflow;
			document.body.style.paddingRight = originalPaddingRight;
		}

		return (): void => {
			document.body.style.overflow = originalOverflow;
			document.body.style.paddingRight = originalPaddingRight;
		};
	}, [isOpen]);

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

	if (!isOpen || !portalElement) {
		return null;
	}

	return createPortal(
		<dialog
			className={getClassNames(
				styles["modal-overlay"],
				!isClosing && styles["modal-open"],
				isClosing && styles["modal-close"],
			)}
			onAnimationEnd={handleAnimationEnd}
			open
			ref={modalReference}
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
		</dialog>,
		portalElement,
	);
};

export { Modal };
