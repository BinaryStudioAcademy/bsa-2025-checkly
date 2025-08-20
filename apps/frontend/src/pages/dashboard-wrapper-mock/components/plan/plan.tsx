import { useCallback, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import { Download, Save } from "~/assets/img/icons/icons.js";
import { Button, DecorativeImage } from "~/libs/components/components.js";
import { ONE, ZERO } from "~/libs/constants/constants.js";
import {
	AppRoute,
	ButtonSizes,
	ButtonVariants,
	ElementTypes,
} from "~/libs/enums/enums.js";
import { getClassNames } from "~/libs/helpers/get-class-names.js";
import { useAppDispatch, useAppSelector } from "~/libs/hooks/hooks.js";
import { TASK_INDEXES } from "~/modules/tasks/libs/constants/constants.js";
import { actions as taskActions } from "~/modules/tasks/tasks.js";

import { Day, Task } from "./components/components.js";
import { DAYS_TASKS_MOCK_DATA } from "./mock-data/days-tasks-mock.js";
import styles from "./styles.module.css";

const Plan: React.FC = () => {
	const [selectedDay, setSelectedDay] = useState<number>(ZERO);
	const [isSelectOpen, setIsSelectOpen] = useState<boolean>(false);

	const dispatch = useAppDispatch();
	const user = useAppSelector((state) => state.auth.user);
	const plan = useAppSelector((state) => state.plan.plan);
	const tasks = useAppSelector((state) => state.task.tasks);

	const planDays = plan?.days ?? DAYS_TASKS_MOCK_DATA;

	const currentDay = plan?.days[selectedDay];
	const selectedDayTasks = currentDay
		? tasks.filter((task) => task.planDayId === currentDay.id)
		: [];

	useEffect(() => {
		const allTasks =
			plan?.days.flatMap((day) =>
				day.tasks.map((task) => ({
					...task,
					planDayId: day.id,
				})),
			) ?? [];

		if (allTasks.length > TASK_INDEXES.TASK_ZERO_INDEX) {
			dispatch(taskActions.setTasks(allTasks));
		}
	}, [plan, dispatch]);

	const toggleSelect = useCallback((): void => {
		setIsSelectOpen((previous) => !previous);
	}, []);

	const navLink = getClassNames(styles["nav-link"]);

	return (
		<div className={styles["plan"]}>
			<div className={styles["nav"]}>
				<p className={styles["nav-text"]}>Here’s your plan!</p>
				<Button
					className={getClassNames(styles["select-day"])}
					label={`Day ${String(selectedDay + ONE)}`}
					onClick={toggleSelect}
					variant={ButtonVariants.TRANSPARENT}
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
						{planDays.map((_, index) => {
							return (
								<Day
									indexDay={index}
									isOpen={isSelectOpen}
									key={index}
									onChangeIsOpen={setIsSelectOpen}
									onChangeSelectedDay={setSelectedDay}
									selectedDay={selectedDay}
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
					{selectedDayTasks.map((item, index) => {
						return <Task indexItem={index + ONE} item={item} key={index} />;
					})}
					<NavLink className={navLink} to={AppRoute.CHOOSE_STYLE}>
						<Button
							icon={<DecorativeImage src={Download} />}
							iconOnlySize="medium"
							label="Download PDF"
							size={ButtonSizes.LARGE}
							type={ElementTypes.BUTTON}
							variant={ButtonVariants.PRIMARY}
						/>
					</NavLink>
					{user && (
						<Button
							icon={<DecorativeImage src={Save} />}
							iconOnlySize="medium"
							label="Save to profile"
							size={ButtonSizes.LARGE}
							type={ElementTypes.BUTTON}
							variant={ButtonVariants.SECONDARY}
						/>
					)}
				</div>
			</div>
		</div>
	);
};

export { Plan };
