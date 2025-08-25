import { useCallback, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { Download } from "~/assets/img/icons/icons.js";
import {
	Button,
	DecorativeImage,
	Loader,
} from "~/libs/components/components.js";
import { ONE, ZERO } from "~/libs/constants/constants.js";
import {
	AppRoute,
	ButtonSizes,
	ButtonVariants,
	DataStatus,
	ElementTypes,
} from "~/libs/enums/enums.js";
import { getClassNames } from "~/libs/helpers/get-class-names.js";
import { useAppDispatch, useAppSelector } from "~/libs/hooks/hooks.js";
import { actions as planActions } from "~/modules/plans/plans.js";
import { actions } from "~/modules/plans/slices/plan.slice.js";
import { TASK_INDEXES } from "~/modules/tasks/libs/constants/constants.js";
import { actions as taskActions } from "~/modules/tasks/tasks.js";

import { Day, Task } from "./components/components.js";
import styles from "./styles.module.css";

const Plan: React.FC = () => {
	const [selectedDay, setSelectedDay] = useState<number>(ZERO);
	const [isSelectOpen, setIsSelectOpen] = useState<boolean>(false);

	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const user = useAppSelector((state) => state.auth.user);
	const plan = useAppSelector((state) => state.plan.plan);
	const userPlans = useAppSelector((state) => state.plan.userPlans);
	const userPlansDataStatus = useAppSelector(
		(state) => state.plan.userPlansDataStatus,
	);
	const tasks = useAppSelector((state) => state.task.tasks);

	const planDays = plan?.days ?? [];

	const currentDay = plan?.days[selectedDay];
	const selectedDayTasks = currentDay
		? tasks
				.filter((task) => task.planDayId === currentDay.id)
				.toSorted((first, second) => first.order - second.order)
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

	useEffect(() => {
		const getAllUserPlans = async (): Promise<void> => {
			await dispatch(planActions.getAllUserPlans());
		};

		void getAllUserPlans();
	}, [user, dispatch]);

	useEffect(() => {
		if (userPlans.length > ZERO && !plan) {
			const maxId = Math.max(...userPlans.map((p) => p.id));
			const latestPlan = userPlans.find((p) => p.id === maxId);

			if (latestPlan) {
				dispatch(actions.setPlan(latestPlan));
			}
		}
	}, [userPlans, plan, dispatch]);

	const toggleSelect = useCallback((): void => {
		setIsSelectOpen((previous) => !previous);
	}, []);

	const handleCreatePlan = useCallback((): void => {
		void navigate(AppRoute.QUIZ);
	}, [navigate]);

	const navLink = getClassNames(styles["nav-link"]);

	const hasNoPlans = userPlans.length === ZERO && !plan;
	const isLoading = userPlansDataStatus === DataStatus.PENDING;

	if (isLoading) {
		return <Loader />;
	}

	if (hasNoPlans) {
		return (
			<div
				className={getClassNames(styles["no-plans-container"], "grid-pattern")}
			>
				<div className={styles["no-plans-message"]}>No plans yet</div>
				<Button
					label="Create Plan"
					onClick={handleCreatePlan}
					size="small"
					variant={ButtonVariants.PRIMARY}
				/>
			</div>
		);
	}

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
					{plan && (
						<NavLink className={navLink} to={AppRoute.OVERVIEW_PAGE}>
							<Button
								icon={<DecorativeImage src={Download} />}
								iconOnlySize="medium"
								label="Download PDF"
								size={ButtonSizes.LARGE}
								type={ElementTypes.BUTTON}
								variant={ButtonVariants.PRIMARY}
							/>
						</NavLink>
					)}
				</div>
			</div>
		</div>
	);
};

export { Plan };
