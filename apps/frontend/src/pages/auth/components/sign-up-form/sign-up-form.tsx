import { Link } from "react-router-dom";

import {
	Car,
	OrangeWhole,
} from "~/assets/img/shared/illustrations/illustrations.img.js";
import {
	StarsPink01,
	StarsYellow02,
} from "~/assets/img/shared/shapes/shapes.img.js";
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

import { AUTH_PLACEHOLDERS } from "../../libs/constants.js";
import { DEFAULT_SIGN_UP_PAYLOAD } from "./libs/constants.js";
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
							Create an account
						</h1>
						<p className={styles["redirect-text"]}>
							Already have an account? Go to{" "}
							<Link
								aria-label="Go to carate account page"
								className={styles["redirect-link"]}
								to={AppRoute.SIGN_IN}
							>
								Sign In
							</Link>
						</p>
					</header>
				</div>
				<form
					aria-labelledby="sign-up-title"
					className={getClassNames(styles["form"], "cluster")}
					onSubmit={handleFormSubmit}
				>
					<div className="flow-loose">
						<Input
							control={control}
							errors={errors}
							label="Name"
							name="name"
							placeholder={AUTH_PLACEHOLDERS.name}
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
							placeholder={AUTH_PLACEHOLDERS.email}
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
							placeholder={AUTH_PLACEHOLDERS.password}
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
							placeholder={AUTH_PLACEHOLDERS.password}
							required
							type="password"
						/>
					</div>
					<Button
						className={styles["sign-up-button"]}
						label="Create an account"
						type="submit"
					/>
				</form>
				<DecorativeImage className={orangeClasses} src={OrangeWhole} />
				<DecorativeImage className={carClasses} src={Car} />
				<DecorativeImage className={blueStarsClasses} src={StarsPink01} />
			</main>
			<DecorativeImage className={yellowStarsClasses} src={StarsYellow02} />
		</div>
	);
};

export { SignUpForm };
