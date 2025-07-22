import { useNavigate } from "react-router-dom";

import { Button, Input } from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/app-route.enum.js";
import { useAppForm, useCallback } from "~/libs/hooks/hooks.js";
import {
    type UserSignUpRequestDto,
    userSignUpValidationSchema,
} from "~/modules/users/users.js";

import { DEFAULT_SIGN_UP_PAYLOAD } from "./libs/constants.js";
import css from "./sign-up-form.module.css";

type Properties = {
    onSubmit: (payload: UserSignUpRequestDto) => void;
};

const SignUpForm: React.FC<Properties> = ({
    onSubmit,
}: Properties) => {
    const navigate = useNavigate();

    const { control, errors, handleSubmit, setError } = useAppForm<
        UserSignUpRequestDto & { confirmPassword: string }
    >({
        defaultValues: { ...DEFAULT_SIGN_UP_PAYLOAD, confirmPassword: "" },
        validationSchema: userSignUpValidationSchema,
    });

    const handleFormSubmit = useCallback(
        (event_: React.BaseSyntheticEvent): void => {
            void handleSubmit((data) => {
                if (data.password !== data.confirmPassword) {
                    if (setError) {
                        setError("confirmPassword", {
                            message: "Passwords don`t match each other!",
                            type: "manual",
                        });
                    }

                    return;
                }

                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const { confirmPassword, ...payloadToSend } = data;
                onSubmit(payloadToSend as UserSignUpRequestDto);
            })(event_);
        },
        [handleSubmit, onSubmit, setError],
    );

    const handleSignInClick = useCallback(() => {
        const result = navigate(AppRoute.SIGN_IN);

        if (result instanceof Promise) {
            result.catch(() => {});
        }
    }, [navigate]);

    return (
        <div className={css["container"]}>
            <div className={css["signUpCard"]}>
                <div className={css["logoContainer"]}>
                    <div className={css["logoCircle"]} />
                    <span className={css["logoText"]}>Logo</span>
                </div>

                <div className={css["formContent"]}>
                    <h3 className={css["title"]}>Create an account</h3>
                    <p className={css["signInText"]}>
                        Already have an account? Go to{" "}
                        <button
                            className={css["signInButton"]}
                            onClick={handleSignInClick}
                            type="button"
                        >
                            Sign In
                        </button>
                    </p>
                    <form className={css["form"]} onSubmit={handleFormSubmit}>
                        <div className={css["inputGroup"]}>
                            <Input
                                control={control}
                                errors={errors}
                                label="Name"
                                name="name"
                                placeholder="name"
                                type="text"
                            />
                        </div>
                        <div className={css["inputGroup"]}>
                            <Input
                                control={control}
                                errors={errors}
                                label="Email"
                                name="email"
                                placeholder="name"
                                type="text"
                            />
                        </div>
                        <div className={css["inputGroup"]}>
                            <Input
                                control={control}
                                errors={errors}
                                label="Password"
                                name="password"
                                placeholder="********"
                                type="password"
                            />
                        </div>
                        <div className={css["inputGroup"]}>
                            <Input
                                control={control}
                                errors={errors}
                                label="Confirm password"
                                name="confirmPassword"
                                placeholder="********"
                                type="password"
                            />
                        </div>
                        <Button label="CREATE AN ACCOUNT" type="submit" />
                    </form>
                </div>
            </div>
        </div>
    );
};

export { SignUpForm };