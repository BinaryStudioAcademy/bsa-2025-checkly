import React from "react";
import { type PlanDaysTaskDto } from "shared";

import { DEFAULT_DAY_AMOUNT } from "../../libs/constants/constants.js";
import { Day } from "../day/day.js";
import { DaySkeleton } from "../skeleton/skeleton.js";

type Properties = {
	isOpen: boolean;
	onRegenerate: (index: number) => void;
	plan: null | PlanDaysTaskDto;
	selectedDay: number;
	setIsOpen: (index: boolean) => void;
	setSelectedDay: (index: number) => void;
};

const DayList: React.FC<Properties> = ({
	isOpen,
	onRegenerate,
	plan,
	selectedDay,
	setIsOpen,
	setSelectedDay,
}) => {
	if (!plan) {
		return (
			<>
				{Array.from({ length: DEFAULT_DAY_AMOUNT }).map((_, index) => (
					<DaySkeleton index={index} key={index} />
				))}
			</>
		);
	}

	return (
		<>
			{plan.days.map((item, index) => (
				<Day
					index={index}
					isOpen={isOpen}
					item={item}
					key={index}
					onRegenerate={onRegenerate}
					selectedDay={selectedDay}
					setIsOpen={setIsOpen}
					setSelectedDay={setSelectedDay}
				/>
			))}
		</>
	);
};

export { DayList };
