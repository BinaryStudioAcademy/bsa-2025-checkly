import { type FC, useCallback } from "react";
import { type Control, type FieldErrors, useFieldArray } from "react-hook-form";
import { toast } from "react-toastify";

import { Regenerate, Timer } from "~/assets/img/icons/icons.js";
import {
	Button,
	DecorativeImage,
	Input,
} from "~/libs/components/components.js";
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

	const { fields } = useFieldArray({
		control,
		name: fieldArrayName,
	});

	const handleRegenerateTask = useCallback((): void => {
		toast.success("Regenerate task");
	}, []);

	const handleSetTaskTime = useCallback((): void => {
		toast.info("Set time for task");
	}, []);

	return (
		<div className={styles["dayEditor"]}>
			<div className={styles["activitiesList"]}>
				{fields.map((field, taskIndex) => (
					<div className={styles["activityRow"]} key={field.id}>
						<div className={styles["activityHeader"]}>
							<span className={styles["activityLabel"]}>
								{`Task ${String(taskIndex + INCREMENT_VALUE)}`}
							</span>

							<div className={styles["actionButtons"]}>
								<div className={styles["timerButtonWrapper"]}>
									<Button
										className={styles["timerButton"]}
										icon={<DecorativeImage src={Timer} />}
										iconOnlySize="small"
										isIconOnly
										label="morning"
										onClick={handleSetTaskTime}
										variant="transparent"
									/>
									<span>morning</span>
								</div>

								<Button
									className={styles["actionButton"]}
									icon={<DecorativeImage src={Regenerate} />}
									iconOnlySize="small"
									isIconOnly
									label=""
									onClick={handleRegenerateTask}
									variant="transparent"
								/>
							</div>
						</div>

						<Input
							control={control}
							errors={errors}
							label=""
							name={getFieldName(dayIndex, taskIndex)}
						/>
					</div>
				))}
			</div>
		</div>
	);
};

export { DayEditor };
