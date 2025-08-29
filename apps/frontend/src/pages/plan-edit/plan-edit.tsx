import { type JSX, useCallback, useEffect, useState } from "react";
import { useFieldArray } from "react-hook-form";
import { type TaskResponseDto } from "shared";

import { ArrowLeft, Regenerate, Remove } from "~/assets/img/icons/icons.js";
import {
	AppHeader,
	Button,
	ConfirmationModal,
	DecorativeImage,
	Input,
	Link,
	Modal,
	PlanTaskCreateForm,
	TaskTimeSelector,
} from "~/libs/components/components.js";
import { PlanStyle } from "~/libs/components/plan-styles/plan-style/plan-style.js";
import { ONE, ZERO } from "~/libs/constants/constants.js";
import { AppRoute, ButtonVariants } from "~/libs/enums/enums.js";
import { getClassNames } from "~/libs/helpers/get-class-names.js";
import {
	useAppDispatch,
	useAppForm,
	useAppSelector,
} from "~/libs/hooks/hooks.js";
import { notifications } from "~/libs/modules/notifications/notifications.js";
import {
	DEFAULT_PLAN_STYLE,
	PLAN_STYLE_TO_READABLE,
} from "~/modules/plan-styles/libs/constants/plan-style.constants.js";
import { actions as planActions } from "~/modules/plans/plans.js";
import { actions as taskActions } from "~/modules/tasks/tasks.js";

import { DayList } from "../dashboard-wrapper-mock/components/plan/components/components.js";
import { useLoadingIds } from "../dashboard-wrapper-mock/components/plan/libs/hooks/hooks.js";
import { TaskNotificationMessage } from "./libs/enums/enums.js";
import {
	type ExecutionTimeTypeValue,
	type PlanStyleOption,
	type RenderTaskInputField,
	type RenderTaskInputProperties,
	type TaskDto,
} from "./libs/types/types.js";
import { tasksEditValidationSchema } from "./libs/validation-schema/validation-schemas.js";
import styles from "./styles.module.css";

const SKELETON_TASKS_NUMBER = 5;
const MAX_TASKS_AMOUNT = 5;
const FORM_MODE = "onBlur";
const FORM_FIELD_NAME = "tasks";

