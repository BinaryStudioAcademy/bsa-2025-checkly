import { type JSX, useCallback } from "react";
import Select, { type SingleValue } from "react-select";

import { ZERO } from "./libs/enums/enums.js";
import { type ExecutionTimeTypeValue } from "./libs/types/types.js";
import { timeSelectStyles } from "./time-time-select-styles.js";

type TimeOption = {
	label: string;
	value: ExecutionTimeTypeValue;
};

const timeOptions: TimeOption[] = [
	{ label: "Morning", value: "morning" },
	{ label: "Afternoon", value: "afternoon" },
	{ label: "Evening", value: "evening" },
];

type TimeSelectorProperties = {
	currentTime: ExecutionTimeTypeValue;
	onTimeChange: (newTime: ExecutionTimeTypeValue) => void;
};

const TaskTimeSelector = ({
	currentTime,
	onTimeChange,
}: TimeSelectorProperties): JSX.Element => {
	const selectedOption =
		timeOptions.find((option) => option.value === currentTime) ||
		timeOptions[ZERO];

	const handleTimeChange = useCallback(
		(selectedOption: SingleValue<TimeOption>) => {
			const newTimeType = selectedOption?.value || currentTime;
			onTimeChange(newTimeType);
		},
		[currentTime, onTimeChange],
	);

	return (
		<Select
			isClearable={false}
			isSearchable={false}
			onChange={handleTimeChange}
			options={timeOptions}
			placeholder="Select time..."
			styles={timeSelectStyles}
			value={selectedOption}
		/>
	);
};

export { TaskTimeSelector };
