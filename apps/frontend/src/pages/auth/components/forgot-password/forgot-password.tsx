import { Link } from "react-router-dom";

import { Button, Input, Loader, Logo } from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/enums.js";
import { getClassNames } from "~/libs/helpers/helpers.js";
import { useAppForm, useCallback } from "~/libs/hooks/hooks.js";
import {
	type ForgotPasswordRequestDto,
	forgotPasswordValidationSchema,
} from "~/modules/users/users.js";

import { AUTH_PLACEHOLDERS } from "../../libs/constants.js";
import sharedStyles from "../shared/shared.module.css";
import { DEFAULT_FORGOT_PASSWORD_PAYLOAD } from "./libs/constants.js";
import styles from "./styles.module.css";

type Properties = {
	isLoading: boolean;
	onSubmit: (payload: ForgotPasswordRequestDto) => void;
};

const ForgotPassword: React.FC<Properties> = ({
	isLoading,
	onSubmit,
}: Properties) => {
	const containerClasses = getClassNames(
		sharedStyles["container"],
		styles["forgot-password-container"],
		"grid-pattern",
	);
	const authFormContainerClasses = getClassNames(
		sharedStyles["auth-form-container"],
		styles["forgot-password"],
		"wrapper grid-pattern flow-loose",
	);
	const backToSignInLinkClasses = getClassNames(
		sharedStyles["redirect-text__link"],
		styles["sign-in-link"],
	);

	const { control, errors, handleSubmit } =
		useAppForm<ForgotPasswordRequestDto>({
			defaultValues: DEFAULT_FORGOT_PASSWORD_PAYLOAD,
			validationSchema: forgotPasswordValidationSchema,
		});

	const handleFormSubmit = useCallback(
		(event_: React.BaseSyntheticEvent): void => {
			void handleSubmit(onSubmit)(event_);
		},
		[handleSubmit, onSubmit],
	);

	return (
		<div className={containerClasses}>
			<main className={authFormContainerClasses}>
				<Logo />
				<header className="flow">
					<h1 className={sharedStyles["title"]} id="sign-in-title">
						Forgot password?
					</h1>
					<p>Please, enter your email to reset the password</p>
				</header>
				<form
					aria-labelledby="sign-in-title"
					className={getClassNames(sharedStyles["form"], "cluster")}
					noValidate
					onSubmit={handleFormSubmit}
				>
					<div className="flow-loose">
						<Input
							control={control}
							errors={errors}
							label="Email"
							name="email"
							placeholder={AUTH_PLACEHOLDERS.email}
							required
							type="email"
						/>
					</div>
					<Button
						label="Send reset link"
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
				<Link
					aria-label="Go to sign in page"
					className={backToSignInLinkClasses}
					to={AppRoute.SIGN_IN}
				>
					Back to Sign In
				</Link>
			</main>
		</div>
	);
};

export { ForgotPassword };
