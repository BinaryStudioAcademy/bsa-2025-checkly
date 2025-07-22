import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "~/libs/hooks/hooks.js";
import { storage } from "~/libs/modules/storage/storage.js";
import { actions as authActions } from "~/modules/auth/auth.js";

/**
 * Initializes authentication from localStorage token on app startup
 * Fetches current user if token exists and user is not already loaded
 */
const useAuthInitialization = (): void => {
	const dispatch = useAppDispatch();
	const { user } = useAppSelector((state) => state.auth);

	useEffect(() => {
		const initializeAuth = async (): Promise<void> => {
			if (user) {
				return;
			}

			const token = await storage.get("token");

			if (token) {
				void dispatch(authActions.getCurrentUser());
			}
		};

		void initializeAuth();
	}, [dispatch, user]);
};

export { useAuthInitialization };
