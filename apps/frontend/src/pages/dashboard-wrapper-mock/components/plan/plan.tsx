import { useCallback, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import { Download, Save } from "~/assets/img/icons/icons.js";
import { Button, DecorativeImage } from "~/libs/components/components.js";
import { ONE, ZERO } from "~/libs/constants/constants.js";
import { AppRoute, DataStatus } from "~/libs/enums/enums.js";
import { getClassNames } from "~/libs/helpers/get-class-names.js";
import { useAppDispatch, useAppSelector } from "~/libs/hooks/hooks.js";
import { actions as authActions } from "~/modules/auth/auth.js";
import { actions as planActions } from "~/modules/plans/plans.js";

import { Day, Task } from "./components/components.js";
import styles from "./styles.module.css";

const Plan: React.FC = () => {
	const [selectedDay, setSelectedDay] = useState<number>(ZERO);
	const [isSelectOpen, setIsSelectOpen] = useState<boolean>(false);

	const dispatch = useAppDispatch();

	const user = useAppSelector((state) => state.auth.user);
	const userStatus = useAppSelector((state) => state.auth.dataStatus);
	const plan = useAppSelector((state) => state.plan.plan);

	useEffect(() => {
		if (userStatus === DataStatus.IDLE) {
			void dispatch(authActions.getCurrentUser());
		}
	}, [dispatch, userStatus]);

	useEffect(() => {
		if (userStatus === DataStatus.FULFILLED && user) {
			void dispatch(planActions.getPlan(user.id));
		}
	}, [dispatch, userStatus, user]);

	const toggleSelect = useCallback((): void => {
		setIsSelectOpen((previous) => !previous);
	}, []);

	const handleTaskRegenerate = useCallback(
		(taskId: number) => {
			const planId = plan?.id;
			const dayId = plan?.days[selectedDay]?.id;

			if (!planId || !dayId) {
				return;
			}

			void dispatch(planActions.regenerateTask({ dayId, planId, taskId }));
		},
		[plan, selectedDay, dispatch],
	);

	const handleDayRegenerate = useCallback(
		(dayId: number) => {
			if (!plan) {
				return;
			}

			void dispatch(planActions.regeneratePlanDay({ dayId, planId: plan.id }));
		},

		[plan, dispatch],
	);

	const handlePlanRegenerate = useCallback((): void => {
		if (!plan) {
			return;
		}

		void dispatch(planActions.regeneratePlan(plan.id));
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
						{plan?.days.map((item, index) => (
							<Day
								index={index}
								isOpen={isSelectOpen}
								item={item}
								key={item.id}
								onRegenerate={handleDayRegenerate}
								selectedDay={selectedDay}
								setIsOpen={setIsSelectOpen}
								setSelectedDay={setSelectedDay}
							/>
						))}
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
							size="large"
							type="button"
							variant="primary"
						/>
					</NavLink>
					{user && (
						<Button
							icon={<DecorativeImage src={Save} />}
							iconOnlySize="medium"
							label="Save to profile"
							size="large"
							type="button"
							variant="secondary"
						/>
					)}
				</div>
			</div>
		</div>
	);
};

export { Plan };
