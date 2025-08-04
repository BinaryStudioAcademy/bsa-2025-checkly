import { useCallback } from "react";

import { arrow, x } from "~/assets/img/dashboard/dashboard.img.js";
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
			<button
				className={getClassNames(
					styles["content__days__day"],
					indexDay === selectedDay ? styles["content__days__active-day"] : "",
				)}
				onClick={handleDay}
			>
				Day {indexDay + ONE}
			</button>
			{selectedDay === indexDay ? (
				<img alt="" className={styles["selectedDay-icon"]} src={arrow} />
			) : (
				<button>
					<img alt="" className={styles["remove-button"]} src={x} />
				</button>
			)}
		</div>
	);
};

export { Day };
