import { useCallback, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import { Download } from "~/assets/img/icons/icons.js";
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
import { actions, actions as planActions } from "~/modules/plans/plans.js";
import { TASK_INDEXES } from "~/modules/tasks/libs/constants/constants.js";
import { actions as taskActions } from "~/modules/tasks/tasks.js";

import { Day, Task } from "./components/components.js";
import styles from "./styles.module.css";

const Plan: React.FC = () => {
	const [selectedDay, setSelectedDay] = useState<number>(ZERO);
	const [isSelectOpen, setIsSelectOpen] = useState<boolean>(false);

	const dispatch = useAppDispatch();
	const user = useAppSelector((state) => state.auth.user);
	const plan = useAppSelector((state) => state.plan.plan);

	useEffect(() => {
		const userId = 2;

		const getPlan = async (): Promise<void> => {
			await dispatch(actions.getPlan(userId));
		};

		void getPlan();
	}, [dispatch]);

	const planDays = plan?.days ?? [];

	const handleTaskRegenerate = useCallback(
		(taskId: number) => {
			const planId = plan?.id;
			const dayId = plan?.days[selectedDay]?.id;

			if (!planId || !dayId) {
				return;
			}

			void dispatch(actions.regenerateTask({ dayId, planId, taskId }));
		},
		[plan, selectedDay, dispatch],
	);

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

	useEffect(() => {
		const getAllUserPlans = async (): Promise<void> => {
			await dispatch(planActions.getAllUserPlans());
		};

		void getAllUserPlans();
	}, [user, dispatch]);

	const toggleSelect = useCallback((): void => {
		setIsSelectOpen((previous) => !previous);
	}, []);

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
					{plan?.days[selectedDay]?.tasks.map((item, index) => (
						<Task
							indexItem={index + ONE}
							item={item}
							key={index}
							onRegenerate={handleTaskRegenerate}
						/>
					))}
					<NavLink
						className={getClassNames(styles["nav-link"])}
						to={AppRoute.CHOOSE_STYLE}
					>
						<Button
							icon={<DecorativeImage src={Download} />}
							iconOnlySize="medium"
							label="Download PDF"
							size={ButtonSizes.LARGE}
							type={ElementTypes.BUTTON}
							variant={ButtonVariants.PRIMARY}
						/>
					</NavLink>
				</div>
			</div>
		</div>
	);
};

export { Plan };
