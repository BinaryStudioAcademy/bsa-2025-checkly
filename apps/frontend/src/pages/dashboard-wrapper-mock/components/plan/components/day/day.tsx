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
			<Button
				className={getClassNames(
					styles["content__days__day"],
					indexDay === selectedDay ? styles["content__days__active-day"] : "",
				)}
				label={`Day ${String(indexDay + ONE)}`}
				onClick={handleDay}
				variant="transparent"
			/>
			{selectedDay === indexDay ? (
				<img alt="" className={styles["selectedDay-icon"]} src={ArrowBold} />
			) : (
				<Button
					className={getClassNames(styles["regenerate-button"])}
					icon={<DecorativeImage src={Regenerate} />}
					isIconOnly
					label=""
				/>
			)}
		</div>
	);
};

export { Day };
