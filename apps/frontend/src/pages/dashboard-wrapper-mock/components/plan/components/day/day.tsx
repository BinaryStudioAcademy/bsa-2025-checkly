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
	onChangeIsOpen: (index: boolean) => void;
	onChangeSelectedDay: (index: number) => void;
	selectedDay: number;
};

const Day: React.FC<Properties> = ({
	indexDay,
	isOpen,
	onChangeIsOpen,
	onChangeSelectedDay,
	selectedDay,
}: Properties) => {
	const handleDay = useCallback((): void => {
		onChangeSelectedDay(indexDay);

		if (isOpen) {
			onChangeIsOpen(false);
		}
	}, [indexDay, isOpen, onChangeIsOpen, onChangeSelectedDay]);

	return (
		<div className={styles["content__days-item"]} key={indexDay}>
			<div className={getClassNames(styles["regenerate-button"])}>
				{selectedDay === indexDay && (
					<Button
						icon={<DecorativeImage src={Regenerate} />}
						isIconOnly
						label="Regenerate day"
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
