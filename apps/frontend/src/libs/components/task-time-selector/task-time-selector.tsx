import { type JSX, useCallback } from "react";
import Select, {
	type GroupBase,
	type SingleValue,
	type StylesConfig,
} from "react-select";

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
	inputId?: string;
	onTimeChange: (newTime: ExecutionTimeTypeValue) => void;
	selectStyles?: StylesConfig<TimeOption, false, GroupBase<TimeOption>>;
};

const TaskTimeSelector = ({
	currentTime,
	inputId = "time-select",
	onTimeChange,
	selectStyles = timeSelectStyles,
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
			inputId={inputId}
			isClearable={false}
			isSearchable={false}
			onChange={handleTimeChange}
			options={timeOptions}
			placeholder="Select time..."
			styles={selectStyles}
			value={selectedOption}
		/>
	);
};

export { TaskTimeSelector };
