import { AppHeader } from "~/libs/components/components.js";
import { PlanStyle } from "~/libs/components/plan-styles/plan-style/plan-style.js";
import { type PlanStyleOption } from "~/libs/types/types.js";

import styles from "./styles.module.css";

const SELECTED_STYLE: PlanStyleOption = "MINIMAL";

const TestPage: React.FC = () => {
	return (
		<>
			<AppHeader />
			<main className={styles["test-main"]}>
				<div className={styles["test-panel"]} />
				<div className={styles["test-body"]}>
					<PlanStyle inputStyle={SELECTED_STYLE} />
				</div>
				<div className={styles["test-panel"]} />
			</main>
		</>
	);
};

export { TestPage };
