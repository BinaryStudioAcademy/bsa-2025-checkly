import React, { useCallback } from "react";

import {
	Dashboard,
	DownloadIcon,
	EditIcon,
	Palette,
} from "~/assets/img/icons/icons.js";
import { Button } from "~/libs/components/button/button.js";

import styles from "./styles.module.css";

type Properties = {
	onChooseStyle?: () => void;
	onDownload?: () => void;
	onEdit?: () => void;
	onGoToDashboard?: () => void;
};

const PlanActions: React.FC<Properties> = ({
	onChooseStyle,
	onDownload,
	onEdit,
	onGoToDashboard,
}) => {
	const handleEditClick = useCallback((): void => {
		onEdit?.();
	}, [onEdit]);

	const handleDownloadClick = useCallback((): void => {
		onDownload?.();
	}, [onDownload]);

	const handleGoToDashboardClick = useCallback((): void => {
		onGoToDashboard?.();
	}, [onGoToDashboard]);

	const handleChooseStyleClick = useCallback((): void => {
		onChooseStyle?.();
	}, [onChooseStyle]);

	return (
		<div className={styles["actions-container"]}>
			<Button
				icon={<Palette aria-hidden="true" />}
				label="CHOOSE STYLE"
				onClick={handleChooseStyleClick}
				size="small"
				variant="secondary"
			/>
			<Button
				icon={<EditIcon aria-hidden="true" />}
				label="EDIT"
				onClick={handleEditClick}
				size="small"
				variant="secondary"
			/>
			<Button
				icon={<DownloadIcon aria-hidden="true" />}
				label="DOWNLOAD"
				onClick={handleDownloadClick}
				size="small"
				variant="primary"
			/>
			<Button
				icon={<Dashboard aria-hidden="true" />}
				label="GO TO DASHBOARD"
				onClick={handleGoToDashboardClick}
				size="small"
				variant="secondary"
			/>
		</div>
	);
};

export { PlanActions };
