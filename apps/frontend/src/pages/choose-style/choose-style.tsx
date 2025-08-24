import React, { useState } from "react";
import { NavLink, useParams } from "react-router-dom";
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
import { AppRoute } from "~/libs/enums/enums.js";
import { getClassNames } from "~/libs/helpers/get-class-names.js";
import { useCallback } from "~/libs/hooks/hooks.js";
import { type ViewOptions } from "~/libs/types/types.js";
import { usePlanStyles } from "~/modules/plan-styles/hooks/use-plan-styles.hook.js";
import { PlanStyle as PlanStyleEnum } from "~/modules/plan-styles/libs/enums/enums.js";
import { planApi } from "~/modules/plans/plans.js";

import { styleCards } from "./choose-style.data.js";
import { CHOOSE_STYLE_MESSAGES } from "./libs/constants/choose-style.constants.js";
import { type StyleValidationResult } from "./libs/types/types.js";
import styles from "./style.module.css";

const PRESELECTED_ELEMENT_INDEX = 1;
const PLAN_VIEW_OPTION: ViewOptions = "selection";

const updatePlanStyle = async (
	planId: number,
	styleId: number,
): Promise<void> => {
	await planApi.updateStyle(planId, styleId);
	toast.success(CHOOSE_STYLE_MESSAGES.PLAN_STYLE_UPDATED_SUCCESS);
};

const ChooseStyle: React.FC = () => {
	const { id: planId } = useParams<{ id: string }>();
	const { styles: planStyles } = usePlanStyles();
	const [selectedCard, setSelectedCard] = useState<null | string>(
		styleCards[PRESELECTED_ELEMENT_INDEX]?.id ?? null,
	);
	const [isSaving, setIsSaving] = useState<boolean>(false);

	const getStyleId = useCallback((styleName: string): number => {
		const style = planStyles.find((s) => s.name === styleName);

		return style?.id ?? PlanStyleEnum.WITH_REMARKS;
	}, [planStyles]);

	const validateAndGetStyle = useCallback((): StyleValidationResult => {
		if (!planId || !selectedCard) {
			toast.error(CHOOSE_STYLE_MESSAGES.SELECT_STYLE_AND_PLAN_ID);

			return null;
		}

		const selectedStyle = styleCards.find((card) => card.id === selectedCard);

		if (!selectedStyle) {
			toast.error(CHOOSE_STYLE_MESSAGES.INVALID_STYLE_SELECTION);

			return null;
		}

		const styleId = getStyleId(selectedStyle.planStyle);

		return { planId: Number(planId), styleId };
	}, [planId, selectedCard, getStyleId]);

	const handleCardClick = useCallback(
		(event: React.MouseEvent<HTMLButtonElement>): void => {
			setSelectedCard(event.currentTarget.dataset["card"] ?? null);
		},
		[],
	);

	const handleSaveStyle = useCallback(async (): Promise<void> => {
		const validation = validateAndGetStyle();
		
		if (!validation) {
			return;
		}

		setIsSaving(true);
		
		try {
			await updatePlanStyle(validation.planId, validation.styleId);
		} catch {
			toast.error(CHOOSE_STYLE_MESSAGES.FAILED_TO_UPDATE_PLAN_STYLE);
		} finally {
			setIsSaving(false);
		}
	}, [validateAndGetStyle]);

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
					<NavLink className={navLink} to={AppRoute.PLAN}>
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
						isDisabled={isSaving || !selectedCard}
						label={isSaving ? "Saving..." : "Save Style"}
						onClick={handleSaveStyleClick}
					/>
					<NavLink className={navLink} to={AppRoute.PLAN}>
						<Button
							className={styles["bottom-back-button"]}
							icon={<ArrowLeftIcon aria-hidden="true" />}
							label="Back"
							variant="secondary"
						/>
					</NavLink>
				</div>
				<DecorativeImage className={styles["flower"]} src={FlowerPink} />
				<DecorativeImage className={styles["stars"]} src={StarsYellow02} />
			</section>
		</>
	);
};

export { ChooseStyle };
