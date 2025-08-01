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
} from "~/libs/components/components.js";
import { Logo } from "~/libs/components/logo/logo.js";
import { AppRoute } from "~/libs/enums/enums.js";
import { getClassNames } from "~/libs/helpers/helpers.js";
import { useAppForm, useCallback } from "~/libs/hooks/hooks.js";
import {
	type UserSignInRequestDto,
	userSignInValidationSchema,
} from "~/modules/users/users.js";

import { DEFAULT_SIGN_IN_PAYLOAD } from "../sign-up-form/libs/constants.js";
import styles from "./styles.module.css";

type Properties = {
	onSubmit: (payload: UserSignInRequestDto) => void;
};

const SignInForm: React.FC<Properties> = ({ onSubmit }: Properties) => {
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
	);
	const laptopClasses = getClassNames(
		styles["floating-image"],
		styles["laptop"],
		"show-desktop-up",
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
		<div className={getClassNames(styles["container"], "grid-pattern")}>
			<main
				className={getClassNames(
					styles["sign-in"],
					"wrapper grid-pattern flow-loose",
				)}
			>
				<div className="flow-loose">
					<Logo />
					<header className="flow">
						<h1 className={styles["title"]} id="sign-in-title">
							Sign In
						</h1>
						<p>
							No account? Go to&nbsp;
							<Link
								aria-label="Go to create account page"
								className={styles["redirect-text__link"]}
								to={AppRoute.SIGN_UP}
							>
								Create an account
							</Link>
						</p>
					</header>
				</div>
				<form
					aria-labelledby="sign-in-title"
					className={getClassNames(styles["form"], "cluster")}
					onSubmit={handleFormSubmit}
				>
					<div className="flow-loose">
						<Input
							control={control}
							errors={errors}
							label="Email"
							name="email"
							placeholder="Enter your email"
							type="email"
						/>
						<Input
							control={control}
							errors={errors}
							label="Password"
							name="password"
							placeholder="Enter your password"
							type="password"
						/>
					</div>
					<Button label="Sign In" type="submit" />
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
