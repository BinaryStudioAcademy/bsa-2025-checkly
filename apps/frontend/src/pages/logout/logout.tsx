import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { AppRoute } from "~/libs/enums/app-route.enum.js";
import { useAppDispatch, useAppSelector } from "~/libs/hooks/hooks.js";
import { actions as authActions } from "~/modules/auth/slices/auth.js";

const LogoutPage: React.FC = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const user = useAppSelector((state) => state.auth.user);

	useEffect(() => {
		void dispatch(authActions.logout());
	}, [dispatch]);

	useEffect(() => {
		if (!user) {
			void navigate(AppRoute.ROOT, { replace: true });
		}
	}, [user, navigate]);

	return null;
};

export { LogoutPage };
