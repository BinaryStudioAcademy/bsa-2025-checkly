import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
	Dashboard,
	DownloadIcon,
	EditIcon,
	Palette,
} from "~/assets/img/icons/icons.js";
import { Button } from "~/libs/components/button/button.js";
import { Loader } from "~/libs/components/loader/loader.js";
import { REDIRECT_PARAM } from "~/libs/constants/constants.js";
import { AppRoute } from "~/libs/enums/app-route.enum.js";
import { getClassNames } from "~/libs/helpers/get-class-names.js";
import { useLocation } from "~/libs/hooks/hooks.js";

import styles from "./styles.module.css";

type Properties = {
	handleConfirmCalendarDownload?: () => void;
	isAuthenticated: boolean;
	isDownloading: boolean;
	onChooseStyle: () => void;
	onDownload: () => void;
	onEdit: () => void;
	onGoToDashboard: () => void;
};

const PlanActions: React.FC<Properties> = ({
	handleConfirmCalendarDownload,
	isAuthenticated,
	isDownloading,
	onChooseStyle,
	onDownload,
	onEdit,
	onGoToDashboard,
}: Properties) => {
	const RESPONSIVE_BREAKPOINT = 768;
	const location = useLocation();
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

	const handleEditClick = useCallback((): void => {
		onEdit();
	}, [onEdit]);

	const handleDownloadClick = useCallback((): void => {
		if (isMobile && typeof handleConfirmCalendarDownload === "function") {
			handleConfirmCalendarDownload();
		} else {
			onDownload();
		}
	}, [onDownload, isMobile, handleConfirmCalendarDownload]);

	const handleGoToDashboardClick = useCallback((): void => {
		onGoToDashboard();
	}, [onGoToDashboard]);

	const handleChooseStyleClick = useCallback((): void => {
		onChooseStyle();
	}, [onChooseStyle]);

	return (
		<div className={getClassNames("flow-loose", styles["footer-container"])}>
			{!isAuthenticated && (
				<div className={styles["footer-message"]}>
					Customize and Download your personal plan by{" "}
					<Link
						className={styles["login-link"]}
						to={`${AppRoute.SIGN_IN}?${REDIRECT_PARAM}=${encodeURIComponent(location.pathname)}`}
					>
						Logging in
					</Link>
				</div>
			)}
			<div
				className={getClassNames("cluster flow", styles["actions-container"])}
			>
				<Button
					className={styles["action-button"]}
					icon={<DownloadIcon aria-hidden="true" />}
					isDisabled={!isAuthenticated || isDownloading}
					label="DOWNLOAD"
					loader={
						isDownloading ? (
							<Loader container="inline" size="small" theme="accent" />
						) : undefined
					}
					onClick={handleDownloadClick}
					size="large"
					variant="primary"
				/>
				<div
					className={getClassNames("cluster", styles["actions-sub-container"])}
				>
					<Button
						className={styles["action-button"]}
						icon={<Palette aria-hidden="true" />}
						isDisabled={!isAuthenticated}
						label="CHOOSE STYLE"
						onClick={handleChooseStyleClick}
						size="small"
						variant="secondary"
					/>
					<Button
						className={styles["action-button"]}
						icon={<EditIcon aria-hidden="true" />}
						isDisabled={!isAuthenticated}
						label="EDIT"
						onClick={handleEditClick}
						size="small"
						variant="secondary"
					/>
					<Button
						className={styles["action-button"]}
						icon={<Dashboard aria-hidden="true" />}
						isDisabled={!isAuthenticated}
						label="GO TO DASHBOARD"
						onClick={handleGoToDashboardClick}
						size="small"
						variant="secondary"
					/>
				</div>
			</div>
		</div>
	);
};

export { PlanActions };
