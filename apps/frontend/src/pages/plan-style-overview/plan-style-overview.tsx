import { isFulfilled } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { StarsYellow02 } from "~/assets/img/shared/shapes/shapes.img.js";
import {
	AppHeader,
	Button,
	DecorativeImage,
	Loader,
	Modal,
} from "~/libs/components/components.js";
import { PlanStyle } from "~/libs/components/plan-styles/plan-style/plan-style.js";
import { getCategoryStyle, MESSAGES, ONE } from "~/libs/constants/constants.js";
import { AppRoute, DataStatus, PlanCategoryId } from "~/libs/enums/enums.js";
import { addDays, formatDateForInput } from "~/libs/helpers/date-helpers.js";
import { getClassNames } from "~/libs/helpers/helpers.js";
import { useCallback, usePlanCategory } from "~/libs/hooks/hooks.js";
import { useAppDispatch } from "~/libs/hooks/use-app-dispatch/use-app-dispatch.hook.js";
import { useAppSelector } from "~/libs/hooks/use-app-selector/use-app-selector.hook.js";
import { notifications } from "~/libs/modules/notifications/notifications.js";
import { type PlanStyleOption } from "~/libs/types/types.js";
import { actions as calendarExportActions } from "~/modules/calendar-export/slices/calendar-export.js";
import { actions as pdfActions } from "~/modules/pdf-export/slices/pdf-export.js";
import {
	DEFAULT_PLAN_STYLE,
	PLAN_STYLE_TO_READABLE,
} from "~/modules/plan-styles/libs/constants/plan-style.constants.js";
import { actions as planActions } from "~/modules/plans/plans.js";

import {
	PlanActions,
	PlanStyleCategory,
	ToastSuccess,
} from "./components/components.js";
import styles from "./styles.module.css";

const PlanStyleOverview: React.FC = () => {
	const user = useAppSelector((state) => state.auth.user);
	const currentPlan = useAppSelector(({ plan }) => plan.plan);
	const isAuthenticated = Boolean(user);
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { handleCategorySelect, selectedCategory } = usePlanCategory(
		PlanCategoryId.PDF,
	);

	const [isCalendarModalOpen, setIsCalendarModalOpen] =
		useState<boolean>(false);
	const planId = useAppSelector((state) => state.plan.plan?.id ?? null);
	const isCalendarDownloading = useAppSelector(
		(state) => state.calendarExport.isDownloading,
	);

	const handleGetStyleFromPlan = useCallback((): PlanStyleOption => {
		if (!currentPlan) {
			return DEFAULT_PLAN_STYLE;
		}

		const style =
			PLAN_STYLE_TO_READABLE[currentPlan.styleId] ?? DEFAULT_PLAN_STYLE;

		return style;
	}, [currentPlan]);

	const handleEditPlan = useCallback((): void => {
		void navigate(AppRoute.PLAN_EDIT);
	}, [navigate]);

	const pdfExportStatus = useAppSelector((state) => state.pdfExport.dataStatus);

	const handleGoToDashboard = useCallback((): void => {
		void navigate(AppRoute.DASHBOARD);
	}, [navigate]);

	const handleDownloadPlan = useCallback(async (): Promise<void> => {
		try {
			let resultAction;

			switch (selectedCategory) {
				case PlanCategoryId.DESKTOP: {
					resultAction = await dispatch(pdfActions.exportDesktopPng());
					break;
				}

				case PlanCategoryId.MOBILE: {
					resultAction = await dispatch(pdfActions.exportMobilePng());
					break;
				}

				default: {
					resultAction = await dispatch(
						pdfActions.exportPdf({ category: selectedCategory }),
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

	const handleOpenCalendarModal = useCallback((): void => {
		setIsCalendarModalOpen(true);
	}, []);

	const handleCloseCalendarModal = useCallback((): void => {
		setIsCalendarModalOpen(false);
	}, []);

	const handleConfirmCalendarDownload = useCallback((): void => {
		if (!planId) {
			notifications.error(MESSAGES.DOWNLOAD.FAILED);

			return;
		}

		const payload = {
			planId: String(planId),
			startDate: formatDateForInput(addDays(new Date(), ONE).toISOString()),
		};

		void dispatch(calendarExportActions.exportCalendar(payload)).then(() => {
			setIsCalendarModalOpen(false);
		});
	}, [dispatch, planId]);

	useEffect(() => {
		if (!currentPlan) {
			void dispatch(planActions.getPlan());
		}
	}, [currentPlan, dispatch]);

	if (!currentPlan) {
		return <Loader />;
	}

	return (
		<div className={getClassNames("grid-pattern", styles["page-container"])}>
			<AppHeader />
			<div className={styles["header-section"]}>
				<PlanStyleCategory
					actionButtonDisabled={isCalendarDownloading}
					actionButtonLabel="Calendar File"
					onActionButtonClick={handleOpenCalendarModal}
					onSelect={handleCategorySelect}
					selectedCategory={selectedCategory}
				/>
			</div>
			<div className="flow-loose-xl">
				<div className={getClassNames(styles["container"])}>
					<div className={getClassNames("wrapper", styles["plan-content"])}>
						<PlanStyle
							inputStyle={handleGetStyleFromPlan()}
							plan={currentPlan}
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
						handleConfirmCalendarDownload={handleOpenCalendarModal}
						isAuthenticated={isAuthenticated}
						isDownloading={pdfExportStatus === DataStatus.PENDING}
						onChooseStyle={handleChooseStyle}
						onDownload={handleDownload}
						onEdit={handleEditPlan}
						onGoToDashboard={handleGoToDashboard}
					/>
				</div>
			</div>

			<Modal
				isOpen={isCalendarModalOpen}
				onClose={handleCloseCalendarModal}
				title="Download Calendar File"
			>
				<p>
					An .ICS file will be downloaded to your computer. You can use this
					file to import your Checkly plan into the main electronic calendars
					(Google Calendar, Apple iCalendar, and Outlook).
				</p>
				<div className={styles["calendar-modal"]}>
					<Button
						label="Cancel"
						onClick={handleCloseCalendarModal}
						size="small"
						variant="secondary"
					/>
					<Button
						isDisabled={isCalendarDownloading}
						label="Download"
						onClick={handleConfirmCalendarDownload}
						size="small"
						variant="primary"
					/>
				</div>
			</Modal>
		</div>
	);
};

export { PlanStyleOverview };
