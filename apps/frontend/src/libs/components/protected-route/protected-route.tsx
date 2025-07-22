import { Navigate, Outlet } from "react-router-dom";

import { AppRoute } from "~/libs/enums/app-route.enum.js";
import { StorageKey } from "~/libs/modules/storage/storage.js";

const ProtectedRoute: React.FC = () => {
	const isAuthorized = !!localStorage.getItem(StorageKey.TOKEN);

	return isAuthorized ? <Outlet /> : <Navigate replace to={AppRoute.SIGN_IN} />;
};

export { ProtectedRoute };
