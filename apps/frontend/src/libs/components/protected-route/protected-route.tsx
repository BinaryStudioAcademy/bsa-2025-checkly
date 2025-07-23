import { Navigate, Outlet } from "react-router-dom";

import { AppRoute } from "~/libs/enums/app-route.enum.js";
import { DataStatus } from "~/libs/enums/enums.js";
import { useAppSelector } from "~/libs/hooks/hooks.js";

const ProtectedRoute: React.FC = () => {
	const { dataStatus, user } = useAppSelector(({ auth }) => ({
		dataStatus: auth.dataStatus,
		user: auth.user,
	}));

	const isAuthorized = dataStatus === DataStatus.FULFILLED && user;

	return isAuthorized ? <Outlet /> : <Navigate replace to={AppRoute.SIGN_IN} />;
};

export { ProtectedRoute };
