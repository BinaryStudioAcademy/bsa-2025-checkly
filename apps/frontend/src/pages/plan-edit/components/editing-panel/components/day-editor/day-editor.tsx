import { type FC, useCallback } from "react";
import { type Control, type FieldErrors, useFieldArray } from "react-hook-form";

import { Button, Input } from "~/libs/components/components.js";
import { type PlanEditForm } from "~/pages/plan-edit/libs/types/plan-edit-form.type.js";

import styles from "./styles.module.css";

const INCREMENT_VALUE = 1;

const getFieldName = (
	dayIndex: number,
	activityIndex: number,
): `days.${number}.activities.${number}.text` => {
	return `days.${String(dayIndex)}.activities.${String(
		activityIndex,
	)}.text` as `days.${number}.activities.${number}.text`;
};

type Properties = {
	control: Control<PlanEditForm>;
	dayIndex: number;
	errors: FieldErrors<PlanEditForm>;
};

const DayEditor: FC<Properties> = ({ control, dayIndex, errors }) => {
	const fieldArrayName = `days.${String(
		dayIndex,
	)}.activities` as `days.${number}.activities`;

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
				{fields.map((field, activityIndex) => (
					<div className={styles["activityRow"]} key={field.id}>
						<Input
							control={control}
							errors={errors}
							label={`Task ${String(activityIndex + INCREMENT_VALUE)}`}
							name={getFieldName(dayIndex, activityIndex)}
						/>
						<Button
							icon={<>&times;</>}
							iconOnlySize="small"
							isIconOnly
							label=""
							onClick={handleRemoveActivity(activityIndex)}
							variant="primary"
						/>
					</div>
				))}
			</div>
		</div>
	);
};

export { DayEditor };
