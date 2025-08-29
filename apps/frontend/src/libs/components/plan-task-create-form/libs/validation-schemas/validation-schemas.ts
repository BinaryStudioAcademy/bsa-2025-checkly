import { taskCreateValidationSchema } from "shared";
import { type z } from "zod";

const taskCreateFormSchema = taskCreateValidationSchema.pick({
	executionTimeType: true,
	title: true,
});

type TaskCreateFormValues = z.infer<typeof taskCreateFormSchema>;

export { taskCreateFormSchema, type TaskCreateFormValues };
