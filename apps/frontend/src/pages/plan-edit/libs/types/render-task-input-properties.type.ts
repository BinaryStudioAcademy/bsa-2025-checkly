import {
	type Control,
	type FieldArrayWithId,
	type FieldErrors,
} from "react-hook-form";
import { type TaskDto } from "shared";

type RenderTaskInputField = FieldArrayWithId<
	{
		tasks: TaskDto[];
	},
	"tasks",
	"fieldId"
>;

type RenderTaskInputProperties = {
	control: Control<{ tasks: TaskDto[] }, null>;
	createTaskBlurHandler: (index: number) => () => void;
	createTaskDeleteHandler: (taskId: number) => () => void;
	createTaskRegenerateHandler: (taskId: number) => () => void;
	errors: FieldErrors<{ tasks: TaskDto[] }>;
	tasksLoading: { isLoading: (id: number) => boolean };
};
export { type RenderTaskInputField, type RenderTaskInputProperties };
