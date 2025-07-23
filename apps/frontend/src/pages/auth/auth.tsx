import React, { type JSX } from "react";

import { AppRoute } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppSelector,
	useCallback,
	useLocation,
} from "~/libs/hooks/hooks.js";
import { actions as authActions } from "~/modules/auth/auth.js";
import { BaseTokenStorage } from "~/modules/auth/token-storage/token-storage.service.js";
import { type UserSignUpRequestDto } from "~/modules/users/users.js";

import { SignInForm, SignUpForm } from "./components/components.js";

const tokenStorage = new BaseTokenStorage();

const Auth: React.FC = () => {
	const dispatch = useAppDispatch();
	const { dataStatus } = useAppSelector(({ auth }) => ({
		dataStatus: auth.dataStatus,
	}));
	const { pathname } = useLocation();

	const handleSignInSubmit = useCallback((): void => {
		// handle sign in
	}, []);

	const handleSignUpSubmit = useCallback(
		async (payload: UserSignUpRequestDto): Promise<void> => {
			const resultAction = await dispatch(authActions.signUp(payload));

			const isSignUpFulfilled =
				authActions.signUp.fulfilled.match(resultAction);

			if (isSignUpFulfilled) {
				const { token } = resultAction.payload;

				if (token) {
					tokenStorage.store(token);
				}
			}
		},
		[dispatch],
	);

	const handleSignUpFormSubmit = useCallback(
		(payload: UserSignUpRequestDto): void => {
			void handleSignUpSubmit(payload);
		},
		[handleSignUpSubmit],
	);

	const getScreen = (screen: string): JSX.Element => {
		switch (screen) {
			case AppRoute.SIGN_IN: {
				return <SignInForm onSubmit={handleSignInSubmit} />;
			}

			case AppRoute.SIGN_UP: {
				return <SignUpForm onSubmit={handleSignUpFormSubmit} />;
			}
		}

		return <></>;
	};

	return (
		<>
			state: {dataStatus}
			{getScreen(pathname)}
		</>
	);
};

export { Auth };
