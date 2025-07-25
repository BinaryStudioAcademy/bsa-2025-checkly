import { Link } from "react-router-dom";
import { type SignUpFormValidationSchema, userSignUpValidationSchemaExtended } from "shared";

import {
	blueStars,
	carImage,
	orangeImage,
	yellowStars,
} from "~/assets/img/sign-up/sign-up.img.js";
import { Button, Input } from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/app-route.enum.js";
import { useAppForm, useCallback } from "~/libs/hooks/hooks.js";
import { type UserSignUpRequestDto } from "~/modules/users/users.js";

import { DEFAULT_SIGN_UP_PAYLOAD } from "./libs/constants.js";
import css from "./sign-up-form.module.css";

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
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				const { confirmPassword, ...payloadToSend } = data;
				onSubmit(payloadToSend as UserSignUpRequestDto);
			})(event_);
		},
		[handleSubmit, onSubmit],
	);

	return (
		<div className={css["container"]}>
			<section className={css["sign-up-card"]}>
				<header className={css["logo-container"]}>
					<div className={css["logo-circle"]} />
					<h2 className={css["logo-text"]}>Logo</h2>
				</header>

				<div className={css["form-content"]}>
					<h1 className={css["title"]}>Create an account</h1>
					<p className={css["redirect-text"]}>
						Already have an account? Go to{" "}
						<Link className={css["redirect-link"]} to={AppRoute.SIGN_IN}>
							Sign In
						</Link>
					</p>
					<form className={css["form"]} onSubmit={handleFormSubmit}>
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
				<img
					alt="blue stars"
					className={`${css["image-position"] as string} ${css["blue-stars"] as string}`}
					src={blueStars}
				/>
				<img
					alt="yellow stars"
					className={`${css["image-position"] as string} ${css["yellow-stars"] as string}`}
					src={yellowStars}
				/>
				<img
					alt="orange"
					className={`${css["image-position"] as string} ${css["orange-image"] as string}`}
					src={orangeImage}
				/>
				<img
					alt="car"
					className={`${css["image-position"] as string} ${css["car-image"] as string}`}
					src={carImage}
				/>
			</section>
		</div>
	);
};

export { SignUpForm };
