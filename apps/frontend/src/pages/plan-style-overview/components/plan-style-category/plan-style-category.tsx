import React from "react";
import { LuCalendarArrowDown } from "react-icons/lu";

import {
	FileIcon,
	MonitorIcon,
	SmartphoneIcon,
} from "~/assets/img/icons/icons.js";
import { Button } from "~/libs/components/components.js";
import { getClassNames } from "~/libs/helpers/get-class-names.js";

import styles from "./styles.module.css";

type Properties = {
	actionButtonDisabled?: boolean;
	actionButtonLabel?: string;
	onActionButtonClick?: () => void;
};

const PlanStyleCategory: React.FC<Properties> = ({
	actionButtonDisabled,
	actionButtonLabel,
	onActionButtonClick,
}) => {
	return (
		<div className={styles["header-buttons"]}>
			<Button
				className={styles["header-buttons-button"]}
				icon={<FileIcon aria-hidden="true" />}
				label="PDF"
				size="small"
			/>
			<Button
				className={styles["header-buttons-button"]}
				icon={<SmartphoneIcon aria-hidden="true" />}
				iconOnlySize="large"
				isDisabled
				label="Mobile Wallpaper"
				size="small"
			/>
			<Button
				className={styles["header-buttons-button"]}
				icon={<MonitorIcon aria-hidden="true" />}
				isDisabled
				label="Desktop Wallpaper"
				size="small"
			/>
			{actionButtonLabel ? (
				<Button
					aria-label={actionButtonLabel}
					className={getClassNames(
						styles["header-buttons-button"],
						styles["download-button"],
					)}
					icon={<LuCalendarArrowDown aria-hidden="true" />}
					isDisabled={Boolean(actionButtonDisabled)}
					label={actionButtonLabel}
					onClick={onActionButtonClick}
					size="small"
				/>
			) : null}
		</div>
	);
};

export { PlanStyleCategory };
