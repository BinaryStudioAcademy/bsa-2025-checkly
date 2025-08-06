import { type RouteObject } from "react-router-dom";

import { AppRoute, RouteAccess } from "./libs/enums/enums.js";
import {
	Dashboard,
	Plan,
	Wrapper,
} from "./pages/dashboard-wrapper-mock/components/components.js";
import { Auth, Home, NotFound } from "./pages/pages.js";

type CustomRouteObject = RouteObject & { handle: RouteHandle };

interface RouteHandle {
	access: (typeof RouteAccess)[keyof typeof RouteAccess];
}

const routes: CustomRouteObject[] = [
	{
		element: <Home />,
		handle: { access: RouteAccess.PUBLIC },
		path: "",
	},
	{
		element: <Auth />,
		handle: { access: RouteAccess.NOT_AUTHENTICATED },
		path: AppRoute.SIGN_IN,
	},
	{
		element: <Auth />,
		handle: { access: RouteAccess.NOT_AUTHENTICATED },
		path: AppRoute.SIGN_UP,
	},
	{
		children: [
			{
				element: <Dashboard />,
				handle: { access: RouteAccess.AUTHENTICATED },
				path: AppRoute.DASHBOARD,
			},
			{
				element: <Plan />,
				handle: { access: RouteAccess.AUTHENTICATED },
				path: AppRoute.PLAN,
			},
		],
		element: <Wrapper />,
		handle: { access: RouteAccess.AUTHENTICATED },
		path: AppRoute.ROOT,
	},
	{
		element: <NotFound />,
		handle: { access: RouteAccess.PUBLIC },
		path: AppRoute.NOT_FOUND,
	},
];

export { type RouteHandle, routes };
