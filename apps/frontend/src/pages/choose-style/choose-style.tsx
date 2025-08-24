import React, { useCallback, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

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
import { NOTES_PLAN_TEMPLATE } from "~/libs/components/plan-styles/mocks/plan-mocks.js";
import { PlanStyle } from "~/libs/components/plan-styles/plan-style/plan-style.js";
import { AppRoute } from "~/libs/enums/enums.js";
import { getClassNames } from "~/libs/helpers/get-class-names.js";
import { useAppDispatch } from "~/libs/hooks/use-app-dispatch/use-app-dispatch.hook.js";
import { type ViewOptions } from "~/libs/types/types.js";
import { actions } from "~/modules/plans/slices/plan.slice.js";

import { styleCards } from "./choose-style.data.js";
import styles from "./style.module.css";

const PRESELECTED_ELEMENT = 1;
const PLAN_VIEW_OPTION: ViewOptions = "selection";

const ChooseStyle: React.FC = () => {
	const [selectedCard, setSelectedCard] = useState<null | string>(
		styleCards[PRESELECTED_ELEMENT]?.id ?? null,
	);
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const handleCardClick = useCallback(
		(event: React.MouseEvent<HTMLButtonElement>): void => {
			setSelectedCard(event.currentTarget.dataset["card"] ?? null);
		},
		[],
	);

	const handleSaveStyle = useCallback((): void => {
		const selectedStyleCard = styleCards.find(
			(card) => card.id === selectedCard,
		);

		if (selectedStyleCard) {
			dispatch(actions.setSelectedStyle(selectedStyleCard.planStyle));
			void navigate(AppRoute.OVERVIEW_PAGE);
		}
	}, [selectedCard, dispatch, navigate]);

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
							<PlanStyle
								inputStyle={planStyle}
								notes={NOTES_PLAN_TEMPLATE}
								view={PLAN_VIEW_OPTION}
							/>
							<span className={styles["card-text"]}>{label}</span>
						</button>
					))}
				</div>
				<div className={styles["bottom-buttons"]}>
					<Button
						icon={<DownloadIcon aria-hidden="true" />}
						label="Save"
						onClick={handleSaveStyle}
						variant="primary"
					/>
				</div>
				<DecorativeImage className={styles["flower"]} src={FlowerPink} />
				<DecorativeImage className={styles["stars"]} src={StarsYellow02} />
			</section>
		</>
	);
};

export { ChooseStyle };
