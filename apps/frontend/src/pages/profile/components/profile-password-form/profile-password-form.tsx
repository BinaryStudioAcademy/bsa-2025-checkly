import React, {
	forwardRef,
	useCallback,
	useImperativeHandle,
	useRef,
} from "react";

import { Button, Input, Loader } from "~/libs/components/components.js";
import { getClassNames } from "~/libs/helpers/get-class-names.js";
import { useAppForm } from "~/libs/hooks/hooks.js";
import {
	type UserDto,
	type UserUpdateRequestDto,
	userUpdateValidationSchema,
} from "~/modules/users/users.js";
import sharedStyles from "~/pages/auth/components/shared/shared.module.css";

import styles from "../styles.module.css";

type ProfilePasswordFormReference = {
	hasUnsavedChanges: () => boolean;
	submitForm: () => void;
};

type Properties = {
	isLoading?: boolean;
	onSubmit: (payload: UserUpdateRequestDto) => void;
	user: UserDto;
};

const getDefaultValues = (): UserUpdateRequestDto => {
	return {
		confirmPassword: "",
		currentPassword: "",
		password: "",
	};
};

const ProfilePasswordForm = forwardRef<
	ProfilePasswordFormReference,
	Properties
>(({ isLoading = false, onSubmit }, reference) => {
	const { control, errors, handleSubmit, isDirty, isSubmitting, reset } =
		useAppForm<UserUpdateRequestDto>({
			defaultValues: getDefaultValues(),
			validationSchema: userUpdateValidationSchema,
		});

	const formReference = useRef<HTMLFormElement>(null);

	useImperativeHandle(reference, () => ({
		hasUnsavedChanges: (): boolean => isDirty,
		submitForm: (): void => {
			void handleSubmit((formData: UserUpdateRequestDto) => {
				onSubmit(formData);
				reset(getDefaultValues());
			})();
		},
	}));

	const handleFormSubmit = useCallback(
		(event: React.FormEvent<HTMLFormElement>): void => {
			event.preventDefault();
			void handleSubmit((formData: UserUpdateRequestDto) => {
				onSubmit(formData);
				reset(getDefaultValues());
			})();
		},
		[handleSubmit, onSubmit, reset],
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
				label="Current Password"
				name="currentPassword"
				placeholder="Enter your current password"
				type="password"
			/>

			<Input
				control={control}
				errors={errors}
				label="New Password"
				name="password"
				placeholder="Enter your new password"
				type="password"
			/>

			<Input
				control={control}
				errors={errors}
				label="Confirm New Password"
				name="confirmPassword"
				placeholder="Confirm your new password"
				type="password"
			/>

			<Button
				className={styles["submit-button"]}
				isDisabled={!isDirty || isLoading}
				label="Change Password"
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

ProfilePasswordForm.displayName = "ProfilePasswordForm";

export { ProfilePasswordForm };
export { type ProfilePasswordFormReference };
