import { useCallback } from "react";

import { Regenerate } from "~/assets/img/icons/icons.js";
import { ArrowBold } from "~/assets/img/shared/shapes/shapes.img.js";
import { Button, DecorativeImage } from "~/libs/components/components.js";
import { ONE } from "~/libs/constants/constants.js";
import { getClassNames } from "~/libs/helpers/helpers.js";

import styles from "./styles.module.css";

type Properties = {
	indexDay: number;
	isOpen: boolean;
	selectedDay: number;
	setIsOpen: (index: boolean) => void;
	setSelectedDay: (index: number) => void;
};

const Day: React.FC<Properties> = ({
	indexDay,
	isOpen,
	selectedDay,
	setIsOpen,
	setSelectedDay,
}: Properties) => {
	const handleDay = useCallback((): void => {
		setSelectedDay(indexDay);

		if (isOpen) {
			setIsOpen(false);
		}
	}, [indexDay, isOpen, setIsOpen, setSelectedDay]);

	return (
		<div className={styles["content__days-item"]} key={indexDay}>
			<div className={getClassNames(styles["regenerate-button"])}>
				{selectedDay === indexDay && (
					<Button
						icon={<DecorativeImage src={Regenerate} />}
						isIconOnly
						label=""
					/>
				)}
			</div>
			<Button
				className={getClassNames(
					styles["content__days__day"],
					indexDay === selectedDay ? styles["content__days__active-day"] : "",
				)}
				label={`Day ${String(indexDay + ONE)}`}
				onClick={handleDay}
				variant="transparent"
			/>
			<div className={styles["selectedDay-icon"]}>
				{selectedDay === indexDay && <img alt="Arrow" src={ArrowBold} />}
			</div>
		</div>
	);
};

export { Day };
