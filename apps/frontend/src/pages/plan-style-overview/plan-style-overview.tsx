import { isFulfilled } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { StarsYellow02 } from "~/assets/img/shared/shapes/shapes.img.js";
import { AppHeader, DecorativeImage } from "~/libs/components/components.js";
import { PlanStyle } from "~/libs/components/plan-styles/plan-style/plan-style.js";
import {
	getCategoryStyle,
	MESSAGES,
	PLAN_NAME_DEFAULT,
	ZERO,
} from "~/libs/constants/constants.js";
import { AppRoute, DataStatus, PlanCategoryId } from "~/libs/enums/enums.js";
import { getClassNames } from "~/libs/helpers/helpers.js";
import { useCallback, usePlanCategory } from "~/libs/hooks/hooks.js";
import { useAppDispatch } from "~/libs/hooks/use-app-dispatch/use-app-dispatch.hook.js";
import { useAppSelector } from "~/libs/hooks/use-app-selector/use-app-selector.hook.js";
import { notifications } from "~/libs/modules/notifications/notifications.js";
import { type PlanStyleOption } from "~/libs/types/types.js";
import { actions } from "~/modules/pdf-export/slices/pdf-export.js";
import {
	DEFAULT_PLAN_STYLE,
	PLAN_STYLE_TO_READABLE,
} from "~/modules/plan-styles/libs/constants/plan-style.constants.js";
import { actions as planActions } from "~/modules/plans/plans.js";
import { actions as planSliceActions } from "~/modules/plans/slices/plan.slice.js";

import {
	PlanActions,
	PlanStyleCategory,
	ToastSuccess,
} from "./components/components.js";
import styles from "./styles.module.css";

const PlanStyleOverview: React.FC = () => {
	const user = useAppSelector((state) => state.auth.user);
	const plan = useAppSelector((state) => state.plan.plan);
	const userPlans = useAppSelector((state) => state.plan.userPlans);
	const isAuthenticated = Boolean(user);
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { handleCategorySelect, selectedCategory } = usePlanCategory(
		PlanCategoryId.PDF,
	);

	useEffect(() => {
		if (user) {
			void dispatch(planActions.getAllUserPlans());
		}
	}, [user, dispatch]);

	useEffect(() => {
		if (userPlans.length > ZERO) {
			const maxId = Math.max(...userPlans.map((p) => p.id));
			const latestPlan = userPlans.find((p) => p.id === maxId);

			if (latestPlan) {
				dispatch(planSliceActions.setPlan(latestPlan));
			}
		}
	}, [userPlans, dispatch]);

	const handleGetStyleFromPlan = useCallback((): PlanStyleOption => {
		if (!plan) {
			return DEFAULT_PLAN_STYLE;
		}

		const style = PLAN_STYLE_TO_READABLE[plan.styleId] ?? DEFAULT_PLAN_STYLE;

		return style;
	}, [plan]);

	const handleEditPlan = useCallback((): void => {
		notifications.info(MESSAGES.FEATURE.NOT_IMPLEMENTED);
	}, []);

	const pdfExportStatus = useAppSelector((state) => state.pdfExport.dataStatus);

	const handleGoToDashboard = useCallback((): void => {
		void navigate(AppRoute.DASHBOARD);
	}, [navigate]);

	const handleDownloadPlan = useCallback(async (): Promise<void> => {
		try {
			let resultAction;

			switch (selectedCategory) {
				case PlanCategoryId.DESKTOP: {
					resultAction = await dispatch(actions.exportDesktopPng());
					break;
				}

				case PlanCategoryId.MOBILE: {
					resultAction = await dispatch(actions.exportMobilePng());
					break;
				}

				default: {
					resultAction = await dispatch(
						actions.exportPdf({ category: selectedCategory }),
					);
				}
			}

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
				<PlanStyleCategory
					onSelect={handleCategorySelect}
					selectedCategory={selectedCategory}
				/>
			</div>
			<div className={getClassNames(styles["container"], "grid-pattern")}>
				<div className={styles["plan-content"]}>
					<PlanStyle
						inputStyle={handleGetStyleFromPlan()}
						planTitle={plan?.title ?? PLAN_NAME_DEFAULT}
						view={getCategoryStyle(selectedCategory)}
					/>
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
