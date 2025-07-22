import { Link } from "react-router";
import { userSignUpValidationSchema } from "shared";
import { type UserSignInRequestDto } from "shared/src/modules/users/libs/types/types.js";

import logo from "~/assets/img/logo-placeholder.svg";
import { Button, Input } from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/enums.js";
import { useAppForm, useCallback } from "~/libs/hooks/hooks.js";

import { DEFAULT_SIGN_UP_PAYLOAD } from "../sign-up-form/libs/constants.js";

type Properties = {
	onSubmit: (payload: UserSignInRequestDto) => void;
};

const SignInForm: React.FC<Properties> = ({ onSubmit }: Properties) => {
	const { control, errors, handleSubmit } = useAppForm<UserSignInRequestDto>({
		defaultValues: DEFAULT_SIGN_UP_PAYLOAD,
		validationSchema: userSignUpValidationSchema,
	});

	const handleFormSubmit = useCallback(
		(event_: React.BaseSyntheticEvent): void => {
			void handleSubmit(onSubmit)(event_);
		},
		[handleSubmit, onSubmit],
	);

	return (
		<>
			<div>
				<header>
					<img alt="logo" src={logo} />
					<h2>Logo</h2>
				</header>
				<h1>Sign In</h1>
				<p>
					No account? Go to&nbsp;
					<Link to={AppRoute.SIGN_UP}>Create an account</Link>
				</p>
				<form onSubmit={handleFormSubmit}>
					<p>
						<Input
							control={control}
							errors={errors}
							label="Email"
							name="email"
							placeholder="Enter your email"
							type="text"
						/>
					</p>
					<p>
						<Input
							control={control}
							errors={errors}
							label="Password"
							name="password"
							placeholder="Enter your password"
							type="text"
						/>
					</p>
					<Button label="Sign In" type="submit" />
				</form>
			</div>
		</>
	);
};

export { SignInForm };
