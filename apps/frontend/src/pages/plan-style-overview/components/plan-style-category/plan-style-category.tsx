import { useCallback } from "react";

import {
	FileIcon,
	MonitorIcon,
	SmartphoneIcon,
} from "~/assets/img/icons/icons.js";
import { Button } from "~/libs/components/button/button.js";
import { type CategoryId } from "~/libs/constants/constants.js";
import { PlanCategoryId } from "~/libs/enums/enums.js";

import styles from "./styles.module.css";

type Properties = {
	onSelect: (category: CategoryId) => void;
	selectedCategory: CategoryId;
};

const PlanStyleCategory: React.FC<Properties> = ({
	onSelect,
	selectedCategory,
}: Properties) => {
	const handleSelectPdf = useCallback((): void => {
		onSelect(PlanCategoryId.PDF);
	}, [onSelect]);

	const handleSelectMobile = useCallback((): void => {
		onSelect(PlanCategoryId.MOBILE);
	}, [onSelect]);

	const handleSelectDesktop = useCallback((): void => {
		onSelect(PlanCategoryId.DESKTOP);
	}, [onSelect]);

	return (
		<div className={styles["header-buttons"]}>
			<Button
				className={styles["header-buttons-button"]}
				icon={<FileIcon aria-hidden="true" />}
				label="PDF"
				onClick={handleSelectPdf}
				size="small"
				variant={
					selectedCategory === PlanCategoryId.PDF ? "primary" : "secondary"
				}
			/>
			<Button
				className={styles["header-buttons-button"]}
				icon={<SmartphoneIcon aria-hidden="true" />}
				iconOnlySize="large"
				isDisabled
				label="Mobile Wallpaper"
				onClick={handleSelectMobile}
				size="small"
				variant={
					selectedCategory === PlanCategoryId.MOBILE ? "primary" : "secondary"
				}
			/>
			<Button
				className={styles["header-buttons-button"]}
				icon={<MonitorIcon aria-hidden="true" />}
				label="Desktop Wallpaper"
				onClick={handleSelectDesktop}
				size="small"
				variant={
					selectedCategory === PlanCategoryId.DESKTOP ? "primary" : "secondary"
				}
			/>
		</div>
	);
};

export { PlanStyleCategory };
