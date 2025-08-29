import { type GroupBase, type StylesConfig } from "react-select";
import { type ExecutionTimeTypeValue } from "shared";

type TimeOption = {
	label: string;
	value: ExecutionTimeTypeValue;
};

const selectStyles: StylesConfig<TimeOption, false, GroupBase<TimeOption>> = {
	control: (provided, state) => ({
		...provided,
		"&:hover": {
			borderColor: "var(--color-bg-dark)",
		},
		border: "2px solid var(--color-bg-dark)",
		borderRadius: "var(--radius-s)",
		boxShadow: state.isFocused ? "0 0 0 4px var(--color-brand-muted)" : "none",
		cursor: "pointer",
		fontFamily: "inherit",
		fontSize: "var(--text-body)",
		fontWeight: "var(--font-weight-body-small)",
		minHeight: "auto",
		minWidth: "7rem",
		padding: "0",
		transition: "all 0.15s cubic-bezier(0.4, 0, 0.2, 1)",
	}),
	dropdownIndicator: (provided) => ({
		...provided,
		"&:hover": {
			color: "var(--color-text-primary)",
		},
		color: "var(--color-bg-dark)",
		padding: "0 var(--space-2xs)",
		width: "auto",
	}),
	indicatorSeparator: () => ({
		display: "none",
	}),
	menu: (provided) => ({
		...provided,
		backgroundColor: "var(--color-bg-light)",
		borderRadius: "var(--radius-s)",
		fontFamily: "inherit",
		fontSize: "var(--text-body)",
		fontWeight: "var(--font-weight-body-small)",
		marginTop: "2px",
		zIndex: 999_999,
	}),
	option: (provided, state) => {
		const getBackgroundColor = (): string => {
			if (state.isSelected) {
				return "var(--color-brand-muted)";
			} else if (state.isFocused) {
				return "var(--color-card-gray)";
			}

			return "transparent";
		};

		return {
			...provided,
			backgroundColor: getBackgroundColor(),
			color: "inherit",
			cursor: "pointer",
			fontFamily: "inherit",
			fontSize: "var(--text-body)",
			fontWeight: "var(--font-weight-body-small)",
			padding: "var(--space-xs) var(--space-s)",
		};
	},
	singleValue: (provided) => ({
		...provided,
		color: "inherit",
		fontFamily: "inherit",
		fontSize: "var(--text-body)",
		fontWeight: "var(--font-weight-body-small)",
	}),
	valueContainer: (provided) => ({
		...provided,
		padding: "var(--space-xs) var(--space-s)",
	}),
};

export { selectStyles };
