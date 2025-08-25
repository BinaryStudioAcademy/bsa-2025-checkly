import { useCallback } from "react";

import { Regenerate } from "~/assets/img/icons/icons.js";
import { ArrowBold } from "~/assets/img/shared/shapes/shapes.img.js";
import { Button, DecorativeImage } from "~/libs/components/components.js";
import { getClassNames } from "~/libs/helpers/helpers.js";

import { type PlanDayDto } from "../libs/types/types.js";
import styles from "./styles.module.css";

type Properties = {
	index: number;
	isOpen: boolean;
	item: PlanDayDto;
	onRegenerate: (index: number) => void;
	selectedDay: number;
	setIsOpen: (index: boolean) => void;
	setSelectedDay: (index: number) => void;
};

const Day: React.FC<Properties> = ({
	index,
	isOpen,
	item,
	onRegenerate,
	selectedDay,
	setIsOpen,
	setSelectedDay,
}: Properties) => {
	const { dayNumber, id } = item;

	const handleDay = useCallback((): void => {
		setSelectedDay(index);

		if (isOpen) {
			setIsOpen(false);
		}
	}, [index, isOpen, setIsOpen, setSelectedDay]);

	const handleRegenerate = useCallback(() => {
		onRegenerate(id);
	}, [id, onRegenerate]);

	return (
		<div className={styles["content__days-item"]}>
			<div className={getClassNames(styles["regenerate-button"])}>
				{selectedDay === index && (
					<Button
						icon={<DecorativeImage src={Regenerate} />}
						isIconOnly
						label=""
						onClick={handleRegenerate}
					/>
				)}
			</div>
			<Button
				className={getClassNames(
					styles["content__days__day"],
					index === selectedDay ? styles["content__days__active-day"] : "",
				)}
				label={`Day ${String(dayNumber)}`}
				onClick={handleDay}
				variant="transparent"
			/>
			<div className={styles["selectedDay-icon"]}>
				{selectedDay === index && <img alt="Arrow" src={ArrowBold} />}
			</div>
		</div>
	);
};

export { Day };
