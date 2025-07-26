import { useCallback, useEffect } from "react";

import { useAppDispatch, useAppSelector } from "~/libs/hooks/hooks.js";
import { storage, StorageKey } from "~/libs/modules/storage/storage.js";
import { actions as authActions } from "~/modules/auth/auth.js";

/**
 * Initializes authentication from localStorage token on app startup
 * Fetches current user if token exists and user is not already loaded
 */
const useAuthInitialization = (): void => {
	const dispatch = useAppDispatch();
	const { user } = useAppSelector((state) => state.auth);

	const initializeAuth = useCallback(async (): Promise<void> => {
		if (user) {
			return;
		}

		const token = await storage.get(StorageKey.TOKEN);

		if (token) {
			void dispatch(authActions.getCurrentUser());
		}
	}, [dispatch, user]);

	useEffect(() => {
		void initializeAuth();
	}, [initializeAuth]);
};

export { useAuthInitialization };
