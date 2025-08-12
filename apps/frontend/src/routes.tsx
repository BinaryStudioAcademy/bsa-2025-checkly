import { type RouteObject } from "react-router-dom";

import { Dashboard, DashboardWrapper } from "./libs/components/components.js";
import { AppRoute, RouteAccess } from "./libs/enums/enums.js";
import { Plan } from "./pages/dashboard-wrapper-mock/components/components.js";
import {
	Auth,
	ChooseStyle,
	Home,
	NotFound,
	PlanStyleOverview,
} from "./pages/pages.js";

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
		element: <PlanStyleOverview />,
		handle: { access: RouteAccess.AUTHENTICATED },
		path: AppRoute.PLAN_STYLE_OVERVIEW,
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
		element: <DashboardWrapper />,
		handle: { access: RouteAccess.AUTHENTICATED },
		path: AppRoute.ROOT,
	},
	{
		element: <ChooseStyle />,
		handle: { access: RouteAccess.AUTHENTICATED },
		path: AppRoute.CHOOSE_STYLE,
	},
	{
		element: <NotFound />,
		handle: { access: RouteAccess.PUBLIC },
		path: AppRoute.NOT_FOUND,
	},
];

export { type RouteHandle, routes };
