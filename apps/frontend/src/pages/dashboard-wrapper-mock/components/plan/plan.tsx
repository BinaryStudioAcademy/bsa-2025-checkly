import { useCallback, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import { Download } from "~/assets/img/icons/icons.js";
import { Button, DecorativeImage } from "~/libs/components/components.js";
import { ONE, ZERO } from "~/libs/constants/constants.js";
import { AppRoute } from "~/libs/enums/enums.js";
import { getClassNames } from "~/libs/helpers/get-class-names.js";
import { useAppDispatch, useAppSelector } from "~/libs/hooks/hooks.js";
import { actions as planActions } from "~/modules/plans/plans.js";

import { DayList, TaskList } from "./components/components.js";
import { useLoadingIds } from "./libs/hooks/hooks.js";
import styles from "./styles.module.css";

const Plan: React.FC = () => {
	const [selectedDay, setSelectedDay] = useState<number>(ZERO);
	const [isSelectOpen, setIsSelectOpen] = useState<boolean>(false);
	const tasksLoading = useLoadingIds();
	const daysLoading = useLoadingIds();

	const dispatch = useAppDispatch();

	const plan = useAppSelector((state) => state.plan.plan);

	useEffect(() => {
		void dispatch(planActions.getPlan());
	}, [dispatch]);

	const toggleSelect = useCallback((): void => {
		setIsSelectOpen((previous) => !previous);
	}, []);

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

	const handlePlanRegenerate = useCallback((): void => {
		if (!plan) {
			return;
		}

		dispatch(planActions.clearPlan());
		void dispatch(planActions.regeneratePlan({ id: plan.id }));
	}, [dispatch, plan]);

	return (
		<div className={styles["plan"]}>
			<div className={styles["nav"]}>
				<p>Here’s your plan!</p>
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
						<DayList
							isOpen={isSelectOpen}
							onRegenerate={handleDayRegenerate}
							plan={plan}
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
							size="large"
							type="button"
							variant="primary"
						/>
					</NavLink>
				</div>
			</div>
		</div>
	);
};

export { Plan };
