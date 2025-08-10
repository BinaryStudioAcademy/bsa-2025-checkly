import { type FC } from "react";
import { type Control, type FieldErrors } from "react-hook-form";

import { type PlanEditForm } from "../../libs/types/plan-edit-form.type.js";
import { DayEditor, NotesEditor } from "../components.js";
import styles from "./styles.module.css";

type Properties = {
	control: Control<PlanEditForm>;
	errors: FieldErrors<PlanEditForm>;
	selectedItem: "notes" | number;
};

const EditingPanel: FC<Properties> = ({ control, errors, selectedItem }) => {
	return (
		<div className={styles["panel"]}>
			{typeof selectedItem === "number" ? (
				<DayEditor
					control={control}
					dayIndex={selectedItem}
					errors={errors}
					key={selectedItem}
				/>
			) : (
				<NotesEditor control={control} errors={errors} />
			)}
		</div>
	);
};

export { EditingPanel };
