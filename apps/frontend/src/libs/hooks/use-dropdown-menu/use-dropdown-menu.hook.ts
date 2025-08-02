import { useEffect } from "react";

const Key = {
	ARROW_DOWN: "ArrowDown",
	ARROW_UP: "ArrowUp",
	ESCAPE: "Escape",
};

const Step = {
	DOWN: 1,
	UP: -1,
	ZERO_INDEX: 0,
};

type Properties = {
	isMenuOpen: boolean;
	menuReference: React.RefObject<HTMLDivElement | null>;
	onClose: () => void;
};

function getNextIndex({
	activeElement,
	items,
	step,
}: {
	activeElement: Element | null;
	items: Element[];
	step: number;
}): number {
	let index = items.indexOf(activeElement as Element);

	return (index + step + items.length) % items.length;
}

function useDropdownMenu({
	isMenuOpen,
	menuReference,
	onClose,
}: Properties): void {
	const handleClickOutside = (event: MouseEvent): void => {
		if (
			menuReference.current &&
			!menuReference.current.contains(event.target as Node)
		) {
			onClose();
		}
	};

	const handleKeyDown = (event: KeyboardEvent): void => {
		if (event.key === Key.ESCAPE) {
			onClose();
		}

		if (event.key === Key.ARROW_DOWN || event.key === Key.ARROW_UP) {
			const items = [
				...(menuReference.current?.querySelectorAll(
					"button[role='menuitem']",
				) || []),
			];

			if (items.length === Step.ZERO_INDEX) {
				return;
			}

			const { activeElement } = document;
			const step = event.key === Key.ARROW_DOWN ? Step.DOWN : Step.UP;
			const index = getNextIndex({ activeElement, items, step });
			(items[index] as HTMLElement).focus();
			event.preventDefault();
		}
	};

	useEffect(() => {
		if (!isMenuOpen) {
			return;
		}

		document.addEventListener("mousedown", handleClickOutside);
		document.addEventListener("keydown", handleKeyDown);

		return (): void => {
			document.removeEventListener("mousedown", handleClickOutside);
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [isMenuOpen, menuReference, onClose]);
}

export { useDropdownMenu };
