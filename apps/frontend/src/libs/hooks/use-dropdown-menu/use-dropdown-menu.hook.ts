import { useEffect } from "react";

interface UseDropdownMenuProperties {
	isMenuOpen: boolean;
	menuReference: React.RefObject<HTMLDivElement | null>;
	onClose: () => void;
}

const STEP_UP = -1;
const ZERO_INDEX = 0;
const STEP_DOWN = 1;

function useDropdownMenu({
	isMenuOpen,
	menuReference,
	onClose,
}: UseDropdownMenuProperties): void {
	useEffect(() => {
		if (!isMenuOpen) {
			return;
		}

		const handleClickOutside = (event: MouseEvent): void => {
			if (
				menuReference.current &&
				!menuReference.current.contains(event.target as Node)
			) {
				onClose();
			}
		};

		const handleKeyDown = (event: KeyboardEvent): void => {
			if (event.key === "Escape") {
				onClose();
			}

			if (event.key === "ArrowDown" || event.key === "ArrowUp") {
				const items = [
					...(menuReference.current?.querySelectorAll(
						"button[role='menuitem']",
					) ?? []),
				];

				if (items.length === ZERO_INDEX) {
					return;
				}

				const { activeElement } = document;
				let index = items.indexOf(activeElement as Element);
				const step = event.key === "ArrowDown" ? STEP_DOWN : STEP_UP;
				index = (index + step + items.length) % items.length;
				(items[index] as HTMLElement).focus();
				event.preventDefault();
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		document.addEventListener("keydown", handleKeyDown);

		return (): void => {
			document.removeEventListener("mousedown", handleClickOutside);
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [isMenuOpen, menuReference, onClose]);
}

export { useDropdownMenu };
