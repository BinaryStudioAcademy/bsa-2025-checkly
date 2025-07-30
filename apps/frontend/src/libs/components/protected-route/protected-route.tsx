import { Navigate, Outlet } from "react-router-dom";

import { AppRoute } from "~/libs/enums/app-route.enum.js";
import { DataStatus } from "~/libs/enums/enums.js";
import { useAppSelector } from "~/libs/hooks/hooks.js";
import { useAuthInitialization } from "~/libs/hooks/use-auth-initialization/use-auth-initialization.hook.js";

import { Loader } from "../components.js";

const ProtectedRoute: React.FC = () => {
	useAuthInitialization();

	const { dataStatus, user } = useAppSelector(({ auth }) => ({
		dataStatus: auth.dataStatus,
		user: auth.user,
	}));

	const isLoading =
		dataStatus === DataStatus.PENDING || dataStatus === DataStatus.IDLE;

	if (isLoading) {
		return <Loader />;
	}

	const isAuthorized = dataStatus === DataStatus.FULFILLED && user;

	if (isAuthorized) {
		return <Outlet />;
	}

	return <Navigate replace to={AppRoute.SIGN_IN} />;
};

export { ProtectedRoute };
