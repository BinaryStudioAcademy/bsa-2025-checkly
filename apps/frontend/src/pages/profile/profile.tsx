import React, { useMemo } from "react";

import { Button, Input, Loader } from "~/libs/components/components.js";
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

type ProfileFormValues = UserUpdateRequestDto & { confirmPassword?: string };

import { DataStatus } from "~/libs/enums/data-status.enum.js";
import { formatDateForInput } from "~/libs/helpers/date-helpers.js";

import sharedStyles from "../auth/components/shared/shared.module.css";
import styles from "./styles.module.css";

const Profile: React.FC = () => {
	const dispatch = useAppDispatch();
	const { dataStatus, user } = useAppSelector(({ auth }) => auth);
	const isLoading = dataStatus === DataStatus.PENDING;

	const defaultValues = useMemo<ProfileFormValues>(
		() => ({
			confirmPassword: "",
			dob: formatDateForInput(user?.dob ?? null),
			email: user?.email ?? "",
			name: user?.name ?? "",
			password: "",
		}),
		[user],
	);

	const { control, errors, handleSubmit } = useAppForm<ProfileFormValues>({
		defaultValues,
		validationSchema: userUpdateValidationSchema,
	});

	const handleFormSubmit = handleSubmit((data) => {
		const payload: UserUpdateRequestDto = {
			dob: data.dob || null,
			email: data.email,
			name: data.name,
			password: data.password?.trim() ? data.password : "",
		};

		void dispatch(updateProfile(payload));
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
						disabled={isLoading}
						label="Save changes"
						loader={
							<Loader
								container="inline"
								isLoading={isLoading}
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
