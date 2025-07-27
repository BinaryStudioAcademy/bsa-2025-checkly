import { Link } from "react-router-dom";

import {
	blueStars,
	cup,
	laptop,
	logo,
	twinkles,
	yellowStars,
} from "~/assets/img/sign-in/sign-in.img.js";
import { Button, Input } from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/enums.js";
import { getClassNames } from "~/libs/helpers/helpers.js";
import { useAppForm, useCallback } from "~/libs/hooks/hooks.js";
import {
	type UserSignInRequestDto,
	userSignInValidationSchema,
} from "~/modules/users/users.js";

import { DEFAULT_SIGN_IN_PAYLOAD } from "../sign-up-form/libs/constants.js";
import styles from "./style.module.css";

type Properties = {
	onSubmit: (payload: UserSignInRequestDto) => void;
};

const SignInForm: React.FC<Properties> = ({ onSubmit }: Properties) => {
	const blueStarsClasses = getClassNames(
		styles["floating-image"],
		styles["blue-stars"],
	);
	const yellowStarsClasses = getClassNames(
		styles["floating-image"],
		styles["yellow-stars"],
	);
	const twinklesClasses = getClassNames(
		styles["floating-image"],
		styles["twinkles"],
	);
	const laptopClasses = getClassNames(
		styles["floating-image"],
		styles["laptop"],
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
		<>
			<div className={getClassNames(styles["wrapper"], "grid-pattern")}>
				<section className={getClassNames(styles["sign-in"], "grid-pattern")}>
					<header className={styles["header"]}>
						<img alt="logo" src={logo} />
						<h2 className={styles["header__title"]}>Logo</h2>
					</header>
					<h1 className={styles["title"]}>Sign In</h1>
					<p className={styles["redirect-text"]}>
						No account? Go to&nbsp;
						<Link
							className={styles["redirect-text__link"]}
							to={AppRoute.SIGN_UP}
						>
							Create an account
						</Link>
					</p>
					<form className={styles["form"]} onSubmit={handleFormSubmit}>
						<p className={styles["form__input"]}>
							<Input
								control={control}
								errors={errors}
								label="Email"
								name="email"
								placeholder="Enter your email"
								type="email"
							/>
						</p>
						<p className={styles["form__input"]}>
							<Input
								control={control}
								errors={errors}
								label="Password"
								name="password"
								placeholder="Enter your password"
								type="password"
							/>
						</p>
						<Button label="Sign In" type="submit" />
					</form>
					<img
						alt="floating-image"
						className={blueStarsClasses}
						src={blueStars}
					/>
					<img
						alt="floating-image"
						className={yellowStarsClasses}
						src={yellowStars}
					/>
					<img
						alt="floating-image"
						className={twinklesClasses}
						src={twinkles}
					/>
					<img alt="floating-image" className={laptopClasses} src={laptop} />
					<img alt="floating-image" className={cupClasses} src={cup} />
				</section>
			</div>
		</>
	);
};

export { SignInForm };
