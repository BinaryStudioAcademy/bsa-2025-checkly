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
	onSelectItem: (index: SelectedItemType) => void;
	onSelectPreview?: () => void;
	previewLabel?: string;
	renderExtraAction?: (
		itemIndex: number,
		isSelected: boolean,
	) => React.ReactNode;
	renderSelectedIcon?: (itemIndex: number) => React.ReactNode;
	selectedItem: SelectedItemType;
	showNotes?: boolean;
	showPreviewButton?: boolean;
};

type SelectedItemType = "notes" | "preview" | number;

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
	const handleSelectItem = useCallback(
		(index: SelectedItemType) => (): void => {
			(index === "preview" && onSelectPreview)
				? onSelectPreview()
				: onSelectItem(index);
		},
		[onSelectItem, onSelectPreview],
	);

	return (
		<nav className={getClassNames(styles["nav"], className)}>
			<ul className={getClassNames("cluster", styles["navList"])}>
				{items.map((item, index) => {
					const isSelected = selectedItem === index;

					return (
						<li key={item.id}>
							<Button
								className={getClassNames(
									styles["navButton"],
									isSelected && styles["active"],
								)}
								label={item.label}
								onClick={handleSelectItem(index)}
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
							onClick={handleSelectItem("notes")}
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
							onClick={handleSelectItem("preview")}
							variant="transparent"
						/>
					</li>
				)}
			</ul>
		</nav>
	);
};

export { DaysNav };
