import { useCallback } from "react";
import { Link } from "react-router-dom";

import {
	Dashboard,
	DownloadIcon,
	EditIcon,
	Palette,
} from "~/assets/img/icons/icons.js";
import { Button } from "~/libs/components/button/button.js";
import { Loader } from "~/libs/components/loader/loader.js";
import { AppRoute } from "~/libs/enums/app-route.enum.js";

import styles from "./styles.module.css";

type Properties = {
	isAuthenticated: boolean;
	isDownloading: boolean;
	onChooseStyle: () => void;
	onDownload: () => void;
	onEdit: () => void;
	onGoToDashboard: () => void;
};

const PlanActions: React.FC<Properties> = ({
	isAuthenticated,
	isDownloading,
	onChooseStyle,
	onDownload,
	onEdit,
	onGoToDashboard,
}: Properties) => {
	const handleEditClick = useCallback((): void => {
		onEdit();
	}, [onEdit]);

	const handleDownloadClick = useCallback((): void => {
		onDownload();
	}, [onDownload]);

	const handleGoToDashboardClick = useCallback((): void => {
		onGoToDashboard();
	}, [onGoToDashboard]);

	const handleChooseStyleClick = useCallback((): void => {
		onChooseStyle();
	}, [onChooseStyle]);

	return (
		<div className={styles["footer-container"]}>
			<div className={styles["actions-container"]}>
				<Button
					icon={<Palette aria-hidden="true" />}
					isDisabled={!isAuthenticated}
					label="CHOOSE STYLE"
					onClick={handleChooseStyleClick}
					size="small"
					variant="secondary"
				/>
				<Button
					icon={<EditIcon aria-hidden="true" />}
					isDisabled={!isAuthenticated}
					label="EDIT"
					onClick={handleEditClick}
					size="small"
					variant="secondary"
				/>
				<Button
					icon={<DownloadIcon aria-hidden="true" />}
					isDisabled={!isAuthenticated || isDownloading}
					label="DOWNLOAD"
					loader={
						isDownloading ? (
							<Loader container="inline" size="small" theme="accent" />
						) : undefined
					}
					onClick={handleDownloadClick}
					size="small"
					variant="primary"
				/>
				<Button
					icon={<Dashboard aria-hidden="true" />}
					isDisabled={!isAuthenticated}
					label="GO TO DASHBOARD"
					onClick={handleGoToDashboardClick}
					size="small"
					variant="secondary"
				/>
			</div>
			{!isAuthenticated && (
				<div className={styles["footer-message"]}>
					Customize and Download your Plan by{" "}
					<Link className={styles["login-link"]} to={AppRoute.SIGN_IN}>
						Logging in
					</Link>
				</div>
			)}
		</div>
	);
};

export { PlanActions };
