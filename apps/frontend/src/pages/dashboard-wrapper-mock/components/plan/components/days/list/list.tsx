import React from "react";
import { type PlanDaysTaskDto } from "shared";

import { type useLoadingIds } from "../../../libs/hooks/hooks.js";
import { DEFAULT_DAY_AMOUNT } from "../../libs/constants/constants.js";
import { Day } from "../day/day.js";
import { DaySkeleton } from "../skeleton/skeleton.js";

type Properties = {
	daysLoading: ReturnType<typeof useLoadingIds>;
	isOpen: boolean;
	onRegenerate: (index: number) => void;
	plan: null | PlanDaysTaskDto;
	planDaysNumber: null | number;
	selectedDay: number;
	setIsOpen: (index: boolean) => void;
	setSelectedDay: (index: number) => void;
};

const DayList: React.FC<Properties> = ({
	daysLoading,
	isOpen,
	onRegenerate,
	plan,
	planDaysNumber,
	selectedDay,
	setIsOpen,
	setSelectedDay,
}) => {
	if (!plan) {
		return (
			<>
				{Array.from({ length: planDaysNumber ?? DEFAULT_DAY_AMOUNT }).map(
					(_, index) => (
						<DaySkeleton index={index} key={index} />
					),
				)}
			</>
		);
	}

	return (
		<>
			{plan.days.map((item, index) => (
				<Day
					daysLoading={daysLoading}
					index={index}
					isOpen={isOpen}
					item={item}
					key={item.id}
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
