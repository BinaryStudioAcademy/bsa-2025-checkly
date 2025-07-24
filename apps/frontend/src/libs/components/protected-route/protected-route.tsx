import { Navigate, Outlet } from "react-router-dom";

import { AppRoute } from "~/libs/enums/app-route.enum.js";
import { DataStatus } from "~/libs/enums/enums.js";
import { useAppSelector } from "~/libs/hooks/hooks.js";

import { Loader } from "../components.js";

const ProtectedRoute: React.FC = () => {
	const { dataStatus, user } = useAppSelector(({ auth }) => ({
		dataStatus: auth.dataStatus,
		user: auth.user,
	}));

	const isAuthorized = dataStatus === DataStatus.FULFILLED && user;

	if (isAuthorized) {
		return <Outlet />;
	}

	const isLoading = dataStatus === DataStatus.PENDING;

	if (isLoading) {
		return <Loader />;
	}

	return <Navigate replace to={AppRoute.SIGN_IN} />;
};

export { ProtectedRoute };
