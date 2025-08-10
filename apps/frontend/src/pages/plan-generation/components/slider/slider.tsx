import { useEffect, useState } from "react";

import { DecorativeImage } from "~/libs/components/components.js";
import { getClassNames } from "~/libs/helpers/helpers.js";

import {
	SLIDE_DURATION_MS,
	SLIDE_INCREMENT,
	SLIDE_INTERVAL_MS,
	SLIDE_START_INDEX,
} from "./libs/constants/constants.js";
import styles from "./styles.module.css";

type Properties = {
	slides: string[];
};

const ImageSlider: React.FC<Properties> = ({ slides }) => {
	const [currentIndex, setCurrentIndex] = useState<number>(SLIDE_START_INDEX);
	const [nextIndex, setNextIndex] = useState<null | number>(null);
	const [isSliding, setIsSliding] = useState<boolean>(false);

	useEffect(() => {
		const interval = setInterval(() => {
			if (isSliding) {
				return;
			}

			const newIndex = (currentIndex + SLIDE_INCREMENT) % slides.length;
			setNextIndex(newIndex);
			setIsSliding(true);

			setTimeout(() => {
				setCurrentIndex(newIndex);
				setNextIndex(null);
				setIsSliding(false);
			}, SLIDE_DURATION_MS);
		}, SLIDE_INTERVAL_MS);

		return (): void => {
			clearInterval(interval);
		};
	}, [currentIndex, isSliding, slides]);

	const currentClasses = getClassNames(
		styles["slide"],
		styles["current"],
		isSliding ? styles["slide-out-right"] : "",
		styles["slide-image"],
	);

	const nextClasses = getClassNames(
		styles["slide"],
		styles["next"],
		styles["slide-in-left"],
		styles["slide-image"],
	);

	return (
		<div className={styles["slider-container"]}>
			<DecorativeImage
				className={currentClasses}
				src={slides[currentIndex] ?? ""}
			/>
			{nextIndex && (
				<DecorativeImage
					className={nextClasses}
					src={slides[currentIndex] ?? ""}
				/>
			)}
		</div>
	);
};

export { ImageSlider };
