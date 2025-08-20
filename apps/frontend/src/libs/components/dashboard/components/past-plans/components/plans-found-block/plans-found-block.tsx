import { type FC } from "react";

import { Button } from "~/libs/components/components.js";

import styles from "./styles.module.css";

type Properties = {
	className?: string;
	onClearFilters: () => void;
	plansFoundAmount: number;
};

const PlansFoundBlock: FC<Properties> = ({
	className = "",
	onClearFilters,
	plansFoundAmount,
}: Properties) => {
	return (
		<div className={className}>
			<p className={styles["plans-found"]}>
				Found: <span>{plansFoundAmount}</span>
			</p>
			<Button
				label="Clear filters"
				onClick={onClearFilters}
				size="small"
				variant="secondary"
			/>
		</div>
	);
};

export { PlansFoundBlock };
