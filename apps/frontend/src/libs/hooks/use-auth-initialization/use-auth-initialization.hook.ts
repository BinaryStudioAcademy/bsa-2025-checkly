import { useCallback, useEffect } from "react";

import { useAppDispatch, useAppSelector } from "~/libs/hooks/hooks.js";
import { actions as authActions } from "~/modules/auth/auth.js";

const useAuthInitialization = (): void => {
	const dispatch = useAppDispatch();
	const { user } = useAppSelector((state) => state.auth);

	const initializeAuth = useCallback((): void => {
		if (user) {
			return;
		}

		void dispatch(authActions.getCurrentUser());
	}, [dispatch, user]);

	useEffect(() => {
		initializeAuth();
	}, [initializeAuth]);
};

export { useAuthInitialization };
