import { useCallback, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { DownloadIcon } from "~/assets/img/icons/icons.js";
import {
	Button,
	ConfirmationModal,
	Modal,
} from "~/libs/components/components.js";
import { PlanTaskCreateForm } from "~/libs/components/plan-task-create-form/plan-task-create-form.js";
import { ONE, ZERO } from "~/libs/constants/constants.js";
import {
	AppRoute,
	ButtonSizes,
	ButtonVariants,
	ElementTypes,
} from "~/libs/enums/enums.js";
import { getClassNames } from "~/libs/helpers/get-class-names.js";
import { useAppDispatch, useAppSelector } from "~/libs/hooks/hooks.js";
import { type TaskResponseDto } from "~/libs/types/types.js";
import { actions as planActions } from "~/modules/plans/plans.js";
import { TASK_INDEXES } from "~/modules/tasks/libs/constants/constants.js";
import { actions as taskActions } from "~/modules/tasks/tasks.js";

import { DayList, TaskList } from "./components/components.js";
import {
	DEFAULT_TASK_AMOUNT,
	MODAL_MESSAGES,
} from "./components/libs/constants/constants.js";
import { useLoadingIds } from "./libs/hooks/hooks.js";
import styles from "./styles.module.css";

const Plan: React.FC = () => {
	const [selectedDay, setSelectedDay] = useState<number>(ZERO);
	const [isPlanRegenerating, setIsPlanRegenerating] = useState<boolean>(false);
	const [isSelectOpen, setIsSelectOpen] = useState<boolean>(false);

	const [isRegeneratePlanModalOpen, setIsRegeneratePlanModalOpen] =
		useState<boolean>(false);
	const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState<boolean>(false);
	const [isRegenerateDayModalOpen, setIsRegenerateDayModalOpen] =
		useState<boolean>(false);
	const [dayToRegenerateId, setDayToRegenerateId] = useState<null | number>(
		null,
	);

	const tasksLoading = useLoadingIds();
	const daysLoading = useLoadingIds();

	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const plan = useAppSelector((state) => state.plan.plan);
	const planDaysNumber = useAppSelector((state) => state.plan.days);
	const planDay = plan?.days[selectedDay];
	const tasksAmountPerSelectedDay =
		planDay?.tasks.length ?? DEFAULT_TASK_AMOUNT;

	const isPendingPlan =
		tasksLoading.ids.length > ZERO || daysLoading.ids.length > ZERO;

	useEffect(() => {
		if (!plan) {
			void dispatch(planActions.getPlan());
		}
	}, [dispatch, plan]);

	const handleDayRegenerateClick = useCallback((dayId: number) => {
		setDayToRegenerateId(dayId);
		setIsRegenerateDayModalOpen(true);
	}, []);

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

	const handleDayRegenerateConfirm = useCallback(() => {
		if (dayToRegenerateId) {
			handleDayRegenerate(dayToRegenerateId);
		}

		setIsRegenerateDayModalOpen(false);
		setDayToRegenerateId(null);
	}, [dayToRegenerateId, handleDayRegenerate]);

	const handleDayRegenerateCancel = useCallback(() => {
		setIsRegenerateDayModalOpen(false);
		setDayToRegenerateId(null);
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

	const handlePlanRegenerateClick = useCallback((): void => {
		setIsRegeneratePlanModalOpen(true);
	}, []);

	const handlePlanRegenerateConfirm = useCallback((): void => {
		handlePlanRegenerate();
		setIsRegeneratePlanModalOpen(false);
	}, [handlePlanRegenerate]);

	const handlePlanRegenerateCancel = useCallback((): void => {
		setIsRegeneratePlanModalOpen(false);
	}, []);

	const handleCreateTaskModalClose = useCallback(() => {
		setIsNewTaskModalOpen(false);
	}, []);

	const handleCreateTaskModalOpen = useCallback(() => {
		setIsNewTaskModalOpen(true);
	}, []);

	const handleCreateTask = useCallback(
		async (taskData: Pick<TaskResponseDto, "executionTimeType" | "title">) => {
			const planDay = plan?.days[selectedDay];

			if (!planDay || !taskData.executionTimeType) {
				return;
			}

			const taskPayload = {
				executionTimeType: taskData.executionTimeType,
				isCompleted: false,
				order: Number(planDay.tasks.length) + ONE,
				planDayId: planDay.id,
				title: taskData.title,
			};

			handleCreateTaskModalClose();

			await dispatch(taskActions.create(taskPayload));
			await dispatch(planActions.getPlan());
		},
		[dispatch, plan, selectedDay, handleCreateTaskModalClose],
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
		<>
			<div className={styles["plan"]}>
				<div className={styles["nav"]}>
					<h2 className={styles["nav-text"]}>{plan?.title}</h2>
					<Button
						className={styles["regenerate-button"]}
						isDisabled={isPendingPlan || isPlanRegenerating}
						label="Regenerate plan"
						onClick={handlePlanRegenerateClick}
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
								daysLoading={daysLoading}
								isOpen={isSelectOpen}
								onRegenerate={handleDayRegenerateClick}
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
							"cluster grid-pattern flow-loose",
						)}
					>
						<TaskList
							daysLoading={daysLoading}
							onRegenerate={handleTaskRegenerate}
							selectedDayId={plan?.days[selectedDay]?.id ?? ZERO}
							tasks={plan?.days[selectedDay]?.tasks ?? []}
							tasksLoading={tasksLoading}
						/>
						<Button
							isDisabled={tasksAmountPerSelectedDay >= DEFAULT_TASK_AMOUNT}
							label="Add task"
							onClick={handleCreateTaskModalOpen}
							size={ButtonSizes.LARGE}
							type={ElementTypes.BUTTON}
							variant={ButtonVariants.PRIMARY}
						/>
						<NavLink
							className={getClassNames(styles["nav-link"])}
							to={AppRoute.OVERVIEW_PAGE}
						>
							<Button
								icon={<DownloadIcon />}
								iconOnlySize="medium"
								isDisabled={isPendingPlan || isPlanRegenerating}
								label="Download"
								size={ButtonSizes.LARGE}
								type={ElementTypes.BUTTON}
								variant={ButtonVariants.PRIMARY}
							/>
						</NavLink>
					</div>
				</div>
			</div>

			<ConfirmationModal
				isOpen={isRegeneratePlanModalOpen}
				message="You are about to regenerate the whole plan."
				onCancel={handlePlanRegenerateCancel}
				onConfirm={handlePlanRegenerateConfirm}
				title="Plan Regeneration"
			/>
			<Modal
				isOpen={isNewTaskModalOpen}
				onClose={handleCreateTaskModalClose}
				title="Add Task"
			>
				<PlanTaskCreateForm
					onCancel={handleCreateTaskModalClose}
					onSubmit={handleCreateTask}
				/>
			</Modal>
			<ConfirmationModal
				isOpen={isRegeneratePlanModalOpen}
				message="You are about to regenerate the whole plan."
				onCancel={handlePlanRegenerateCancel}
				onConfirm={handlePlanRegenerateConfirm}
				title="Plan Regeneration"
			>
				<p>{MODAL_MESSAGES.PLAN_REGENERATION}</p>
			</ConfirmationModal>
			<ConfirmationModal
				isOpen={isRegenerateDayModalOpen}
				message="You are about to regenerate this day."
				onCancel={handleDayRegenerateCancel}
				onConfirm={handleDayRegenerateConfirm}
				title="Day Regeneration"
			>
				<p>{MODAL_MESSAGES.DAY_REGENERATION}</p>
			</ConfirmationModal>
		</>
	);
};

export { Plan };
