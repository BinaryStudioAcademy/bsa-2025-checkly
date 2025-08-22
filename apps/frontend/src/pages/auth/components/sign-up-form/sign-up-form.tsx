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
	Loader,
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
import sharedStyles from "../shared/shared.module.css";
import { DEFAULT_SIGN_UP_PAYLOAD } from "./libs/constants.js";
import styles from "./sign-up-form.module.css";

type Properties = {
	isLoading: boolean;
	onSubmit: (payload: UserSignUpRequestDto) => void;
};

const SignUpForm: React.FC<Properties> = ({
	isLoading,
	onSubmit,
}: Properties) => {
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
	const containerClasses = getClassNames(
		sharedStyles["container"],
		styles["sign-up-container"],
		"grid-pattern",
	);
	const authFormContainerClasses = getClassNames(
		sharedStyles["auth-form-container"],
		styles["sign-up"],
		"wrapper grid-pattern flow-loose",
	);

	return (
		<div className={containerClasses}>
			<main className={authFormContainerClasses}>
				<Logo />
				<header className="flow">
					<h1 className={sharedStyles["title"]} id="sign-up-title">
						Create an account
					</h1>
					<p className={sharedStyles["redirect-text"]}>
						Already have an account? Go to{" "}
						<Link aria-label="Go to create account page" to={AppRoute.SIGN_IN}>
							Sign In
						</Link>
					</p>
				</header>
				<form
					aria-labelledby="sign-up-title"
					className={getClassNames(sharedStyles["form"], "cluster")}
					noValidate
					onSubmit={handleFormSubmit}
				>
					<div className="flow-loose">
						<Input
							control={control}
							errors={errors}
							isRequired
							label="Name"
							name="name"
							placeholder={AUTH_PLACEHOLDERS.NAME}
							type="text"
						/>
						<Input
							control={control}
							errors={errors}
							isRequired
							label="Email"
							name="email"
							placeholder={AUTH_PLACEHOLDERS.EMAIL}
							type="text"
						/>
						<Input
							control={control}
							errors={errors}
							isRequired
							label="Password"
							name="password"
							placeholder={AUTH_PLACEHOLDERS.PASSWORD}
							type="password"
						/>
						<Input
							control={control}
							errors={errors}
							isRequired
							label="Confirm password"
							name="confirmPassword"
							placeholder={AUTH_PLACEHOLDERS.PASSWORD}
							type="password"
						/>
					</div>
					<Button
						label="Create an account"
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
				<DecorativeImage className={orangeClasses} src={OrangeWhole} />
				<DecorativeImage className={carClasses} src={Car} />
				<DecorativeImage className={blueStarsClasses} src={StarsPink01} />
			</main>
			<DecorativeImage className={yellowStarsClasses} src={StarsYellow02} />
		</div>
	);
};

export { SignUpForm };
