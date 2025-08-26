import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
	ArrowLeftIcon,
	DownloadIcon,
	FileIcon,
	MonitorIcon,
	SmartphoneIcon,
} from "~/assets/img/icons/icons.js";
import {
	FlowerPink,
	StarsYellow02,
} from "~/assets/img/shared/shapes/shapes.img.js";
import {
	AppHeader,
	Button,
	DecorativeImage,
} from "~/libs/components/components.js";
import { PlanStyle } from "~/libs/components/plan-styles/plan-style/plan-style.js";
import { ZERO } from "~/libs/constants/constants.js";
import { AppRoute } from "~/libs/enums/enums.js";
import { getClassNames } from "~/libs/helpers/get-class-names.js";
import { useCallback } from "~/libs/hooks/hooks.js";
import { useAppDispatch } from "~/libs/hooks/use-app-dispatch/use-app-dispatch.hook.js";
import { useAppSelector } from "~/libs/hooks/use-app-selector/use-app-selector.hook.js";
import { type ViewOptions } from "~/libs/types/types.js";
import { usePlanStyles } from "~/modules/plan-styles/hooks/use-plan-styles.hook.js";
import { PlanStyle as PlanStyleEnum } from "~/modules/plan-styles/libs/enums/enums.js";
import { actions as planActions, planApi } from "~/modules/plans/plans.js";
import { actions as planSliceActions } from "~/modules/plans/slices/plan.slice.js";

import { styleCards } from "./choose-style.data.js";
import { CHOOSE_STYLE_MESSAGES } from "./libs/constants/choose-style.constants.js";
import { type StyleValidationResult } from "./libs/types/types.js";
import styles from "./style.module.css";

const PRESELECTED_ELEMENT_INDEX = 1;
const PLAN_VIEW_OPTION: ViewOptions = "selection";

const ChooseStyle: React.FC = () => {
	const plan = useAppSelector((state) => state.plan.plan);
	const user = useAppSelector((state) => state.auth.user);
	const userPlans = useAppSelector((state) => state.plan.userPlans);
	const { styles: planStyles } = usePlanStyles();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [selectedCard, setSelectedCard] = useState<null | string>(
		styleCards[PRESELECTED_ELEMENT_INDEX]?.id ?? null,
	);
	const [isSaving, setIsSaving] = useState<boolean>(false);

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

	const handleGetStyleId = useCallback(
		(styleName: string): number => {
			const style = planStyles.find((s) => s.name === styleName);

			return style?.id ?? PlanStyleEnum.WITH_REMARKS;
		},
		[planStyles],
	);

	const handleStyleValidation = useCallback((): StyleValidationResult => {
		if (!plan?.id || !selectedCard) {
			toast.error(CHOOSE_STYLE_MESSAGES.SELECT_STYLE_AND_PLAN_ID);

			return null;
		}

		const selectedStyle = styleCards.find((card) => card.id === selectedCard);

		if (!selectedStyle) {
			toast.error(CHOOSE_STYLE_MESSAGES.INVALID_STYLE_SELECTION);

			return null;
		}

		const styleId = handleGetStyleId(selectedStyle.planStyle);

		return { planId: plan.id, styleId };
	}, [plan, selectedCard, handleGetStyleId]);

	const handleCardClick = useCallback(
		(event: React.MouseEvent<HTMLButtonElement>): void => {
			setSelectedCard(event.currentTarget.dataset["card"] ?? null);
		},
		[],
	);

	const handleSaveStyle = useCallback(async (): Promise<void> => {
		const validation = handleStyleValidation();

		if (!validation) {
			return;
		}

		setIsSaving(true);

		try {
			await planApi.updateStyle(validation.planId, validation.styleId);
			await dispatch(planActions.getAllUserPlans());
			toast.success(CHOOSE_STYLE_MESSAGES.PLAN_STYLE_UPDATED_SUCCESS);
			void navigate(AppRoute.OVERVIEW_PAGE);
		} catch {
			toast.error(CHOOSE_STYLE_MESSAGES.FAILED_TO_UPDATE_PLAN_STYLE);
		} finally {
			setIsSaving(false);
		}
	}, [handleStyleValidation, dispatch, navigate]);

	const handleSaveStyleClick = useCallback((): void => {
		void handleSaveStyle();
	}, [handleSaveStyle]);

	const navLink = getClassNames(styles["nav-link"]);

	return (
		<>
			<AppHeader />
			<section
				className={getClassNames(
					styles["choose-style-wrapper"],
					styles["choose-style-section"],
					"grid-pattern",
				)}
			>
				<div className={styles["nav"]}>
					<NavLink className={navLink} to={AppRoute.OVERVIEW_PAGE}>
						<button aria-label="Go back" className={styles["nav-back-button"]}>
							<ArrowLeftIcon aria-hidden="true" />
						</button>
					</NavLink>
					<p className={styles["nav-title"]}>Choose the style</p>
				</div>
				<div className={styles["header-buttons"]}>
					<Button
						className={styles["header-buttons-button"]}
						icon={<FileIcon aria-hidden="true" />}
						label="PDF"
						size="small"
					/>
					<Button
						className={styles["header-buttons-button"]}
						icon={<SmartphoneIcon aria-hidden="true" />}
						iconOnlySize="large"
						isDisabled
						label="Mobile Wallpaper"
						size="small"
					/>
					<Button
						className={styles["header-buttons-button"]}
						icon={<MonitorIcon aria-hidden="true" />}
						isDisabled
						label="Desktop Wallpaper"
						size="small"
					/>
				</div>
				<div
					aria-labelledby="card-text"
					className={styles["card-container"]}
					role="radiogroup"
				>
					{styleCards.map(({ id, label, planStyle }) => (
						<button
							aria-checked={selectedCard === id}
							className={getClassNames(
								styles["card"],
								styles[id],
								selectedCard === id && styles["selected"],
							)}
							data-card={id}
							key={id}
							onClick={handleCardClick}
							role="radio"
							type="button"
						>
							<PlanStyle inputStyle={planStyle} view={PLAN_VIEW_OPTION} />
							<span className={styles["card-text"]}>{label}</span>
						</button>
					))}
				</div>
				<div className={styles["bottom-buttons"]}>
					<Button
						className={styles["bottom-download-button"]}
						icon={<DownloadIcon aria-hidden="true" />}
						isDisabled={isSaving || !selectedCard || !plan?.id}
						label={isSaving ? "Saving..." : "Save Style"}
						onClick={handleSaveStyleClick}
					/>
				</div>
				<DecorativeImage className={styles["flower"]} src={FlowerPink} />
				<DecorativeImage className={styles["stars"]} src={StarsYellow02} />
			</section>
		</>
	);
};

export { ChooseStyle };
