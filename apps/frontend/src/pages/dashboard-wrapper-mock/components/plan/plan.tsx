import { useCallback, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

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
import { actions as planActions } from "~/modules/plans/plans.js";
import { TASK_INDEXES } from "~/modules/tasks/libs/constants/constants.js";
import { actions as taskActions } from "~/modules/tasks/tasks.js";

import { DayList, TaskList } from "./components/components.js";
import { useLoadingIds } from "./libs/hooks/hooks.js";
import styles from "./styles.module.css";

const Plan: React.FC = () => {
	const [selectedDay, setSelectedDay] = useState<number>(ZERO);
	const [isPlanRegenerating, setIsPlanRegenerating] = useState<boolean>(false);
	const [isSelectOpen, setIsSelectOpen] = useState<boolean>(false);
	const tasksLoading = useLoadingIds();
	const daysLoading = useLoadingIds();

	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const plan = useAppSelector((state) => state.plan.plan);
	const planDaysNumber = useAppSelector((state) => state.plan.days);

	useEffect(() => {
		void dispatch(planActions.getPlan());
	}, [dispatch]);

	const handleDayRegenerate = useCallback(
		(dayId: number) => {
			if (!plan) {
				return;
			}

			const planPayload = { dayId, planId: plan.id };

			daysLoading.add(dayId);
			void dispatch(planActions.regeneratePlanDay(planPayload)).finally(() => {
				daysLoading.remove(dayId);
			});
		},
		[plan, daysLoading, dispatch],
	);

	const handleTaskRegenerate = useCallback(
		(taskId: number) => {
			const planDay = plan?.days[selectedDay];

			if (!planDay) {
				return;
			}

			const taskPayload = {
				dayId: planDay.id,
				planId: plan.id,
				taskId,
			};

			tasksLoading.add(taskId);
			void dispatch(planActions.regenerateTask(taskPayload)).finally(() => {
				tasksLoading.remove(taskId);
			});
		},
		[plan, tasksLoading, selectedDay, dispatch],
	);

	const handlePlanRegenerate = useCallback((): void => {
		if (!plan) {
			return;
		}

		setIsPlanRegenerating(true);
		void dispatch(planActions.clearPlan());
		void dispatch(planActions.regeneratePlan(plan.id)).finally(() => {
			setIsPlanRegenerating(false);
		});
	}, [dispatch, plan]);

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

	const handleCreatePlan = useCallback((): void => {
		void navigate(AppRoute.QUIZ);
	}, [navigate]);

	if (!plan && !isPlanRegenerating) {
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
					label="Regenerate plan"
					onClick={handlePlanRegenerate}
					size="small"
					type="button"
					variant="secondary"
				/>
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
						<DayList
							isOpen={isSelectOpen}
							onRegenerate={handleDayRegenerate}
							plan={plan}
							planDaysNumber={planDaysNumber}
							selectedDay={selectedDay}
							setIsOpen={setIsSelectOpen}
							setSelectedDay={setSelectedDay}
						/>
					</div>
				</div>
				<div
					className={getClassNames(
						styles["content__tasks"],
						"cluster grid-pattern flow",
					)}
				>
					<TaskList
						daysLoading={daysLoading}
						onRegenerate={handleTaskRegenerate}
						selectedDayId={plan?.days[selectedDay]?.id ?? ZERO}
						tasks={plan?.days[selectedDay]?.tasks ?? []}
						tasksLoading={tasksLoading}
					/>
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
