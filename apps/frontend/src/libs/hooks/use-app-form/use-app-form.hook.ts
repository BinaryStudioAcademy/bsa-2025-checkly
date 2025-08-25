import { zodResolver } from "@hookform/resolvers/zod";
import {
	type Control,
	type DefaultValues,
	type FieldErrors,
	type FieldValues,
	useForm,
	type UseFormGetValues,
	type UseFormHandleSubmit,
	type UseFormProps,
	type UseFormReset,
	type UseFormSetError,
	type UseFormWatch,
	type ValidationMode,
} from "react-hook-form";

import { type ValidationSchema } from "~/libs/types/types.js";

type Parameters<T extends FieldValues = FieldValues> = {
	defaultValues: DefaultValues<T>;
	mode?: keyof ValidationMode;
	validationSchema?: ValidationSchema;
};

type ReturnValue<T extends FieldValues = FieldValues> = {
	control: Control<T, null>;
	errors: FieldErrors<T>;
	getValues: UseFormGetValues<T>;
	handleSubmit: UseFormHandleSubmit<T>;
	isDirty: boolean;
	isSubmitting: boolean;
	reset: UseFormReset<T>;
	setError?: UseFormSetError<T>;
	watch?: UseFormWatch<T>;
};

const useAppForm = <T extends FieldValues = FieldValues>({
	defaultValues,
	mode = "onSubmit",
	validationSchema,
}: Parameters<T>): ReturnValue<T> => {
	let parameters: UseFormProps<T> = {
		defaultValues,
		mode,
	};

	if (validationSchema) {
		parameters = {
			...parameters,
			resolver: zodResolver(validationSchema),
		};
	}

	const {
		control,
		formState: { errors, isDirty, isSubmitting },
		getValues,
		handleSubmit,
		reset,
		setError,
		watch,
	} = useForm<T>(parameters);

	return {
		control,
		errors,
		getValues,
		handleSubmit,
		isDirty,
		isSubmitting,
		reset,
		setError,
		watch,
	};
};

export { useAppForm };