const PlanEdit: React.FC = () => {
	const [selectedDay, setSelectedDay] = useState<number>(ZERO);
	const [isSelectOpen, setIsSelectOpen] = useState<boolean>(false);
	const [isRegenerateTaskModalOpen, setIsRegenerateTaskModalOpen] =
		useState<boolean>(false);
	const [taskToRegenerateId, setTaskToRegenerateId] = useState<null | number>(
		null,
	);

	const [isDeleteTaskModalOpen, setIsDeleteTaskModalOpen] =
		useState<boolean>(false);
	const [taskToDeleteId, setTaskToDeleteId] = useState<null | number>(null);

	const [isRegenerateDayModalOpen, setIsRegenerateDayModalOpen] =
		useState<boolean>(false);
	const [dayToRegenerateId, setDayToRegenerateId] = useState<null | number>(
		null,
	);

	const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState<boolean>(false);

	const tasksLoading = useLoadingIds();
	const daysLoading = useLoadingIds();
	const dispatch = useAppDispatch();
	const plan = useAppSelector((state) => state.plan.plan);
	const planDay = plan?.days[selectedDay];
	const tasksAmountPerSelectedDay = planDay?.tasks.length ?? MAX_TASKS_AMOUNT;
	const planDaysNumber = useAppSelector((state) => state.plan.days);

	const isPendingPlan =
		tasksLoading.ids.length > ZERO || daysLoading.ids.length > ZERO;

	useEffect(() => {
		void dispatch(planActions.getPlan());
	}, [dispatch]);

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

	const handleTaskRegenerateClick = useCallback((taskId: number) => {
		setTaskToRegenerateId(taskId);
		setIsRegenerateTaskModalOpen(true);
	}, []);

	const handleTaskRegenerate = useCallback(
		(taskId: number) => {
			if (!planDay) {
				return;
			}

			const taskPayload = {
				dayId: planDay.id,
				planId: plan.id,
				taskId,
			};

			tasksLoading.add(taskId);
			void dispatch(planActions.regenerateTask(taskPayload))
				.then(() => {
					notifications.success(TaskNotificationMessage.REGENERATE_SUCCESS);
				})
				.catch(() => {
					notifications.error(TaskNotificationMessage.REGENERATE_ERROR);
				})
				.finally(() => {
					tasksLoading.remove(taskId);
				});
		},
		[plan, tasksLoading, dispatch, planDay],
	);

	const handleRegenerateConfirm = useCallback(() => {
		if (taskToRegenerateId) {
			handleTaskRegenerate(taskToRegenerateId);
		}

		setIsRegenerateTaskModalOpen(false);
		setTaskToRegenerateId(null);
	}, [taskToRegenerateId, handleTaskRegenerate]);

	const handleRegenerateCancel = useCallback(() => {
		setIsRegenerateTaskModalOpen(false);
		setTaskToRegenerateId(null);
	}, []);

	const toggleSelect = useCallback((): void => {
		setIsSelectOpen((previous) => !previous);
	}, []);

	const handleTaskDeleteClick = useCallback((taskId: number) => {
		setTaskToDeleteId(taskId);
		setIsDeleteTaskModalOpen(true);
	}, []);

	const handleDeleteTask = useCallback(
		(taskId: number): void => {
			dispatch(
				planActions.deleteTaskFromPlan({
					dayIndex: selectedDay,
					taskId,
				}),
			);

			void dispatch(taskActions.deleteTask(taskId))
				.then(() => {
					notifications.success(TaskNotificationMessage.DELETE_SUCCESS);
				})
				.catch(() => {
					notifications.error(TaskNotificationMessage.DELETE_ERROR);
				});
		},
		[dispatch, selectedDay],
	);

	const handleDeleteConfirm = useCallback(() => {
		if (taskToDeleteId) {
			handleDeleteTask(taskToDeleteId);
		}

		setIsDeleteTaskModalOpen(false);
		setTaskToDeleteId(null);
	}, [taskToDeleteId, handleDeleteTask]);

	const handleDeleteCancel = useCallback(() => {
		setIsDeleteTaskModalOpen(false);
		setTaskToDeleteId(null);
	}, []);

	const { control, dirtyFields, errors, getValues, reset } = useAppForm<{
		[FORM_FIELD_NAME]: TaskDto[];
	}>({
		defaultValues: {
			[FORM_FIELD_NAME]: planDay?.[FORM_FIELD_NAME] ?? [],
		},
		mode: FORM_MODE,
		validationSchema: tasksEditValidationSchema,
	});

	useEffect(() => {
		reset({
			[FORM_FIELD_NAME]: planDay?.[FORM_FIELD_NAME] ?? [],
		});
	}, [planDay, reset, plan?.days]);

	const { fields } = useFieldArray({
		control,
		keyName: "fieldId",
		name: FORM_FIELD_NAME,
	});

	const saveIndividualTask = useCallback(
		(index: number) => {
			const updatedTask = getValues(FORM_FIELD_NAME)[index];

			if (!updatedTask) {
				return;
			}

			const isFieldDirty = dirtyFields?.tasks?.[index]?.title;

			if (!isFieldDirty) {
				return;
			}

			const trimmedTitle = updatedTask.title.trim();

			if (trimmedTitle.length === ZERO) {
				return;
			}

			const originalTask = planDay?.tasks[index];

			if (originalTask && originalTask.title.trim() === trimmedTitle) {
				return;
			}

			const payload = {
				id: updatedTask.id,
				payload: {
					title: updatedTask.title,
				},
			};

			dispatch(
				planActions.updateTaskInPlan({
					dayIndex: selectedDay,
					task: { ...updatedTask },
					taskIndex: index,
				}),
			);

			void dispatch(taskActions.updateTask(payload))
				.then(() => {
					notifications.success(TaskNotificationMessage.UPDATE_SUCCESS);
				})
				.catch(() => {
					notifications.error(TaskNotificationMessage.UPDATE_ERROR);
				});
		},
		[getValues, dispatch, selectedDay, dirtyFields?.tasks, planDay?.tasks],
	);

	const createTaskRegenerateHandler = useCallback(
		(taskId: number) => {
			return (): void => {
				handleTaskRegenerateClick(taskId);
			};
		},
		[handleTaskRegenerateClick],
	);

	const createTaskDeleteHandler = useCallback(
		(taskId: number) => {
			return (): void => {
				handleTaskDeleteClick(taskId);
			};
		},
		[handleTaskDeleteClick],
	);

	const createTaskBlurHandler = useCallback(
		(index: number) => {
			return (): void => {
				saveIndividualTask(index);
			};
		},
		[saveIndividualTask],
	);

	const handleGetStyleFromPlan = useCallback((): PlanStyleOption => {
		if (!plan) {
			return DEFAULT_PLAN_STYLE;
		}

		const style = PLAN_STYLE_TO_READABLE[plan.styleId] ?? DEFAULT_PLAN_STYLE;

		return style;
	}, [plan]);

	const renderDaysLoadingSkeleton = (
		number = SKELETON_TASKS_NUMBER,
	): JSX.Element => {
		return (
			<div className={getClassNames("flow-loose", styles["day-skeleton"])}>
				{Array.from({ length: number }).map((_, index) => (
					<div
						className={getClassNames("repel", styles["task-skeleton-item"])}
						key={index}
					>
						<div className={styles["skeleton-button"]} />
						<div
							className={getClassNames(
								"flow",
								styles["skeleton-input-container"],
							)}
						>
							<div className="repel">
								<div className={styles["skeleton-label"]} />
								<div className={styles["skeleton-label"]} />
							</div>
							<div className={styles["skeleton-input"]} />
						</div>
						<div className={styles["skeleton-button"]} />
					</div>
				))}
			</div>
		);
	};

	const createTimeChangeHandler = useCallback(
		(taskId: number) => {
			return (newTime: ExecutionTimeTypeValue): void => {
				void dispatch(
					taskActions.updateTask({
						id: taskId,
						payload: { executionTimeType: newTime },
					}),
				);

				const taskIndex = planDay?.tasks.findIndex(
					(task) => task.id === taskId,
				);

				if (taskIndex !== undefined && taskIndex !== -ONE && planDay) {
					dispatch(
						planActions.updateTaskInPlan({
							dayIndex: selectedDay,
							task: {
								...planDay.tasks[taskIndex],
								executionTimeType: newTime,
							} as TaskDto,
							taskIndex,
						}),
					);
				}
			};
		},
		[dispatch, selectedDay, planDay],
	);

	const renderTaskInput = (
		field: RenderTaskInputField,
		index: number,
		properties: RenderTaskInputProperties,
	): JSX.Element => {
		const {
			control,
			createTaskBlurHandler,
			createTaskDeleteHandler,
			createTaskRegenerateHandler,
			errors,
			tasksLoading,
		} = properties;
		const isTaskRegenerating = tasksLoading.isLoading(field.id);

		if (isTaskRegenerating) {
			return (
				<div
					className={getClassNames("cluster", styles["input-wrapper"])}
					key={field.id}
				>
					{renderDaysLoadingSkeleton(ONE)}
				</div>
			);
		}

		return (
			<div
				className={getClassNames("cluster", styles["input-wrapper"])}
				key={field.id}
			>
				<Button
					className={styles["input-control"]}
					icon={<DecorativeImage src={Regenerate} />}
					iconOnlySize="small"
					isIconOnly
					label="Regenerate task"
					onClick={createTaskRegenerateHandler(field.id)}
					size="small"
					variant="transparent"
				/>
				<div className={styles["input-container"]}>
					<Input
						control={control}
						errorMessage={errors.tasks?.[index]?.title?.message}
						errors={errors}
						label={`Task ${String(index + ONE)}`}
						max="100"
						name={`tasks.${String(index)}.title` as `tasks.${number}.title`}
						onBlur={createTaskBlurHandler(index)}
					/>
					<div className={styles["time-selector"]}>
						<TaskTimeSelector
							currentTime={field.executionTimeType}
							onTimeChange={createTimeChangeHandler(field.id)}
						/>
					</div>
				</div>
				<Button
					className={styles["input-control"]}
					icon={<DecorativeImage src={Remove} />}
					iconOnlySize="small"
					isIconOnly
					label="Delete task"
					onClick={createTaskDeleteHandler(field.id)}
					size="small"
					variant="transparent"
				/>
			</div>
		);
	};

	const renderContent = (): JSX.Element => {
		if (!plan || !plan.days[selectedDay]) {
			return <div>No plan data available.</div>;
		}

		const isDayLoading = daysLoading.isLoading(plan.days[selectedDay].id);

		if (isDayLoading) {
			return renderDaysLoadingSkeleton();
		}

		if (fields.length === ZERO) {
			return <div>No tasks for this day yet.</div>;
		}

		return (
			<>
				{fields.map((field, index) =>
					renderTaskInput(field, index, {
						control,
						createTaskBlurHandler,
						createTaskDeleteHandler,
						createTaskRegenerateHandler,
						errors,
						tasksLoading,
					}),
				)}
			</>
		);
	};

	const handleCreateTaskModalClose = useCallback(() => {
		setIsNewTaskModalOpen(false);
	}, []);

	const handleCreateTaskModalOpen = useCallback(() => {
		setIsNewTaskModalOpen(true);
	}, []);

	const handleCreateTask = useCallback(
		async (taskData: Pick<TaskResponseDto, "executionTimeType" | "title">) => {
			const taskPayload = {
				executionTimeType: taskData.executionTimeType,
				isCompleted: false,
				order: Number(tasksAmountPerSelectedDay) + ONE,
				planDayId: planDay?.id,
				title: taskData.title,
			};

			handleCreateTaskModalClose();

			await dispatch(taskActions.create(taskPayload as TaskDto));
			await dispatch(planActions.getPlan());

			notifications.success("New task created successfully");
		},
		[dispatch, planDay, tasksAmountPerSelectedDay, handleCreateTaskModalClose],
	);

	if (!plan) {
		return (
			<div
				className={getClassNames(styles["no-plans-container"], "grid-pattern")}
			>
				<div className={styles["no-plans-message"]}>No plans yet</div>
				<Link
					asButtonSize="small"
					asButtonVariant={ButtonVariants.PRIMARY}
					to={AppRoute.QUIZ}
				>
					Create Plan
				</Link>
			</div>
		);
	}

	return (
		<>
			<AppHeader />
			<div className={styles["plan"]}>
				<div className={getClassNames("repel", styles["nav"])}>
					<div className={getClassNames("cluster", styles["nav-left"])}>
						<Link tabindex={-1} to={AppRoute.OVERVIEW_PAGE}>
							<Button
								icon={<ArrowLeft />}
								iconOnlySize="small"
								isDisabled={isPendingPlan}
								isIconOnly
								label="Back to the previous page"
								size="small"
							/>
							<span className="visually-hidden">Back to the previous page</span>
						</Link>
						<h2 className={styles["plan-title"]}>{plan.title}</h2>
					</div>
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
						className={getClassNames(styles["content__tasks"], "grid-pattern")}
					>
						<div
							className={getClassNames("wrapper grid", styles["tasks-form"])}
						>
							<div
								className={getClassNames("flow-loose-lg", styles["tasks-list"])}
							>
								{renderContent()}
								<Button
									className={styles["add-task-button"]}
									isDisabled={tasksAmountPerSelectedDay >= MAX_TASKS_AMOUNT}
									label="Add task"
									onClick={handleCreateTaskModalOpen}
									size="small"
									variant="primary"
								/>
							</div>
							<div>
								<PlanStyle
									inputStyle={handleGetStyleFromPlan()}
									plan={plan}
									view="regular"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
			<ConfirmationModal
				isOpen={isRegenerateDayModalOpen}
				message="You are about to regenerate this day."
				onCancel={handleDayRegenerateCancel}
				onConfirm={handleDayRegenerateConfirm}
				title="Day Regeneration"
			>
				<p>
					We will create a new day for you and replace this one. Do you want to
					proceed?
				</p>
			</ConfirmationModal>
			<ConfirmationModal
				isOpen={isRegenerateTaskModalOpen}
				message="You are about to regenerate this task."
				onCancel={handleRegenerateCancel}
				onConfirm={handleRegenerateConfirm}
				title="Task Regeneration"
			>
				<p>
					We will create a new task for you and replace this one. Do you want to
					proceed?
				</p>
			</ConfirmationModal>

			<ConfirmationModal
				isOpen={isDeleteTaskModalOpen}
				message="You sure you want to permanently delete this task?"
				onCancel={handleDeleteCancel}
				onConfirm={handleDeleteConfirm}
				title="Task Deletion"
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
		</>
	);
};

export { PlanEdit };
