import React, { useCallback, useEffect, useState } from "react";

import { DecorativeImage } from "~/libs/components/components.js";
import { getClassNames } from "~/libs/helpers/helpers.js";

import { SlideIndexing, SlideTiming } from "./libs/constants/constants.js";
import styles from "./styles.module.css";

type Properties = {
	slides: string[];
};

const ImageSlider: React.FC<Properties> = ({ slides }) => {
	const [currentIndex, setCurrentIndex] = useState<number>(
		SlideIndexing.START_INDEX,
	);
	const [nextIndex, setNextIndex] = useState<null | number>(null);
	const [isSliding, setIsSliding] = useState<boolean>(false);

	const startSlideTransition = useCallback((): void => {
		if (isSliding) {
			return;
		}

		const newIndex = (currentIndex + SlideIndexing.INCREMENT) % slides.length;
		setNextIndex(newIndex);
		setIsSliding(true);

		setTimeout(() => {
			setCurrentIndex(newIndex);
			setNextIndex(null);
			setIsSliding(false);
		}, SlideTiming.DURATION_MS);
	}, [currentIndex, isSliding, slides]);

	useEffect(() => {
		const slideId = setInterval(startSlideTransition, SlideTiming.INTERVAL_MS);

		return (): void => {
			clearInterval(slideId);
		};
	}, [startSlideTransition]);

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
			{nextIndex !== null && (
				<DecorativeImage
					className={nextClasses}
					src={slides[nextIndex] ?? ""}
				/>
			)}
		</div>
	);
};

export { ImageSlider };
