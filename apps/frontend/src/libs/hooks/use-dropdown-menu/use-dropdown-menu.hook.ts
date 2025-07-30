import { useEffect } from "react";

type UseDropdownMenuProperties = {
	isMenuOpen: boolean;
	menuReference: React.RefObject<HTMLDivElement | null>;
	onClose: () => void;
};

const KEY_ESCAPE = "Escape";
const KEY_ARROW_DOWN = "ArrowDown";
const KEY_ARROW_UP = "ArrowUp";
const STEP_UP = -1;
const ZERO_INDEX = 0;
const STEP_DOWN = 1;

function useDropdownMenu({
	isMenuOpen,
	menuReference,
	onClose,
}: UseDropdownMenuProperties): void {
	const handleClickOutside = (event: MouseEvent): void => {
		if (
			menuReference.current &&
			!menuReference.current.contains(event.target as Node)
		) {
			onClose();
		}
	};

	const handleKeyDown = (event: KeyboardEvent): void => {
		if (event.key === KEY_ESCAPE) {
			onClose();
		}

		if (event.key === KEY_ARROW_DOWN || event.key === KEY_ARROW_UP) {
			const items = [
				...(menuReference.current?.querySelectorAll(
					"button[role='menuitem']",
				) || []),
			];

			if (items.length === ZERO_INDEX) {
				return;
			}

			const { activeElement } = document;
			let index = items.indexOf(activeElement as Element);
			const step = event.key === KEY_ARROW_DOWN ? STEP_DOWN : STEP_UP;
			index = (index + step + items.length) % items.length;
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
