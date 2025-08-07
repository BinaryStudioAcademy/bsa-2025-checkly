import React, { useCallback } from "react";

import { DownloadIcon, EditIcon } from "~/assets/img/icons/icons.js";
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
				<EditIcon className={styles["button-icon"]} />
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
				<DownloadIcon className={styles["button-icon"]} />
				DOWNLOAD
			</button>
		</div>
	);
};

export { PlanActions };
