import { useCallback, useState } from "react";

import { Regenerate } from "~/assets/img/icons/icons.js";
import { ArrowBold } from "~/assets/img/shared/shapes/shapes.img.js";
import {
	Button,
	ConfirmationModal,
	DecorativeImage,
} from "~/libs/components/components.js";
import { getClassNames } from "~/libs/helpers/helpers.js";

import { MODAL_MESSAGES } from "../../libs/constants/constants.js";
import { type PlanDayDto } from "../../libs/types/types.js";
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
	const [isRegenerateDayModalOpen, setIsRegenerateDayModalOpen] =
		useState<boolean>(false);

	const handleDay = useCallback((): void => {
		setSelectedDay(index);

		if (isOpen) {
			setIsOpen(false);
		}
	}, [index, isOpen, setIsOpen, setSelectedDay]);

	const handleRegenerateClick = useCallback((): void => {
		setIsRegenerateDayModalOpen(true);
	}, []);

	const handleRegenerateConfirm = useCallback((): void => {
		onRegenerate(id);
		setIsRegenerateDayModalOpen(false);
	}, [id, onRegenerate]);

	const handleRegenerateCancel = useCallback((): void => {
		setIsRegenerateDayModalOpen(false);
	}, []);

	return (
		<>
			<div className={styles["content__days-item"]}>
				<div className={getClassNames(styles["regenerate-button"])}>
					{selectedDay === index && (
						<Button
							icon={<DecorativeImage src={Regenerate} />}
							isIconOnly
							label="Regenerate day"
							onClick={handleRegenerateClick}
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
			<ConfirmationModal
				isOpen={isRegenerateDayModalOpen}
				message={MODAL_MESSAGES.DAY_REGENERATION}
				onCancel={handleRegenerateCancel}
				onConfirm={handleRegenerateConfirm}
				title="Day Regeneration"
			/>
		</>
	);
};

export { Day };
