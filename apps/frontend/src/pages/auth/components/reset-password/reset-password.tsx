import { useSearchParams } from "react-router-dom";

import { Button, Input, Loader, Logo } from "~/libs/components/components.js";
import { getClassNames } from "~/libs/helpers/helpers.js";
import { useAppForm, useAppSelector, useCallback } from "~/libs/hooks/hooks.js";
import { useVerifyToken } from "~/libs/hooks/use-verify-token/use-verify-token.hook.js";
import {
	type ResetPasswordFormValidationSchema,
	type ResetPasswordRequestDto,
	resetPasswordValidationSchema,
} from "~/modules/users/users.js";

import { AUTH_PLACEHOLDERS } from "../../libs/constants.js";
import sharedStyles from "../shared/shared.module.css";
import { getDefaultResetPasswordValues } from "./libs/helpers/get-default-reset-password-values.helper.js";
import styles from "./styles.module.css";

const TOKEN = "token";
const USER_ID = "userId";

type Properties = {
	isLoading: boolean;
	onSubmit: (payload: ResetPasswordRequestDto) => void;
};

const ResetPassword: React.FC<Properties> = ({
	isLoading,
	onSubmit,
}: Properties) => {
	const [searchParameters] = useSearchParams();

	const token = searchParameters.get(TOKEN) as string;
	const userId = Number.parseInt(searchParameters.get(USER_ID) as string);

	useVerifyToken({ token, userId });

	const { isPreparing } = useAppSelector(({ auth }) => auth);

	const containerClasses = getClassNames(
		sharedStyles["container"],
		styles["reset-password-container"],
		"grid-pattern",
	);
	const authFormContainerClasses = getClassNames(
		sharedStyles["auth-form-container"],
		styles["reset-password"],
		"wrapper grid-pattern flow-loose",
	);

	const { control, errors, handleSubmit } = useAppForm<
		ResetPasswordFormValidationSchema & ResetPasswordRequestDto
	>({
		defaultValues: getDefaultResetPasswordValues(userId),
		validationSchema: resetPasswordValidationSchema,
	});

	const handleFormSubmit = useCallback(
		(event_: React.BaseSyntheticEvent): void => {
			void handleSubmit((formData) => {
				const payload: ResetPasswordRequestDto = {
					...formData,
					userId,
				};
				onSubmit(payload);
			})(event_);
		},
		[handleSubmit, onSubmit, userId],
	);

	if (isPreparing) {
		return <Loader />;
	}

	return (
		<div className={containerClasses}>
			<main className={authFormContainerClasses}>
				<Logo />
				<header className="flow">
					<h1 className={sharedStyles["title"]} id="reset-password-title">
						Reset your password
					</h1>
					<p>Please, enter your new password</p>
				</header>
				<form
					aria-labelledby="reset-password-title"
					className={getClassNames(sharedStyles["form"], "cluster")}
					noValidate
					onSubmit={handleFormSubmit}
				>
					<div className="flow-loose">
						<Input
							control={control}
							errors={errors}
							label="New password"
							name="password"
							placeholder={AUTH_PLACEHOLDERS.password}
							required
							type="password"
						/>
						<Input
							control={control}
							errors={errors}
							label="Confirm password"
							name="confirmPassword"
							placeholder={AUTH_PLACEHOLDERS.password}
							required
							type="password"
						/>
					</div>
					<Button
						label="Reset password"
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
			</main>
		</div>
	);
};

export { ResetPassword };
