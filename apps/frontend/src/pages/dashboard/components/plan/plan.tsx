import { useCallback, useState } from "react";

import { download, save } from "~/assets/img/dashboard/dashboard.img.js";
import { Button, DecorativeImage } from "~/libs/components/components.js";
import { ONE, ZERO } from "~/libs/constants/constants.js";
import { getClassNames } from "~/libs/helpers/get-class-names.js";

import { Day, Task } from "./components/components.js";
import { daysTasksMockData } from "./mock-data/days-tasks-mock.js";
import styles from "./styles.module.css";

const Plan: React.FC = () => {
	const [selectedDay, setSelectedDay] = useState<number>(ZERO);
	const [isSelectOpen, setIsSelectOpen] = useState<boolean>(false);

	const toggleSelect = useCallback((): void => {
		setIsSelectOpen((previous) => !previous);
	}, []);

	return (
		<div className={styles["plan"]}>
			<div className={styles["nav"]}>
				<p>My Plan</p>
				<button className={styles["select-day"]} onClick={toggleSelect}>
					Day {selectedDay + ONE}
				</button>
			</div>
			<div className={styles["content"]}>
				<div
					className={getClassNames(
						styles["content__days"],
						isSelectOpen ? styles["content__days__open"] : "",
					)}
				>
					{daysTasksMockData.map((_, index) => {
						return (
							<Day
								indexDay={index}
								isOpen={isSelectOpen}
								key={index}
								selectedDay={selectedDay}
								setIsOpen={setIsSelectOpen}
								setSelectedDay={setSelectedDay}
							/>
						);
					})}
				</div>
				<div
					className={getClassNames(
						styles["content__tasks"],
						"cluster grid-pattern flow",
					)}
				>
					{daysTasksMockData[selectedDay]?.map((item, index) => {
						return <Task indexItem={index + ONE} item={item} key={index} />;
					})}
					<Button
						icon={<DecorativeImage src={download} />}
						iconOnlySize="medium"
						label="Download PDF"
						size="large"
						type="button"
						variant="primary"
					/>
					<Button
						icon={<DecorativeImage src={save} />}
						iconOnlySize="medium"
						label="Save to profile"
						size="large"
						type="button"
						variant="secondary"
					/>
				</div>
			</div>
		</div>
	);
};

export { Plan };
