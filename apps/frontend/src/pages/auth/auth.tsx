import { isFulfilled } from "@reduxjs/toolkit";
import React, { type JSX, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { REDIRECT_PARAM } from "~/libs/constants/constants.js";
import { AppRoute, DataStatus } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppSelector,
	useCallback,
	useLocation,
} from "~/libs/hooks/hooks.js";
import { navigation } from "~/libs/modules/navigation/navigation.js";
import { actions as authActions } from "~/modules/auth/auth.js";
import {
	type ForgotPasswordRequestDto,
	type ResetPasswordRequestDto,
	type UserSignInRequestDto,
	type UserSignUpRequestDto,
} from "~/modules/users/users.js";

import { SignInForm, SignUpForm } from "./components/components.js";
import { ForgotPassword } from "./components/forgot-password/forgot-password.js";
import { ResetPassword } from "./components/reset-password/reset-password.js";

const Auth: React.FC = () => {
	const dispatch = useAppDispatch();
	const location = useLocation();
	const { pathname } = location;
	const navigate = useNavigate();

	const { dataStatus } = useAppSelector(({ auth }) => auth);

	const isLoading = dataStatus === DataStatus.PENDING;

	useEffect(() => {
		navigation.setNavigate(navigate);
	}, [navigate]);

	const handleGetRedirectPath = useCallback((): null | string => {
		const parameters = new URLSearchParams(location.search);
		const redirect = parameters.get(REDIRECT_PARAM);

		return redirect && redirect.startsWith("/") ? redirect : null;
	}, [location.search]);

	const handleSignInSubmit = useCallback(
		(payload: UserSignInRequestDto): void => {
			void dispatch(authActions.signIn(payload)).then((resultAction) => {
				if (isFulfilled(resultAction)) {
					const redirectPath = handleGetRedirectPath();
					void navigate(redirectPath ?? AppRoute.DASHBOARD, { replace: true });
				}
			});
		},
		[dispatch, navigate, handleGetRedirectPath],
	);

	const handleSignUpSubmit = useCallback(
		(payload: UserSignUpRequestDto): void => {
			void dispatch(authActions.signUp(payload)).then((resultAction) => {
				if (isFulfilled(resultAction)) {
					const redirectPath = handleGetRedirectPath();
					void navigate(redirectPath ?? AppRoute.DASHBOARD, { replace: true });
				}
			});
		},
		[dispatch, navigate, handleGetRedirectPath],
	);

	const handleForgotPasswordSubmit = useCallback(
		(payload: ForgotPasswordRequestDto): void => {
			void dispatch(authActions.sendResetLink(payload));
		},
		[dispatch],
	);

	const handleResetPasswordSubmit = useCallback(
		(payload: ResetPasswordRequestDto): void => {
			void dispatch(authActions.resetPassword(payload));
		},
		[dispatch],
	);

	const getScreen = (screen: string): JSX.Element => {
		switch (screen) {
			case AppRoute.FORGOT_PASSWORD: {
				return (
					<ForgotPassword
						isLoading={isLoading}
						onSubmit={handleForgotPasswordSubmit}
					/>
				);
			}

			case AppRoute.RESET_PASSWORD: {
				return (
					<ResetPassword
						isLoading={isLoading}
						onSubmit={handleResetPasswordSubmit}
					/>
				);
			}

			case AppRoute.SIGN_IN: {
				return (
					<SignInForm isLoading={isLoading} onSubmit={handleSignInSubmit} />
				);
			}

			case AppRoute.SIGN_UP: {
				return (
					<SignUpForm isLoading={isLoading} onSubmit={handleSignUpSubmit} />
				);
			}
		}

		return <></>;
	};

	return getScreen(pathname);
};

export { Auth };
