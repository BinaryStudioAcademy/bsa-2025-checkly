import React, { useCallback } from "react";

import { AvatarEdit, Loader, Tabs } from "~/libs/components/components.js";
import { type Tab } from "~/libs/components/tabs/types/tab.type.js";
import { getClassNames } from "~/libs/helpers/get-class-names.js";
import { useAppDispatch, useAppSelector } from "~/libs/hooks/hooks.js";
import { updateProfile } from "~/modules/auth/slices/actions.js";
import { type UserUpdateRequestDto } from "~/modules/users/users.js";

import { ProfilePasswordForm } from "./components/profile-password-form/profile-password-form.js";
import { ProfilePersonalForm } from "./components/profile-personal-form/profile-personal-form.js";
import { ProfileTab } from "./libs/enums/enums.js";
import styles from "./styles.module.css";

const Profile: React.FC = () => {
	const dispatch = useAppDispatch();
	const { user } = useAppSelector(({ auth }) => auth);

	const handleSubmit = useCallback(
		(data: UserUpdateRequestDto) => {
			void dispatch(updateProfile(data));
		},
		[dispatch],
	);

	if (!user) {
		return <Loader />;
	}

	const tabs: Tab[] = [
		{
			content: <ProfilePersonalForm onSubmit={handleSubmit} user={user} />,
			id: ProfileTab.PERSONAL,
			label: "Personal Information",
		},
		{
			content: <ProfilePasswordForm onSubmit={handleSubmit} user={user} />,
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
			<div className={styles["profile-container"]}>
				<AvatarEdit />
				<h1 className={styles["title"]}>Profile</h1>
				<Tabs defaultActiveTab={ProfileTab.PERSONAL} tabs={tabs} />
			</div>
		</div>
	);
};

export { Profile };
