import { Navigate, Outlet, useMatches } from "react-router-dom";

import { LAST_INDEX } from "~/libs/constants/constants.js";
import { AppRoute } from "~/libs/enums/app-route.enum.js";
import { DataStatus, RouteAccess } from "~/libs/enums/enums.js";
import { useAppSelector } from "~/libs/hooks/hooks.js";
import { useAuthInitialization } from "~/libs/hooks/use-auth-initialization/use-auth-initialization.hook.js";
import { type RouteHandle } from "~/routes.js";

import { Loader } from "../components.js";

const ProtectedRoute: React.FC = () => {
	useAuthInitialization();

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

	switch (access) {
		case RouteAccess.AUTHENTICATED: {
			return isAuthorized ? (
				<Outlet />
			) : (
				<Navigate replace to={AppRoute.SIGN_IN} />
			);
		}

		case RouteAccess.NOT_AUTHENTICATED: {
			return isAuthorized ? (
				<Navigate replace to={AppRoute.DASHBOARD} />
			) : (
				<Outlet />
			);
		}

		default: {
			return <Outlet />;
		}
	}
};

export { ProtectedRoute };
