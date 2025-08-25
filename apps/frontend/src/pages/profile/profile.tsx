import React, { useCallback, useEffect, useMemo } from "react";
import { MAX_AGE, MIN_AGE } from "shared/src/libs/constants/numbers.js";

import {
	AvatarEdit,
	Button,
	Input,
	Loader,
} from "~/libs/components/components.js";
import { formatDateForInput } from "~/libs/helpers/date-helpers.js";
import { getClassNames } from "~/libs/helpers/get-class-names.js";
import {
	useAppDispatch,
	useAppForm,
	useAppSelector,
} from "~/libs/hooks/hooks.js";
import { updateProfile } from "~/modules/auth/slices/actions.js";
import {
	type UserDto,
	type UserUpdateRequestDto,
	userUpdateValidationSchema,
} from "~/modules/users/users.js";

import sharedStyles from "../auth/components/shared/shared.module.css";
import styles from "./styles.module.css";

const getDefaultValues = (user: UserDto): UserUpdateRequestDto => ({
	confirmPassword: "",
	dob: formatDateForInput(user.dob),
	email: user.email,
	name: user.name,
	password: "",
});

const Profile: React.FC = () => {
	const dispatch = useAppDispatch();
	const { user } = useAppSelector(({ auth }) => auth);

	const defaultValues = useMemo<UserUpdateRequestDto>(
		() => getDefaultValues(user as UserDto),
		[user],
	);

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

	const { control, errors, handleSubmit, isDirty, isSubmitting, reset } =
		useAppForm<UserUpdateRequestDto>({
			defaultValues,
			validationSchema: userUpdateValidationSchema,
		});

	useEffect(() => {
		reset(defaultValues);
	}, [defaultValues, reset]);

	const handleFormSubmit = useCallback(
		(event_: React.BaseSyntheticEvent): void => {
			void handleSubmit((data) => {
				if (!isDirty) {
					return;
				}

				void dispatch(updateProfile(data));
			})(event_);
		},
		[dispatch, handleSubmit, isDirty],
	);

	const contentClasses = getClassNames(
		"grid-pattern",
		styles["light-background"],
		styles["content"],
	);

	return (
		<div className={contentClasses}>
			<div className={styles["profile-container"]}>
				<AvatarEdit />
				<header className="flow">
					<h1 className={getClassNames(styles["title"])} id="profile-title">
						Profile
					</h1>
				</header>
				<form
					aria-labelledby="profile-title"
					className={getClassNames(sharedStyles["form"], "cluster")}
					onSubmit={handleFormSubmit}
				>
					<div className="flow-loose">
						<Input
							control={control}
							errors={errors}
							isRequired
							label="Name"
							name="name"
							type="text"
						/>
						<Input
							control={control}
							errors={errors}
							isRequired
							label="Email"
							name="email"
							type="email"
						/>
						<Input
							control={control}
							errors={errors}
							label="Date of birth"
							max={dateLimits.max}
							min={dateLimits.min}
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
						isDisabled={isSubmitting || !isDirty}
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
