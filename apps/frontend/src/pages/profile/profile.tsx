import React, { useCallback, useEffect, useMemo, useState } from "react";
import { MAX_AGE, MIN_AGE } from "shared/src/libs/constants/numbers.js";

import {
	AvatarEdit,
	Button,
	Input,
	Loader,
} from "~/libs/components/components.js";
import { ONE, ZERO } from "~/libs/constants/constants.js";
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
import { ProfileTab } from "./libs/enums/enums.js";
import { type ProfileTabType } from "./libs/types/types.js";
import styles from "./styles.module.css";

const getDefaultValues = (user: UserDto): UserUpdateRequestDto => ({
	confirmPassword: "",
	dob: formatDateForInput(user.dob),
	email: user.email,
	name: user.name,
	password: "",
});

const Profile: React.FC = () => {
	const [activeTab, setActiveTab] = useState<ProfileTabType>(ProfileTab.PERSONAL);

	const personalTabReference = React.useRef<HTMLButtonElement>(null);
	const passwordTabReference = React.useRef<HTMLButtonElement>(null);

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
		(event: React.BaseSyntheticEvent): void => {
			void handleSubmit((data) => {
				if (!isDirty) {
					return;
				}

				void dispatch(updateProfile(data));
			})(event);
		},
		[dispatch, handleSubmit, isDirty],
	);

	const handlePasswordTabClick = useCallback(() => {
		setActiveTab(ProfileTab.PASSWORD);
	}, []);

	const handlePersonalTabClick = useCallback(() => {
		setActiveTab(ProfileTab.PERSONAL);
	}, []);

	const handleTabKeyDown = useCallback(
		(event: React.KeyboardEvent<HTMLButtonElement>): void => {
			if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
				event.preventDefault();
				const nextTab = activeTab === ProfileTab.PERSONAL ? ProfileTab.PASSWORD : ProfileTab.PERSONAL;
				setActiveTab(nextTab);

				if (nextTab === ProfileTab.PERSONAL) {
					personalTabReference.current?.focus();
				} else {
					passwordTabReference.current?.focus();
				}
			}
		},
		[activeTab],
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
					<div className={styles["tabs"]} role="tablist">
						<button
							aria-controls="personal-panel"
							aria-selected={activeTab === ProfileTab.PERSONAL}
							className={getClassNames(
								styles["tab-button"],
								activeTab === ProfileTab.PERSONAL && styles["tab-button--active"],
							)}
							id="personal-tab"
							onClick={handlePersonalTabClick}
							onKeyDown={handleTabKeyDown}
							ref={personalTabReference}
							role="tab"
							tabIndex={activeTab === ProfileTab.PERSONAL ? ZERO : -ONE}
							type="button"
						>
							Personal Information
						</button>
						<button
							aria-controls="password-panel"
							aria-selected={activeTab === ProfileTab.PASSWORD}
							className={getClassNames(
								styles["tab-button"],
								activeTab === ProfileTab.PASSWORD && styles["tab-button--active"],
							)}
							id="password-tab"
							onClick={handlePasswordTabClick}
							onKeyDown={handleTabKeyDown}
							ref={passwordTabReference}
							role="tab"
							tabIndex={activeTab === ProfileTab.PASSWORD ? ZERO : -ONE}
							type="button"
						>
							Change Password
						</button>
					</div>
				</header>

				<form
					aria-labelledby="profile-title"
					className={getClassNames(sharedStyles["form"], "cluster")}
					onSubmit={handleFormSubmit}
				>
					<div className="flow-loose">
						{activeTab === ProfileTab.PERSONAL && (
							<div
								aria-labelledby="personal-tab"
								className="flow"
								id="personal-panel"
								role="tabpanel"
							>
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
									name="dob"
									type="date"
								/>
							</div>
						)}
						{activeTab === ProfileTab.PASSWORD && (
							<div
								aria-labelledby="password-tab"
								className="flow"
								id="password-panel"
								role="tabpanel"
							>

								<Input
									control={control}
									errors={errors}
									label="New password"
									name="password"
									placeholder="Enter new password"
									type="password"
								/>

								<Input
									control={control}
									errors={errors}
									label="Confirm password"
									name="confirmPassword"
									placeholder="Confirm new password"
									type="password"
								/>
							</div>
						)}
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
