import { Navigate, Outlet, useMatches } from "react-router-dom";

import { AppRoute } from "~/libs/enums/app-route.enum.js";
import { DataStatus, RouteAccess } from "~/libs/enums/enums.js";
import { useAppSelector } from "~/libs/hooks/hooks.js";
import { useAuthInitialization } from "~/libs/hooks/use-auth-initialization/use-auth-initialization.hook.js";
import { type RouteHandle } from "~/routes.js";

import { Loader } from "../components.js";

const ProtectedRoute: React.FC = () => {
	useAuthInitialization();

	const LAST_INDEX = -1;
	const matches = useMatches();
	const handle = matches.at(LAST_INDEX)?.handle as RouteHandle;
	const { access } = handle;

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

	if (access === RouteAccess.NOT_AUTHENTICATED) {
		if (isAuthorized) {
			return <Navigate replace to={AppRoute.DASHBOARD} />;
		}

		return <Outlet />;
	} else if (access === RouteAccess.AUTHENTICATED) {
		if (isAuthorized) {
			return <Outlet />;
		}

		return <Navigate replace to={AppRoute.SIGN_IN} />;
	} else {
		return <Outlet />;
	}
};

export { ProtectedRoute };
