import { type RouteObject } from "react-router-dom";

import { AppRoute, RouteAccess } from "./libs/enums/enums.js";
import { NotFound } from "./pages/not-found-page/not-found-page.js";
import { Auth, Home, TestPage } from "./pages/pages.js";

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
		element: <TestPage />,
		handle: { access: RouteAccess.ALL },
		path: AppRoute.TEST_PAGE,
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
		element: <NotFound />,
		handle: { access: RouteAccess.ALL },
		path: AppRoute.NOT_FOUND,
	},
];

export { type RouteHandle, routes };
