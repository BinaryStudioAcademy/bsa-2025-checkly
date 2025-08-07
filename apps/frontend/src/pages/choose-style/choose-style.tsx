import React, { useCallback, useState } from "react";
import { NavLink } from "react-router-dom";

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
import { AppRoute } from "~/libs/enums/enums.js";
import { getClassNames } from "~/libs/helpers/get-class-names.js";

import { styleCards } from "./choose-style.data.js";
import styles from "./style.module.css";

const ChooseStyle: React.FC = () => {
	const [selectedCard, setSelectedCard] = useState<null | string>("box-2");

	const handleCardClick = useCallback(
		(event: React.MouseEvent<HTMLButtonElement>): void => {
			setSelectedCard(event.currentTarget.dataset["card"] || null);
		},
		[],
	);

	return (
		<>
			<AppHeader />
			<section
				className={getClassNames(
					styles["choose-style-section"],
					"grid-pattern",
				)}
			>
				<div className={styles["nav"]}>
					<NavLink className={styles["nav-link"] ?? ""} to={AppRoute.DASHBOARD}>
						<button aria-label="Go back">
							<ArrowLeftIcon aria-hidden="true" />
						</button>
					</NavLink>
					<p>Choose the style</p>
				</div>
				<div className={styles["header-buttons"]}>
					<Button
						icon={<FileIcon aria-hidden="true" />}
						label="PDF"
						size="small"
					/>
					<Button
						disabled
						icon={<SmartphoneIcon aria-hidden="true" />}
						iconOnlySize="large"
						label="Mobile Wallpaper"
						size="small"
					/>
					<Button
						disabled
						icon={<MonitorIcon aria-hidden="true" />}
						label="Desktop Wallpaper"
						size="small"
					/>
				</div>
				<div
					aria-labelledby="card-text"
					className={styles["card-container"]}
					role="radiogroup"
				>
					{styleCards.map(({ id, img, label }) => (
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
							<img
								alt={label}
								aria-hidden="true"
								className={styles["card-image"]}
								src={img}
							/>
							<span className={styles["card-text"]}>{label}</span>
						</button>
					))}
				</div>
				<div className={styles["bottom-buttons"]}>
					<NavLink className={styles["nav-link"] ?? ""} to={AppRoute.ROOT}>
						<Button
							icon={<DownloadIcon aria-hidden="true" />}
							label="Download"
						/>
					</NavLink>
					<NavLink className={styles["nav-link"] ?? ""} to={AppRoute.DASHBOARD}>
						<Button
							icon={<ArrowLeftIcon aria-hidden="true" />}
							label="Back"
							variant="secondary"
						/>
					</NavLink>
				</div>
				<DecorativeImage className={styles["flower"] ?? ""} src={FlowerPink} />
				<DecorativeImage
					className={styles["stars"] ?? ""}
					src={StarsYellow02}
				/>
			</section>
		</>
	);
};

export { ChooseStyle };
