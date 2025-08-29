import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { ArrowLeft, DownloadIcon } from "~/assets/img/icons/icons.js";
import {
	FlowerPink,
	StarsYellow02,
} from "~/assets/img/shared/shapes/shapes.img.js";
import {
	AppHeader,
	Button,
	DecorativeImage,
	Link,
} from "~/libs/components/components.js";
import { NOTES_PLAN_TEMPLATE } from "~/libs/components/plan-styles/mocks/plan-mocks.js";
import { PlanStyle } from "~/libs/components/plan-styles/plan-style/plan-style.js";
import { AppRoute } from "~/libs/enums/enums.js";
import { getClassNames } from "~/libs/helpers/get-class-names.js";
import { useCallback } from "~/libs/hooks/hooks.js";
import { useAppDispatch } from "~/libs/hooks/use-app-dispatch/use-app-dispatch.hook.js";
import { useAppSelector } from "~/libs/hooks/use-app-selector/use-app-selector.hook.js";
import { notifications } from "~/libs/modules/notifications/notifications.js";
import { type ViewOptions } from "~/libs/types/types.js";
import { usePlanStyles } from "~/modules/plan-styles/hooks/use-plan-styles.hook.js";
import { PlanStyle as PlanStyleEnum } from "~/modules/plan-styles/libs/enums/enums.js";
import { type PlanWithCategoryDto } from "~/modules/plans/libs/types/types.js";
import { actions as planActions, planApi } from "~/modules/plans/plans.js";

import { styleCards } from "./choose-style.data.js";
import { CHOOSE_STYLE_MESSAGES } from "./libs/constants/choose-style.constants.js";
import { type StyleValidationResult } from "./libs/types/types.js";
import styles from "./style.module.css";

const PRESELECTED_ELEMENT_INDEX = 1;
const PLAN_VIEW_OPTION: ViewOptions = "selection";

const ChooseStyle: React.FC = () => {
	const plan = useAppSelector((state) => state.plan.plan);
	const { styles: planStyles } = usePlanStyles();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [selectedCard, setSelectedCard] = useState<null | string>(
		styleCards[PRESELECTED_ELEMENT_INDEX]?.id ?? null,
	);
	const [isSaving, setIsSaving] = useState<boolean>(false);

	const handleGetStyleId = useCallback(
		(styleName: string): number => {
			const style = planStyles.find((s) => s.name === styleName);

			return style?.id ?? PlanStyleEnum.WITH_REMARKS;
		},
		[planStyles],
	);

	const handleStyleValidation = useCallback((): StyleValidationResult => {
		if (!plan?.id || !selectedCard) {
			notifications.error(CHOOSE_STYLE_MESSAGES.SELECT_STYLE_AND_PLAN_ID);

			return null;
		}

		const selectedStyle = styleCards.find((card) => card.id === selectedCard);

		if (!selectedStyle) {
			notifications.error(CHOOSE_STYLE_MESSAGES.INVALID_STYLE_SELECTION);

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
			await dispatch(planActions.getPlan());
			notifications.success(CHOOSE_STYLE_MESSAGES.PLAN_STYLE_UPDATED_SUCCESS);
			void navigate(AppRoute.OVERVIEW_PAGE);
		} catch {
			notifications.error(CHOOSE_STYLE_MESSAGES.FAILED_TO_UPDATE_PLAN_STYLE);
		} finally {
			setIsSaving(false);
		}
	}, [handleStyleValidation, dispatch, navigate]);

	const handleSaveStyleClick = useCallback((): void => {
		void handleSaveStyle();
	}, [handleSaveStyle]);

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
					<Link tabindex={-1} to={AppRoute.OVERVIEW_PAGE}>
						<Button
							icon={<ArrowLeft />}
							iconOnlySize="small"
							isIconOnly
							label="Back to the previous page"
							size="small"
						/>
						<span className="visually-hidden">Back to the previous page</span>
					</Link>
					<p className={styles["nav-title"]}>Choose the style</p>
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
							<PlanStyle
								inputStyle={planStyle}
								notes={NOTES_PLAN_TEMPLATE}
								plan={plan as PlanWithCategoryDto}
								view={PLAN_VIEW_OPTION}
							/>
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
