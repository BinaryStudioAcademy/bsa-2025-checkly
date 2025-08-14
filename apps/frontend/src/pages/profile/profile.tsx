import React, { useEffect, useMemo } from "react";

import { Button, Input, Loader } from "~/libs/components/components.js";
import { ZERO } from "~/libs/constants/constants.js";
import { formatDateForInput } from "~/libs/helpers/date-helpers.js";
import { getClassNames } from "~/libs/helpers/get-class-names.js";
import {
	useAppDispatch,
	useAppForm,
	useAppSelector,
} from "~/libs/hooks/hooks.js";
import { updateProfile } from "~/modules/auth/slices/actions.js";
import {
	type UserUpdateRequestDto,
	userUpdateValidationSchema,
} from "~/modules/users/users.js";

import sharedStyles from "../auth/components/shared/shared.module.css";
import styles from "./styles.module.css";

const getChangedProfileFields = (
	data: UserUpdateRequestDto,
	defaultValues: UserUpdateRequestDto,
): UserUpdateRequestDto => {
	const changed: UserUpdateRequestDto = {};

	if (data.name !== defaultValues.name && data.name !== undefined) {
		changed.name = data.name;
	}

	if (data.email !== defaultValues.email && data.email !== undefined) {
		changed.email = data.email;
	}

	const currentDob = data.dob ?? "";
	const defaultDob = defaultValues.dob ?? "";

	if (currentDob !== defaultDob) {
		changed.dob = currentDob === "" ? undefined : currentDob;
	}

	const password = data.password ?? "";

	if (password.trim().length > ZERO) {
		changed.password = password;

		if (data.confirmPassword !== undefined) {
			changed.confirmPassword = data.confirmPassword;
		}
	}

	return changed;
};

const Profile: React.FC = () => {
	const dispatch = useAppDispatch();
	const { user } = useAppSelector(({ auth }) => auth);

	const defaultValues = useMemo<UserUpdateRequestDto>(
		() => ({
			confirmPassword: "",
			dob: formatDateForInput(user?.dob ?? null),
			email: user?.email ?? "",
			name: user?.name ?? "",
			password: "",
		}),
		[user],
	);

	const { control, errors, handleSubmit, isDirty, isSubmitting, reset } =
		useAppForm<UserUpdateRequestDto>({
			defaultValues,
			validationSchema: userUpdateValidationSchema,
		});

	useEffect(() => {
		reset(defaultValues);
	}, [defaultValues, reset]);

	const handleFormSubmit = handleSubmit((data) => {
		const changed = getChangedProfileFields(data, defaultValues);

		if (Object.keys(changed).length === ZERO) {
			return;
		}

		void dispatch(updateProfile(changed));
	});

	const contentClasses = getClassNames(
		"grid-pattern",
		styles["light-background"],
		styles["content"],
	);

	return (
		<div className={contentClasses}>
			<div className={styles["profile-container"]}>
				<header className="flow">
					<h1 className={getClassNames(styles["title"])} id="profile-title">
						Profile
					</h1>
				</header>
				<form
					aria-labelledby="profile-title"
					className={getClassNames(sharedStyles["form"], "cluster")}
					// eslint-disable-next-line react/jsx-no-bind
					onSubmit={(event) => {
						event.preventDefault();
						void handleFormSubmit(event);
					}}
				>
					<div className="flow-loose">
						<Input
							control={control}
							errors={errors}
							label="Name"
							name="name"
							required
							type="text"
						/>
						<Input
							control={control}
							errors={errors}
							label="Email"
							name="email"
							required
							type="email"
						/>
						<Input
							control={control}
							errors={errors}
							label="Date of birth"
							name="dob"
							type="date"
						/>
						<Input
							control={control}
							errors={errors}
							label="New password"
							name="password"
							type="password"
						/>
						<Input
							control={control}
							errors={errors}
							label="Confirm password"
							name="confirmPassword"
							type="password"
						/>
					</div>
					<Button
						disabled={isSubmitting || !isDirty}
						label="Save changes"
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
			</div>
		</div>
	);
};

export { Profile };
