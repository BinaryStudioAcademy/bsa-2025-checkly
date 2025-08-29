import { type BaseSyntheticEvent, type JSX } from "react";

import {
	Button,
	Input,
	TaskTimeSelector,
} from "~/libs/components/components.js";
import { getClassNames } from "~/libs/helpers/get-class-names.js";
import { useAppForm, useCallback } from "~/libs/hooks/hooks.js";

import { type ExecutionTimeTypeValue } from "./libs/types/types.js";
import {
	type TaskCreateFormValues,
	taskCreatePartialValidationSchema,
} from "./libs/validation-schemas/validation-schemas.js";
import { selectStyles } from "./plan-task-select-styles.js";
import styles from "./styles.module.css";

type Properties = {
	onCancel: () => void;
	onSubmit: (data: TaskCreateFormValues) => Promise<void> | void;
};

type SubmitHandler<T> = (data: T, event?: BaseSyntheticEvent) => Promise<void>;

const PlanTaskCreateForm = ({
	onCancel,
	onSubmit,
}: Properties): JSX.Element => {
	const { control, errors, handleSubmit, reset, setValue, watch } = useAppForm({
		defaultValues: {
			executionTimeType: "morning" as ExecutionTimeTypeValue,
			title: "",
		},
		mode: "onBlur",
		validationSchema: taskCreatePartialValidationSchema,
	});

	const currentExecutionTime = watch("executionTimeType");

	const handleTimeChange = useCallback(
		(newTime: ExecutionTimeTypeValue) => {
			setValue("executionTimeType", newTime);
		},
		[setValue],
	);

	const onSubmitHandler: SubmitHandler<TaskCreateFormValues> = useCallback(
		async (validatedData): Promise<void> => {
			await onSubmit(validatedData);
			reset();
		},
		[onSubmit, reset],
	);

	const handleFormSubmit = useCallback(
		(event: React.FormEvent) => {
			event.preventDefault();
			void handleSubmit(onSubmitHandler)(event);
		},
		[handleSubmit, onSubmitHandler],
	);

	return (
		<form className="flow-loose-xl" onSubmit={handleFormSubmit}>
			<div className="flow-loose">
				<div className={getClassNames("flow-tight", styles["time-select"])}>
					<label htmlFor="time-selector">Select time period:</label>
					<TaskTimeSelector
						currentTime={currentExecutionTime}
						inputId="time-selector"
						onTimeChange={handleTimeChange}
						selectStyles={selectStyles}
					/>
				</div>
				<Input
					control={control}
					errors={errors}
					label="Title"
					name="title"
					placeholder="Enter task title"
				/>
			</div>
			<div className={getClassNames("cluster", styles["buttons-container"])}>
				<Button
					label="Cancel"
					onClick={onCancel}
					size="large"
					variant="secondary"
				/>
				<Button label="Create" size="large" type="submit" variant="primary" />
			</div>
		</form>
	);
};

export { PlanTaskCreateForm };
