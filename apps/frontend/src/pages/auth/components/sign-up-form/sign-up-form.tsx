import { Link } from "react-router-dom";

import {
	Car,
	OrangeWhole,
} from "~/assets/img/shared/illustrations/illustrations.img.js";
import {
	StarsPink01,
	StarsYellow02,
} from "~/assets/img/shared/shapes/shapes.img.js";
import { Button, Input } from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/app-route.enum.js";
import { getClassNames } from "~/libs/helpers/helpers.js";
import { useAppForm, useCallback } from "~/libs/hooks/hooks.js";
import {
	type SignUpFormValidationSchema,
	type UserSignUpRequestDto,
	userSignUpValidationSchemaExtended,
} from "~/modules/users/users.js";

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
		<div className={styles["container"]}>
			<section className={styles["sign-up-card"]}>
				<header className={styles["logo-container"]}>
					<div className={styles["logo-circle"]} />
					<h2 className={styles["logo-text"]}>Logo</h2>
				</header>

				<div className={styles["form-content"]}>
					<h1 className={styles["title"]}>Create an account</h1>
					<p className={styles["redirect-text"]}>
						Already have an account? Go to{" "}
						<Link className={styles["redirect-link"]} to={AppRoute.SIGN_IN}>
							Sign In
						</Link>
					</p>
					<form className={styles["form"]} onSubmit={handleFormSubmit}>
						<Input
							control={control}
							errors={errors}
							label="Name"
							name="name"
							placeholder="name"
							required
							type="text"
						/>

						<Input
							control={control}
							errors={errors}
							label="Email"
							name="email"
							placeholder="email"
							required
							type="text"
						/>

						<Input
							control={control}
							errors={errors}
							label="Password"
							name="password"
							placeholder="********"
							required
							type="password"
						/>

						<Input
							control={control}
							errors={errors}
							label="Confirm password"
							name="confirmPassword"
							placeholder="********"
							required
							type="password"
						/>
						<Button label="Create an account" type="submit" />
					</form>
				</div>
				<img alt="blue stars" className={blueStarsClasses} src={StarsPink01} />
				<img
					alt="yellow stars"
					className={yellowStarsClasses}
					src={StarsYellow02}
				/>
				<img alt="orange" className={orangeClasses} src={OrangeWhole} />
				<img alt="car" className={carClasses} src={Car} />
			</section>
		</div>
	);
};

export { SignUpForm };
