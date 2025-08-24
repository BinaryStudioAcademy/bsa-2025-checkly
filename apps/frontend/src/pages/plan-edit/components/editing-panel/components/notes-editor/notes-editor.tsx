import { type FC } from "react";
import { type Control, type FieldErrors } from "react-hook-form";

import { Textarea } from "~/libs/components/components.js";
import { EDITOR_ROWS } from "~/libs/constants/constants.js";
import { type PlanEditForm } from "~/libs/types/types.js";

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
			rows={EDITOR_ROWS}
		/>
	);
};

export { NotesEditor };
