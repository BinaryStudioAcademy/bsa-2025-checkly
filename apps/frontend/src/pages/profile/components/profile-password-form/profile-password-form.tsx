import React, { useCallback } from "react";

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

const ProfilePasswordForm: React.FC<Properties> = ({
	isLoading = false,
	onSubmit,
}) => {
	const { control, errors, handleSubmit, isDirty, isSubmitting, reset } =
		useAppForm<UserUpdateRequestDto>({
			defaultValues: getDefaultValues(),
			validationSchema: userUpdateValidationSchema,
		});

	const onFormSubmit = useCallback(
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
			onSubmit={onFormSubmit}
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
};

export { ProfilePasswordForm };
