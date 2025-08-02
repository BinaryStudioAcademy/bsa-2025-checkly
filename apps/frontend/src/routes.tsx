import { type RouteObject } from "react-router-dom";

import { AppRoute, RouteAccess } from "./libs/enums/enums.js";
import { Auth, Home } from "./pages/pages.js";

type CustomRouteObject = RouteObject & { handle: RouteHandle };

interface RouteHandle {
	access: (typeof RouteAccess)[keyof typeof RouteAccess];
}

const routes: CustomRouteObject[] = [
	{
		element: <Home />,
		handle: { access: RouteAccess.ALL },
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
				element: "Dashboard",
				handle: { access: RouteAccess.AUTHENTICATED },
				path: "",
			},
		],
		element: "Dashboard",
		handle: { access: RouteAccess.AUTHENTICATED },
		path: AppRoute.DASHBOARD,
	},
	{
		element: "Page was not Found",
		handle: { access: RouteAccess.ALL },
		path: "*",
	},
];

export { type RouteHandle, routes };
