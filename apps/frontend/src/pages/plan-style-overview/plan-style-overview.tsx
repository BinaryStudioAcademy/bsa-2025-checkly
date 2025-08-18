import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { StarsYellow02 } from "~/assets/img/shared/shapes/shapes.img.js";
import { arrowBackIcon } from "~/assets/img/shared/shared.img.js";
import { AppHeader, DecorativeImage } from "~/libs/components/components.js";
import { PlanStyle } from "~/libs/components/plan-styles/plan-style/plan-style.js";
import { getCategoryName, MESSAGES } from "~/libs/constants/constants.js";
import { AppRoute, PlanCategoryId } from "~/libs/enums/enums.js";
import { getClassNames } from "~/libs/helpers/helpers.js";
import { usePlanCategory } from "~/libs/hooks/hooks.js";
import { notifications } from "~/libs/modules/notifications/notifications.js";

import { PlanActions, PlanStyleCategory } from "./components/components.js";
import { downloadPlan } from "./lib/services/pdf-export.service.js";
import styles from "./styles.module.css";

const CATEGORIES = [
	PlanCategoryId.PDF,
	PlanCategoryId.MOBILE,
	PlanCategoryId.DESKTOP,
] as const;

const PlanStyleOverview: React.FC = () => {
	const navigate = useNavigate();
	const { handleCategorySelect, selectedCategory } = usePlanCategory(
		PlanCategoryId.PDF,
	);

	const selectedCategoryName = getCategoryName(selectedCategory);

	const handleEditPlan = useCallback((): void => {
		notifications.info(MESSAGES.FEATURE.NOT_IMPLEMENTED);
	}, []);

	const handleDownloadPlan = useCallback((): void => {
		void downloadPlan(selectedCategory);
	}, [selectedCategory]);

	const handleGoBack = useCallback(() => {
		const result = navigate(AppRoute.PLAN);

		if (result instanceof Promise) {
			result.catch(() => {
				notifications.error(MESSAGES.NAVIGATION.FAILED);
			});
		}
	}, [navigate]);

	return (
		<>
			<AppHeader />
			<div className={styles["header-section"]}>
				<button
					aria-label="Go back"
					className={styles["back-button"]}
					onClick={handleGoBack}
					type="button"
				>
					<img alt="Back" className={styles["back-icon"]} src={arrowBackIcon} />
				</button>

				<PlanStyleCategory
					categories={CATEGORIES}
					onCategorySelect={handleCategorySelect}
					selectedCategory={selectedCategory}
				/>
			</div>
			<div className={getClassNames(styles["container"], "grid-pattern")}>
				<div className={styles["plan-content"]}>
					{selectedCategory === PlanCategoryId.PDF ? (
						<>
							<PlanStyle inputStyle="withremarks" />
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
				<PlanActions onDownload={handleDownloadPlan} onEdit={handleEditPlan} />
			</div>
		</>
	);
};

export { PlanStyleOverview };
