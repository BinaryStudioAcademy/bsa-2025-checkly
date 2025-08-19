import { Link } from "react-router-dom";

import {
	CupGreen,
	Laptop,
} from "~/assets/img/shared/illustrations/illustrations.img.js";
import {
	StarsPink01,
	StarsYellow02,
	TwinklesYellow,
} from "~/assets/img/shared/shapes/shapes.img.js";
import {
	Button,
	DecorativeImage,
	Input,
	Loader,
} from "~/libs/components/components.js";
import { Logo } from "~/libs/components/logo/logo.js";
import { AppRoute } from "~/libs/enums/enums.js";
import { getClassNames } from "~/libs/helpers/helpers.js";
import { useAppForm, useCallback } from "~/libs/hooks/hooks.js";
import {
	type UserSignInRequestDto,
	userSignInValidationSchema,
} from "~/modules/users/users.js";

import { AUTH_PLACEHOLDERS } from "../../libs/constants.js";
import sharedStyles from "../shared/shared.module.css";
import { DEFAULT_SIGN_IN_PAYLOAD } from "../sign-in-form/libs/constants.js";
import styles from "./styles.module.css";

type Properties = {
	isLoading: boolean;
	onSubmit: (payload: UserSignInRequestDto) => void;
};

const SignInForm: React.FC<Properties> = ({
	isLoading,
	onSubmit,
}: Properties) => {
	const pinkStarsClasses = getClassNames(
		styles["floating-image"],
		styles["pink-stars"],
	);
	const yellowStarsClasses = getClassNames(
		styles["floating-image"],
		styles["yellow-stars"],
		"show-desktop-up",
	);
	const twinklesClasses = getClassNames(
		styles["floating-image"],
		styles["twinkles"],
		"show-desktop-up",
	);
	const laptopClasses = getClassNames(
		styles["floating-image"],
		styles["laptop"],
		"show-desktop-up",
	);
	const containerClasses = getClassNames(
		sharedStyles["container"],
		styles["sign-in-container"],
		"grid-pattern",
	);
	const authFormContainerClasses = getClassNames(
		sharedStyles["auth-form-container"],
		styles["sign-in"],
		"wrapper grid-pattern flow-loose",
	);
	const cupClasses = getClassNames(styles["floating-image"], styles["cup"]);
	const { control, errors, handleSubmit } = useAppForm<UserSignInRequestDto>({
		defaultValues: DEFAULT_SIGN_IN_PAYLOAD,
		validationSchema: userSignInValidationSchema,
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
						Sign In
					</h1>
					<p>
						No account? Go to&nbsp;
						<Link
							aria-label="Go to create account page"
							className={sharedStyles["redirect-text__link"]}
							to={AppRoute.SIGN_UP}
						>
							Create an account
						</Link>
					</p>
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
							placeholder={AUTH_PLACEHOLDERS.EMAIL}
							required
							type="email"
						/>
						<Input
							control={control}
							errors={errors}
							label="Password"
							name="password"
							placeholder={AUTH_PLACEHOLDERS.PASSWORD}
							required
							type="password"
						/>
					</div>
					<Button
						label="Sign In"
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
				<DecorativeImage className={pinkStarsClasses} src={StarsPink01} />
				<DecorativeImage className={cupClasses} src={CupGreen} />
			</main>
			<DecorativeImage className={yellowStarsClasses} src={StarsYellow02} />
			<DecorativeImage className={twinklesClasses} src={TwinklesYellow} />
			<DecorativeImage className={laptopClasses} src={Laptop} />
		</div>
	);
};

export { SignInForm };
