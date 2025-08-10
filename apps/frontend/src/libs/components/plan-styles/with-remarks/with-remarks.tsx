import { getClassNames } from "~/libs/helpers/get-class-names.js";

import { PlanHeader } from "../components/components.js";
import { Day } from "../components/day/day.js";
import { Notes } from "../components/notes/notes.js";
import { plan } from "../mocks/plan-mocks.js";
import styles from "./styles.module.css";

const PlanStyleWithRemarks: React.FC = () => {
	const containerClasses = getClassNames(styles["container"]);

	return (
		<section className={containerClasses}>
			<PlanHeader title={plan.title} />
			<div className={styles["plan-body"]}>
				<ul className={styles["day-list"]}>
					{plan.days.map((day) => {
						return (
							<Day dayNumber={day.dayNumber} key={day.id} tasks={day.tasks} />
						);
					})}
					<Notes />
				</ul>
			</div>
		</section>
	);
};

export { PlanStyleWithRemarks };
