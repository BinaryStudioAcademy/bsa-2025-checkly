import { type FC } from "react";
import Select, { type SingleValue } from "react-select";

import { type CategoryOption } from "../../libs/types/types.js";
import { planCategorySelectStyles } from "./libs/enums/enums.js";

type Properties = {
	className?: string;
	onChange: (selectedOption: SingleValue<CategoryOption>) => void;
	options: CategoryOption[];
	placeholder?: string;
	value?: CategoryOption;
};

const PlanCategorySelect: FC<Properties> = ({
	className = "",
	onChange,
	options,
	placeholder = "Select category",
	value,
}: Properties) => {
	return (
		<div className={className}>
			<label htmlFor="category-select">Select category:</label>
			<Select
				inputId="category-select"
				isClearable={false}
				isSearchable={false}
				onChange={onChange}
				options={options}
				placeholder={placeholder}
				styles={planCategorySelectStyles}
				value={value}
			/>
		</div>
	);
};

export { PlanCategorySelect };
