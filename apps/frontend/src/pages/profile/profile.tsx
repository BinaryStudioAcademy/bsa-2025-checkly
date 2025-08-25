import React, { useCallback, useRef } from "react";

import { AvatarEdit, Loader, Tabs } from "~/libs/components/components.js";
import { type Tab } from "~/libs/components/tabs/types/tab.type.js";
import { getClassNames } from "~/libs/helpers/get-class-names.js";
import { useAppDispatch, useAppSelector } from "~/libs/hooks/hooks.js";
import { updateProfile } from "~/modules/auth/slices/actions.js";
import { type UserUpdateRequestDto } from "~/modules/users/users.js";

import {
	ProfilePasswordForm,
	type ProfilePasswordFormReference,
} from "./components/profile-password-form/profile-password-form.js";
import {
	ProfilePersonalForm,
	type ProfilePersonalFormReference,
} from "./components/profile-personal-form/profile-personal-form.js";
import { ProfileTab } from "./libs/enums/enums.js";
import styles from "./styles.module.css";

const Profile: React.FC = () => {
	const dispatch = useAppDispatch();
	const { user } = useAppSelector(({ auth }) => auth);

	const personalFormReference = useRef<ProfilePersonalFormReference>(null);
	const passwordFormReference = useRef<ProfilePasswordFormReference>(null);

	const handleSubmit = useCallback(
		(data: UserUpdateRequestDto) => {
			void dispatch(updateProfile(data));
		},
		[dispatch],
	);

	const handleBeforeTabChange = useCallback((currentTabId: string): boolean => {
		const currentFormReference =
			currentTabId === ProfileTab.PERSONAL
				? personalFormReference.current
				: passwordFormReference.current;

		return !currentFormReference?.hasUnsavedChanges();
	}, []);

	const handleSaveChanges = useCallback((currentTabId: string): void => {
		const currentFormReference =
			currentTabId === ProfileTab.PERSONAL
				? personalFormReference.current
				: passwordFormReference.current;

		currentFormReference?.submitForm();
	}, []);

	if (!user) {
		return <Loader />;
	}

	const tabs: Tab[] = [
		{
			content: (
				<ProfilePersonalForm
					onSubmit={handleSubmit}
					ref={personalFormReference}
					user={user}
				/>
			),
			id: ProfileTab.PERSONAL,
			label: "Personal Information",
		},
		{
			content: (
				<ProfilePasswordForm
					onSubmit={handleSubmit}
					ref={passwordFormReference}
					user={user}
				/>
			),
			id: ProfileTab.PASSWORD,
			label: "Change Password",
		},
	];

	const contentClasses = getClassNames(
		"grid-pattern",
		styles["light-background"],
		styles["content"],
	);

	return (
		<div className={contentClasses}>
			<div className={getClassNames("flow-loose", styles["profile-container"])}>
				<AvatarEdit />
<<<<<<< HEAD
				<h1 className={styles["title"]}>Profile</h1>
				<Tabs
					defaultActiveTab={ProfileTab.PERSONAL}
					onBeforeTabChange={handleBeforeTabChange}
					onSaveChanges={handleSaveChanges}
					tabs={tabs}
				/>
=======
				<div className="flow">
					<header>
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
>>>>>>> 4f808b61 (feat: * refine dashboard styles cy-300)
			</div>
		</div>
	);
};

export { Profile };
