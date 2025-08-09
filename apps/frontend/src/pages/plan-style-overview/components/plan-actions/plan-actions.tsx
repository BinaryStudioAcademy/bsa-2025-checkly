import React, { useCallback } from "react";

import DownloadIcon from "~/assets/img/icons/download.svg";
import EditIcon from "~/assets/img/icons/edit.svg";
import { getClassNames } from "~/libs/helpers/helpers.js";

import styles from "./styles.module.css";

type Properties = {
	onDownload?: () => void;
	onEdit?: () => void;
};

const PlanActions: React.FC<Properties> = ({ onDownload, onEdit }) => {
	const handleEditClick = useCallback((): void => {
		onEdit?.();
	}, [onEdit]);

	const handleDownloadClick = useCallback((): void => {
		onDownload?.();
	}, [onDownload]);

	return (
		<div className={styles["actions-container"]}>
			<button
				aria-label="Edit plan"
				className={getClassNames(
					styles["action-button"],
					styles["edit-button"],
				)}
				onClick={handleEditClick}
				type="button"
			>
				<img alt="Edit" className={styles["button-icon"]} src={EditIcon} />
				EDIT
			</button>

			<button
				aria-label="Download plan"
				className={getClassNames(
					styles["action-button"],
					styles["download-button"],
				)}
				onClick={handleDownloadClick}
				type="button"
			>
				<img
					alt="Download"
					className={styles["button-icon"]}
					src={DownloadIcon}
				/>
				DOWNLOAD
			</button>
		</div>
	);
};

export { PlanActions };
