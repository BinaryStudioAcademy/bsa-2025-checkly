import { type RouteObject } from "react-router-dom";

import { Dashboard, DashboardWrapper } from "./libs/components/components.js";
import { AppRoute, RouteAccess } from "./libs/enums/enums.js";
import { Plan } from "./pages/dashboard-wrapper-mock/components/components.js";
import {
	Auth,
	ChooseStyle,
	Home,
	LogoutPage,
	NotFound,
	PlanGeneration,
	PlanStyleOverview,
	PlanStylePrint,
	Profile,
	QuestionFlow,
	Quiz,
} from "./pages/pages.js";
import { PlanEdit } from "./pages/plan-edit/plan-edit.js";
import { TestPage } from "./pages/test-page/test-page.js";

type CustomRouteObject = RouteObject & { handle: RouteHandle };

type RouteHandle = {
	access: (typeof RouteAccess)[keyof typeof RouteAccess];
};

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
		handle: { access: RouteAccess.PUBLIC },
		path: AppRoute.OVERVIEW_PAGE,
	},
	{
		element: <LogoutPage />,
		handle: { access: RouteAccess.PUBLIC },
		path: AppRoute.LOGOUT,
	},
	{
		element: <Auth />,
		handle: { access: RouteAccess.NOT_AUTHENTICATED },
		path: AppRoute.FORGOT_PASSWORD,
	},
	{
		element: <Auth />,
		handle: { access: RouteAccess.NOT_AUTHENTICATED },
		path: AppRoute.RESET_PASSWORD,
	},
	{
		element: <QuestionFlow />,
		handle: { access: RouteAccess.PUBLIC },
		path: AppRoute.QUIZ_QUESTIONS,
	},
	{
		element: <PlanEdit />,
		handle: { access: RouteAccess.AUTHENTICATED },
		path: AppRoute.PLAN_EDIT,
	},
	{
		element: <Quiz />,
		handle: { access: RouteAccess.PUBLIC },
		path: AppRoute.QUIZ,
	},
	{
		children: [
			{
				element: <Dashboard />,
				handle: { access: RouteAccess.AUTHENTICATED },
				path: AppRoute.DASHBOARD,
			},
			{
				element: <Profile />,
				handle: { access: RouteAccess.AUTHENTICATED },
				path: AppRoute.PROFILE,
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
		element: <TestPage />,
		handle: { access: RouteAccess.PUBLIC },
		path: AppRoute.TEST_PAGE,
	},
	{
		element: <NotFound />,
		handle: { access: RouteAccess.PUBLIC },
		path: AppRoute.NOT_FOUND,
	},
	{
		element: <PlanGeneration />,
		handle: { access: RouteAccess.PUBLIC },
		path: AppRoute.PLAN_GENERATION,
	},
	{
		element: <PlanStylePrint />,
		handle: { access: RouteAccess.PUBLIC },
		path: AppRoute.PLAN_STYLE_PRINT,
	},
];

export { type RouteHandle, routes };
