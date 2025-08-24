import { isFulfilled } from "@reduxjs/toolkit";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { StarsYellow02 } from "~/assets/img/shared/shapes/shapes.img.js";
import { AppHeader, DecorativeImage } from "~/libs/components/components.js";
import { PlanStyle } from "~/libs/components/plan-styles/plan-style/plan-style.js";
import { MESSAGES } from "~/libs/constants/constants.js";
import { AppRoute, DataStatus, PlanCategoryId } from "~/libs/enums/enums.js";
import { getClassNames } from "~/libs/helpers/helpers.js";
import { usePlanCategory } from "~/libs/hooks/hooks.js";
import { useAppDispatch } from "~/libs/hooks/use-app-dispatch/use-app-dispatch.hook.js";
import { useAppSelector } from "~/libs/hooks/use-app-selector/use-app-selector.hook.js";
import { notifications } from "~/libs/modules/notifications/notifications.js";
import { actions } from "~/modules/pdf-export/slices/pdf-export.js";

import {
	PlanActions,
	PlanStyleCategory,
	ToastSuccess,
} from "./components/components.js";
import styles from "./styles.module.css";

const PlanStyleOverview: React.FC = () => {
	const user = useAppSelector((state) => state.auth.user);
	const selectedStyle = useAppSelector((state) => state.plan.selectedStyle);
	const isAuthenticated = Boolean(user);
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { selectedCategory } = usePlanCategory(PlanCategoryId.PDF);

	const handleEditPlan = useCallback((): void => {
		notifications.info(MESSAGES.FEATURE.NOT_IMPLEMENTED);
	}, []);

	const pdfExportStatus = useAppSelector((state) => state.pdfExport.dataStatus);

	const handleGoToDashboard = useCallback((): void => {
		void navigate(AppRoute.DASHBOARD);
	}, [navigate]);

	const handleDownloadPlan = useCallback(async (): Promise<void> => {
		try {
			const resultAction = await dispatch(
				actions.exportPdf({ category: selectedCategory }),
			);

			if (isFulfilled(resultAction)) {
				notifications.success(
					<ToastSuccess
						message={MESSAGES.DOWNLOAD.SUCCESS}
						onGoToDashboard={handleGoToDashboard}
					/>,
				);
			}
		} catch {
			notifications.error(MESSAGES.DOWNLOAD.FAILED);
		}
	}, [dispatch, selectedCategory, handleGoToDashboard]);

	const handleDownload = useCallback((): void => {
		void handleDownloadPlan();
	}, [handleDownloadPlan]);

	const handleChooseStyle = useCallback((): void => {
		void navigate(AppRoute.CHOOSE_STYLE);
	}, [navigate]);

	return (
		<>
			<AppHeader />
			<div className={styles["header-section"]}>
				<PlanStyleCategory />
			</div>
			<div className={getClassNames(styles["container"], "grid-pattern")}>
				<div className={styles["plan-content"]}>
					<PlanStyle inputStyle={selectedStyle} />
					<DecorativeImage
						className={styles["yellow-stars-reflection"]}
						src={StarsYellow02}
					/>
					<DecorativeImage
						className={styles["yellow-stars"]}
						src={StarsYellow02}
					/>
				</div>
			</div>

			<div className={styles["actions-section"]}>
				<PlanActions
					isAuthenticated={isAuthenticated}
					isDownloading={pdfExportStatus === DataStatus.PENDING}
					onChooseStyle={handleChooseStyle}
					onDownload={handleDownload}
					onEdit={handleEditPlan}
					onGoToDashboard={handleGoToDashboard}
				/>
			</div>
		</>
	);
};

export { PlanStyleOverview };
