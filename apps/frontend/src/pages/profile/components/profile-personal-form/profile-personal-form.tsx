import React, {
	forwardRef,
	useCallback,
	useEffect,
	useImperativeHandle,
	useMemo,
	useRef,
} from "react";
import { MAX_AGE, MIN_AGE } from "shared/src/libs/constants/numbers.js";

import { Button, Input, Loader } from "~/libs/components/components.js";
import { formatDateForInput } from "~/libs/helpers/date-helpers.js";
import { getClassNames } from "~/libs/helpers/get-class-names.js";
import { useAppForm } from "~/libs/hooks/hooks.js";
import {
	type UserDto,
	type UserUpdateRequestDto,
	userUpdateValidationSchema,
} from "~/modules/users/users.js";
import sharedStyles from "~/pages/auth/components/shared/shared.module.css";

import styles from "../styles.module.css";

type ProfilePersonalFormReference = {
	hasUnsavedChanges: () => boolean;
	submitForm: () => void;
};

type Properties = {
	isLoading?: boolean;
	onSubmit: (payload: UserUpdateRequestDto) => void;
	user: UserDto;
};

const getDefaultValues = (user: UserDto): UserUpdateRequestDto => {
	return {
		dob: user.dob ? formatDateForInput(user.dob) : "",
		email: user.email,
		name: user.name,
	};
};

const ProfilePersonalForm = forwardRef<
	ProfilePersonalFormReference,
	Properties
>(({ isLoading = false, onSubmit, user }, reference) => {
	const { control, errors, handleSubmit, isDirty, isSubmitting, reset } =
		useAppForm<UserUpdateRequestDto>({
			defaultValues: getDefaultValues(user),
			validationSchema: userUpdateValidationSchema,
		});

	const formReference = useRef<HTMLFormElement>(null);

	const dateLimits = useMemo(() => {
		const today = new Date();

		const minAgeDate = new Date();
		minAgeDate.setFullYear(today.getFullYear() - MIN_AGE);

		const maxAgeDate = new Date();
		maxAgeDate.setFullYear(today.getFullYear() - MAX_AGE);

		return {
			max: formatDateForInput(minAgeDate.toISOString()),
			min: formatDateForInput(maxAgeDate.toISOString()),
		};
	}, []);

	useEffect(() => {
		reset(getDefaultValues(user));
	}, [reset, user]);

	useImperativeHandle(reference, () => ({
		hasUnsavedChanges: (): boolean => isDirty,
		submitForm: (): void => {
			void handleSubmit((formData: UserUpdateRequestDto) => {
				onSubmit(formData);
			})();
		},
	}));

	const handleFormSubmit = useCallback(
		(event: React.FormEvent<HTMLFormElement>): void => {
			event.preventDefault();
			void handleSubmit((formData: UserUpdateRequestDto) => {
				onSubmit(formData);
			})();
		},
		[handleSubmit, onSubmit],
	);

	return (
		<form
			className={getClassNames(sharedStyles["form"], "cluster", styles["form"])}
			onSubmit={handleFormSubmit}
			ref={formReference}
		>
			<Input
				control={control}
				errors={errors}
				label="Full Name"
				name="name"
				placeholder="Enter your full name"
			/>

			<Input
				control={control}
				errors={errors}
				label="Email"
				name="email"
				placeholder="Enter your email"
				type="email"
			/>

			<Input
				control={control}
				errors={errors}
				label="Date of Birth"
				max={dateLimits.max}
				min={dateLimits.min}
				name="dob"
				placeholder="YYYY-MM-DD"
				type="date"
			/>

			<Button
				className={styles["submit-button"]}
				isDisabled={!isDirty || isLoading}
				label="Save Changes"
				loader={
					<Loader
						container="inline"
						isLoading={isSubmitting}
						size="small"
						theme="accent"
					/>
				}
				type="submit"
			/>
		</form>
	);
});

ProfilePersonalForm.displayName = "ProfilePersonalForm";

export { ProfilePersonalForm };
export { type ProfilePersonalFormReference };
