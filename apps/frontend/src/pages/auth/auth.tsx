import React, { type JSX, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
	type UserSignInRequestDto,
	type UserSignUpRequestDto,
} from "~/modules/users/users.js";

import { SignInForm, SignUpForm } from "./components/components.js";

const Auth: React.FC = () => {
	const dispatch = useAppDispatch();
	const { pathname } = useLocation();
	const navigate = useNavigate();

	const { dataStatus } = useAppSelector(({ auth }) => auth);

	const isLoading =
		dataStatus === DataStatus.PENDING || dataStatus === DataStatus.IDLE;

	useEffect(() => {
		navigation.setNavigate(navigate);
	}, [navigate]);

	const handleSignInSubmit = useCallback(
		(payload: UserSignInRequestDto): void => {
			void dispatch(authActions.signIn(payload));
		},
		[dispatch],
	);

	const handleSignUpSubmit = useCallback(
		(payload: UserSignUpRequestDto): void => {
			void dispatch(authActions.signUp(payload));
		},
		[dispatch],
	);

	const getScreen = (screen: string): JSX.Element => {
		switch (screen) {
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
