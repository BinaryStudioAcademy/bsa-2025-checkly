import { useCallback, useEffect, useState } from "react";
import { LuCalendarArrowDown } from "react-icons/lu";

import {
	FileIcon,
	MonitorIcon,
	SmartphoneIcon,
} from "~/assets/img/icons/icons.js";
import { Button } from "~/libs/components/components.js";
import { type CategoryId } from "~/libs/constants/constants.js";
import { PlanCategoryId } from "~/libs/enums/enums.js";
import { getClassNames } from "~/libs/helpers/get-class-names.js";

import styles from "./styles.module.css";

type Properties = {
	actionButtonDisabled?: boolean;
	actionButtonLabel?: string;
	onActionButtonClick?: () => void;
	onSelect: (category: CategoryId) => void;
	selectedCategory: CategoryId;
};

const PlanStyleCategory: React.FC<Properties> = ({
	actionButtonDisabled,
	actionButtonLabel,
	onActionButtonClick,
	onSelect,
	selectedCategory,
}: Properties) => {
	const RESPONSIVE_BREAKPOINT = 768;
	const handleSelectPdf = useCallback((): void => {
		onSelect(PlanCategoryId.PDF);
	}, [onSelect]);

	const handleSelectMobile = useCallback((): void => {
		onSelect(PlanCategoryId.MOBILE);
	}, [onSelect]);

	const handleSelectDesktop = useCallback((): void => {
		onSelect(PlanCategoryId.DESKTOP);
	}, [onSelect]);

	const [isMobile, setIsMobile] = useState<boolean>(false);

	useEffect(() => {
		const checkMobile = (): void => {
			setIsMobile(window.innerWidth <= RESPONSIVE_BREAKPOINT);
		};

		checkMobile();
		window.addEventListener("resize", checkMobile);

		return (): void => {
			window.removeEventListener("resize", checkMobile);
		};
	}, []);

	return (
		<div className={styles["header-buttons"]}>
			<Button
				className={styles["header-buttons-button"]}
				icon={<FileIcon aria-hidden="true" />}
				isDisabled={isMobile}
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
				isDisabled={isMobile}
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
				isDisabled={isMobile}
				label="Desktop Wallpaper"
				onClick={handleSelectDesktop}
				size="small"
				variant={
					selectedCategory === PlanCategoryId.DESKTOP ? "primary" : "secondary"
				}
			/>
			{actionButtonLabel ? (
				<Button
					aria-label={actionButtonLabel}
					className={getClassNames(
						styles["header-buttons-button"],
						styles["download-button"],
					)}
					icon={<LuCalendarArrowDown aria-hidden="true" />}
					isDisabled={isMobile || Boolean(actionButtonDisabled)}
					label={actionButtonLabel}
					onClick={onActionButtonClick}
					size="small"
				/>
			) : null}
		</div>
	);
};

export { PlanStyleCategory };
