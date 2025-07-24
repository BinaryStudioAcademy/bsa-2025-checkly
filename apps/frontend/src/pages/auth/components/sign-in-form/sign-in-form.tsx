import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { userSignInValidationSchema } from "shared";
import { type UserSignInRequestDto } from "shared/src/modules/users/libs/types/types.js";

import logo from "~/assets/img/logo-placeholder.svg";
import { Button, Input } from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/enums.js";
import { useAppForm, useCallback } from "~/libs/hooks/hooks.js";

import { DEFAULT_SIGN_IN_PAYLOAD } from "../sign-up-form/libs/constants.js";
import styles from "./style.module.css";

type Properties = {
	onSubmit: (payload: UserSignInRequestDto) => void;
};

const SignInForm: React.FC<Properties> = ({ onSubmit }: Properties) => {
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
			<div className={styles["wrapper"]}>
				<header className={styles["header"]}>
					<img alt="logo" src={logo} />
					<h2 className={styles["header__title"]}>Logo</h2>
				</header>
				<h1 className={styles["title"]}>Sign In</h1>
				<p className={styles["redirect-text"]}>
					No account? Go to&nbsp;
					<Link className={styles["redirect-text__link"]} to={AppRoute.SIGN_UP}>
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
							type="text"
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
			</div>
			<ToastContainer />
		</>
	);
};

export { SignInForm };
