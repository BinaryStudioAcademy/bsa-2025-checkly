import { type FC, useCallback } from "react";
import { type Control, type FieldErrors, useFieldArray } from "react-hook-form";

import { Button, Textarea } from "~/libs/components/components.js";
import { INCREMENT_VALUE } from "~/libs/constants/constants.js";
import { type PlanEditForm } from "~/libs/types/types.js";

import styles from "./styles.module.css";

const getFieldName = (
	dayIndex: number,
	taskIndex: number,
): `days.${number}.tasks.${number}.description` => {
	return `days.${String(dayIndex)}.tasks.${String(
		taskIndex,
	)}.description` as `days.${number}.tasks.${number}.description`;
};

type Properties = {
	control: Control<PlanEditForm>;
	dayIndex: number;
	errors: FieldErrors<PlanEditForm>;
};

const DayEditor: FC<Properties> = ({ control, dayIndex, errors }) => {
	const fieldArrayName = `days.${String(
		dayIndex,
	)}.tasks` as `days.${number}.tasks`;

	const { fields, remove } = useFieldArray({
		control,
		name: fieldArrayName,
	});

	const handleRemoveActivity = useCallback(
		(index: number) => (): void => {
			remove(index);
		},
		[remove],
	);

	return (
		<div className={styles["dayEditor"]}>
			<div className={styles["activitiesList"]}>
				{fields.map((field, taskIndex) => (
					<div className={styles["activityRow"]} key={field.id}>
						<Textarea
							control={control}
							errors={errors}
							label={`Task ${String(taskIndex + INCREMENT_VALUE)}`}
							name={getFieldName(dayIndex, taskIndex)}
							rows={2}
						/>
						<Button
							icon={<>&times;</>}
							iconOnlySize="small"
							isIconOnly
							label=""
							onClick={handleRemoveActivity(taskIndex)}
							variant="primary"
						/>
					</div>
				))}
			</div>
		</div>
	);
};

export { DayEditor };
