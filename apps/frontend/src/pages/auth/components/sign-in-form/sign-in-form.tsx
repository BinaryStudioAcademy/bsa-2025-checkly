import { Link } from "react-router-dom";

import {
	cup,
	laptop,
	logo,
	pinkStars,
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
			<section
				className={getClassNames(
					styles["sign-in"],
					"wrapper grid-pattern flow-loose",
				)}
			>
				<header className="cluster">
					<img alt="checkly logo" src={logo} />
					<h3>Logo</h3>
				</header>
				<div className="flow">
					<h1 className={styles["title"]}>Sign In</h1>
					<p>
						No account? Go to&nbsp;
						<Link
							className={styles["redirect-text__link"]}
							to={AppRoute.SIGN_UP}
						>
							Create an account
						</Link>
					</p>
				</div>
				<form
					className={getClassNames(styles["form"], "cluster flow")}
					onSubmit={handleFormSubmit}
				>
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
					<Button label="Sign In" type="submit" />
				</form>
				<img
					alt="floating-image"
					className={pinkStarsClasses}
					src={pinkStars}
				/>
				<img
					alt="floating-image"
					className={yellowStarsClasses}
					src={yellowStars}
				/>
				<img alt="floating-image" className={twinklesClasses} src={twinkles} />
				<img alt="floating-image" className={laptopClasses} src={laptop} />
				<img alt="floating-image" className={cupClasses} src={cup} />
			</section>
		</div>
	);
};

export { SignInForm };
