import { type FC } from "react";
import { type Control, type FieldErrors } from "react-hook-form";

import { Textarea } from "~/libs/components/components.js";
import { type PlanEditForm } from "~/pages/plan-edit/libs/types/plan-edit-form.type.js";

type Properties = {
	control: Control<PlanEditForm>;
	errors: FieldErrors<PlanEditForm>;
};

const NotesEditor: FC<Properties> = ({ control, errors }) => {
	return (
		<Textarea
			control={control}
			errors={errors}
			label="Your Notes"
			name="notes"
			placeholder="Add any extra notes here..."
			rows={10}
		/>
	);
};

export { NotesEditor };
