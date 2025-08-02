import { Link } from "react-router-dom";

import {
	blueStars,
	carImage,
	orangeImage,
	yellowStars,
} from "~/assets/img/sign-up/sign-up.img.js";
import {
	Button,
	DecorativeImage,
	Input,
} from "~/libs/components/components.js";
import { Logo } from "~/libs/components/logo/logo.js";
import { AppRoute } from "~/libs/enums/app-route.enum.js";
import { getClassNames } from "~/libs/helpers/helpers.js";
import { useAppForm, useCallback } from "~/libs/hooks/hooks.js";
import {
	type SignUpFormValidationSchema,
	type UserSignUpRequestDto,
	userSignUpValidationSchemaExtended,
} from "~/modules/users/users.js";

import {
	COMMON_AUTH_PLACEHOLDER,
	DEFAULT_SIGN_UP_PAYLOAD,
} from "./libs/constants.js";
import styles from "./sign-up-form.module.css";

type Properties = {
	onSubmit: (payload: UserSignUpRequestDto) => void;
};

const SignUpForm: React.FC<Properties> = ({ onSubmit }: Properties) => {
	const { control, errors, handleSubmit } =
		useAppForm<SignUpFormValidationSchema>({
			defaultValues: { ...DEFAULT_SIGN_UP_PAYLOAD, confirmPassword: "" },
			validationSchema: userSignUpValidationSchemaExtended,
		});
	const handleFormSubmit = useCallback(
		(event_: React.BaseSyntheticEvent): void => {
			void handleSubmit((data) => {
				onSubmit(data as UserSignUpRequestDto);
			})(event_);
		},
		[handleSubmit, onSubmit],
	);
	const blueStarsClasses = getClassNames(
		styles["image-position"],
		styles["blue-stars"],
	);
	const yellowStarsClasses = getClassNames(
		styles["image-position"],
		styles["yellow-stars"],
	);
	const orangeClasses = getClassNames(
		styles["image-position"],
		styles["orange-image"],
	);
	const carClasses = getClassNames(
		styles["image-position"],
		styles["car-image"],
	);

	return (
		<div className={getClassNames("grid-pattern", styles["container"])}>
			<div className={getClassNames("grid-pattern", styles["sign-up-card"])}>
				<header className={styles["logo-container"]}>
					<Logo />
				</header>

				<main className={styles["form-content"]}>
					<h1 className={styles["title"]}>Create an account</h1>
					<p className={styles["redirect-text"]}>
						Already have an account? Go to{" "}
						<Link
							aria-label="Go to sign in page"
							className={styles["redirect-link"]}
							to={AppRoute.SIGN_IN}
						>
							Sign In
						</Link>
					</p>
					<form
						aria-labelledby="sign-in-title"
						className={styles["form"]}
						onSubmit={handleFormSubmit}
					>
						<div className="flow-loose">
							<Input
								control={control}
								errors={errors}
								label="Name"
								name="name"
								placeholder="Enter your name"
								required
								type="text"
							/>
						</div>
						<div className="flow-loose">
							<Input
								control={control}
								errors={errors}
								label="Email"
								name="email"
								placeholder={COMMON_AUTH_PLACEHOLDER.email}
								required
								type="text"
							/>
						</div>
						<div className="flow-loose">
							<Input
								control={control}
								errors={errors}
								label="Password"
								name="password"
								placeholder={COMMON_AUTH_PLACEHOLDER.password}
								required
								type="password"
							/>
						</div>
						<div className="flow-loose">
							<Input
								control={control}
								errors={errors}
								label="Confirm password"
								name="confirmPassword"
								placeholder={COMMON_AUTH_PLACEHOLDER.password}
								required
								type="password"
							/>
						</div>
						<Button label="Create an account" type="submit" />
					</form>
				</main>
				<DecorativeImage className={blueStarsClasses} src={blueStars} />
				<DecorativeImage className={yellowStarsClasses} src={yellowStars} />
				<DecorativeImage className={orangeClasses} src={orangeImage} />
				<DecorativeImage className={carClasses} src={carImage} />
			</div>
		</div>
	);
};

export { SignUpForm };
