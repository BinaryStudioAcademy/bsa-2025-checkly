import { type FC } from "react";

import { Search } from "~/assets/img/icons/icons.js";

import styles from "./styles.module.css";

type Properties = {
	className?: string;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	placeholder?: string;
	value: string;
};

const PlanSearchInput: FC<Properties> = ({
	className = "",
	onChange,
	placeholder = "Enter plan title...",
	value,
}: Properties) => {
	return (
		<div className={className}>
			<label htmlFor="search-input">Search by title:</label>
			<div className={styles["search-input-container"]}>
				<input
					className={styles["search-input"]}
					id="search-input"
					onChange={onChange}
					placeholder={placeholder}
					type="text"
					value={value}
				/>
				<Search className={styles["search-icon"]} />
			</div>
		</div>
	);
};

export { PlanSearchInput };
