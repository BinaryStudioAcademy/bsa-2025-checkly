import { isFulfilled } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { StarsYellow02 } from "~/assets/img/shared/shapes/shapes.img.js";
import { AppHeader, DecorativeImage } from "~/libs/components/components.js";
import { PlanStyle } from "~/libs/components/plan-styles/plan-style/plan-style.js";
import { getCategoryName, MESSAGES, ZERO } from "~/libs/constants/constants.js";
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
	PLAN_STYLE_MAPPING,
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

	const selectedCategoryName = getCategoryName(selectedCategory);

	useEffect(() => {
		if (!plan && user) {
			void dispatch(planActions.getAllUserPlans());
		}
	}, [plan, user, dispatch]);

	useEffect(() => {
		if (userPlans.length > ZERO) {
			const maxId = Math.max(...userPlans.map((p) => p.id));
			const latestPlan = userPlans.find((p) => p.id === maxId);

			if (latestPlan) {
				dispatch(planSliceActions.setPlan(latestPlan));
			}
		}
	}, [userPlans, dispatch]);

	useEffect(() => {
		if (user) {
			void dispatch(planActions.getAllUserPlans());
		}
	}, [user, dispatch]);

	const getStyleFromPlan = (): PlanStyleOption => {
		if (!plan) {
			return DEFAULT_PLAN_STYLE;
		}

		const style = PLAN_STYLE_MAPPING[plan.styleId] ?? DEFAULT_PLAN_STYLE;

		return style;
	};

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
				<PlanStyleCategory
					categories={Object.values(PlanCategoryId).reverse()}
					onCategorySelect={handleCategorySelect}
					selectedCategory={selectedCategory}
				/>
			</div>
			<div className={getClassNames(styles["container"], "grid-pattern")}>
				<div className={styles["plan-content"]}>
					{selectedCategory === PlanCategoryId.PDF ? (
						<>
							<PlanStyle inputStyle={getStyleFromPlan()} />
							<DecorativeImage
								className={styles["yellow-stars-reflection"]}
								src={StarsYellow02}
							/>
						</>
					) : (
						<div className={styles["coming-soon"]}>
							<h2>Coming Soon</h2>
							<p>
								{selectedCategoryName} {MESSAGES.FEATURE.COMING_SOON}
							</p>
						</div>
					)}
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
