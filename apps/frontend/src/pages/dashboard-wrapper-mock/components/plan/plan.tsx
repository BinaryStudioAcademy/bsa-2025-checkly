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
import { actions as authActions } from "~/modules/auth/auth.js";
import { actions as planActions } from "~/modules/plans/plans.js";
import { actions as planSliceActions } from "~/modules/plans/slices/plan.slice.js";
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
	const userStatus = useAppSelector((state) => state.auth.dataStatus);
	const plan = useAppSelector((state) => state.plan.plan);
	const userPlans = useAppSelector((state) => state.plan.userPlans);
	const userPlansDataStatus = useAppSelector(
		(state) => state.plan.userPlansDataStatus,
	);

	useEffect(() => {
		if (userStatus === DataStatus.IDLE) {
			void dispatch(authActions.getCurrentUser());
		}
	}, [userStatus, dispatch]);

	useEffect(() => {
		if (userStatus === DataStatus.FULFILLED && user) {
			void dispatch(planActions.getPlan(user.id));
		}
	}, [dispatch, userStatus, user]);

	const handleDayRegenerate = useCallback(
		(dayId: number) => {
			if (!plan) {
				return;
			}

			void dispatch(planActions.regeneratePlanDay({ dayId, planId: plan.id }));
		},

		[plan, dispatch],
	);

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

	const handlePlanRegenerate = useCallback((): void => {
		if (!plan) {
			return;
		}

		void dispatch(planActions.regeneratePlan(plan.id));
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
				dispatch(planSliceActions.setPlan(latestPlan));
			}
		}
	}, [userPlans, plan, dispatch]);

	const toggleSelect = useCallback((): void => {
		setIsSelectOpen((previous) => !previous);
	}, []);

	const handleCreatePlan = useCallback((): void => {
		void navigate(AppRoute.QUIZ);
	}, [navigate]);

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
					label="Regenerate plan"
					onClick={handlePlanRegenerate}
					size="small"
					type="button"
					variant={ButtonVariants.SECONDARY}
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
