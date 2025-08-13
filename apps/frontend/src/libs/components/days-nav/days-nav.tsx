import { type FC, useCallback } from "react";

import { Button } from "~/libs/components/components.js";
import { getClassNames } from "~/libs/helpers/get-class-names.js";

import styles from "./styles.module.css";

type NavItem = {
	id?: string;
	label: string;
};

type Properties = {
	className?: string;
	items: NavItem[];
	notesLabel?: string;
	onSelectItem: (index: "notes" | "preview" | number) => void;
	onSelectPreview?: () => void;
	previewLabel?: string;
	renderExtraAction?: (
		itemIndex: number,
		isSelected: boolean,
	) => React.ReactNode;
	renderSelectedIcon?: (itemIndex: number) => React.ReactNode;
	selectedItem: "notes" | "preview" | number;
	showNotes?: boolean;
	showPreviewButton?: boolean;
};

const DaysNav: FC<Properties> = ({
	className = "",
	items,
	notesLabel = "Notes",
	onSelectItem,
	onSelectPreview,
	previewLabel = "Preview",
	renderExtraAction,
	renderSelectedIcon,
	selectedItem,
	showNotes = false,
	showPreviewButton = false,
}) => {
	const handleClick = useCallback(
		(index: "notes" | "preview" | number) => (): void => {
			if (index === "preview" && onSelectPreview) {
				onSelectPreview();
			} else {
				onSelectItem(index);
			}
		},
		[onSelectItem, onSelectPreview],
	);

	return (
		<nav className={getClassNames(styles["nav"], className)}>
			<ul className={styles["navList"]}>
				{items.map((item, index) => {
					const isSelected = selectedItem === index;

					return (
						<li key={item.id || index}>
							<Button
								className={getClassNames(
									styles["navButton"],
									isSelected && styles["active"],
								)}
								label={item.label}
								onClick={handleClick(index)}
								variant="transparent"
							/>
							{isSelected && renderSelectedIcon?.(index)}

							{renderExtraAction?.(index, isSelected)}
						</li>
					);
				})}

				{showNotes && (
					<li>
						<Button
							className={getClassNames(
								styles["navButton"],
								selectedItem === "notes" && styles["active"],
							)}
							label={notesLabel}
							onClick={handleClick("notes")}
							variant="transparent"
						/>
					</li>
				)}

				{showPreviewButton && onSelectPreview && (
					<li className={styles["mobile-only"]}>
						<Button
							className={getClassNames(
								styles["navButton"],
								selectedItem === "preview" && styles["active"],
							)}
							label={previewLabel}
							onClick={handleClick("preview")}
							variant="transparent"
						/>
					</li>
				)}
			</ul>
		</nav>
	);
};

export { DaysNav };
