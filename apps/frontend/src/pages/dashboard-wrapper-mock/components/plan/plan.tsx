import { useCallback, useState } from "react";
import { NavLink } from "react-router-dom";

import { Download, Save } from "~/assets/img/icons/icons.js";
import { Button, DecorativeImage } from "~/libs/components/components.js";
import { ONE, ZERO } from "~/libs/constants/constants.js";
import { AppRoute } from "~/libs/enums/enums.js";
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

	const navLink = getClassNames(styles["nav-link"]);

	return (
		<div className={styles["plan"]}>
			<div className={styles["nav"]}>
				<p>Here’s your plan!</p>
				<Button
					className={getClassNames(styles["select-day"])}
					label={`Day ${String(selectedDay + ONE)}`}
					onClick={toggleSelect}
					variant="transparent"
				/>
			</div>
			<div className={styles["content"]}>
				<div className={styles["content__days-wrapper"]}>
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
					<NavLink className={navLink} to={AppRoute.CHOOSE_STYLE}>
						<Button
							icon={<DecorativeImage src={Download} />}
							iconOnlySize="medium"
							label="Download PDF"
							size="large"
							type="button"
							variant="primary"
						/>
					</NavLink>
					<Button
						icon={<DecorativeImage src={Save} />}
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
