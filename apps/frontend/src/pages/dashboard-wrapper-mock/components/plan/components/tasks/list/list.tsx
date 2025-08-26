import React, { type JSX } from "react";

import { ONE, ZERO } from "~/libs/constants/constants.js";

import { type useLoadingIds } from "../../../libs/hooks/hooks.js";
import { DEFAULT_TASK_AMOUNT } from "../../libs/constants/constants.js";
import { type TaskDto } from "../../libs/types/types.js";
import { TaskSkeleton } from "../skeleton/skeleton.js";
import { Task } from "../task/task.js";

type Properties = {
	daysLoading: ReturnType<typeof useLoadingIds>;
	onRegenerate: (taskId: number) => void;
	selectedDayId: number;
	tasks: TaskDto[];
	tasksLoading: ReturnType<typeof useLoadingIds>;
};

const TaskList: React.FC<Properties> = ({
	daysLoading,
	onRegenerate,
	selectedDayId,
	tasks,
	tasksLoading,
}) => {
	if (tasks.length === ZERO) {
		return (
			<>
				{Array.from({ length: DEFAULT_TASK_AMOUNT }).map((_, index) => (
					<TaskSkeleton indexItem={index + ONE} key={index} />
				))}
			</>
		);
	}

	const renderTask = (task: TaskDto, index: number): JSX.Element => {
		const isTaskLoading = tasksLoading.isLoading(task.id);
		const isDayLoading = daysLoading.isLoading(selectedDayId);

		if (isTaskLoading || isDayLoading) {
			return <TaskSkeleton indexItem={index + ONE} key={task.id} />;
		}

		return (
			<Task
				indexItem={index + ONE}
				item={task}
				key={task.id}
				onRegenerate={onRegenerate}
			/>
		);
	};

	return <>{tasks.map((task, index) => renderTask(task, index))}</>;
};

export { TaskList };
