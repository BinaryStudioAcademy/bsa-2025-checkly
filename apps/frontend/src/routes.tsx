import { type RouteObject } from "react-router-dom";

import { AppRoute, RouteAccess } from "./libs/enums/enums.js";
import { Auth, Home, QuestionFlow, Quiz } from "./pages/pages.js";

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
		element: <QuestionFlow />,
		handle: { access: RouteAccess.PUBLIC },
		path: AppRoute.QUIZ_QUESTIONS,
	},
    {
		element: <Quiz />,
		handle: { access: RouteAccess.PUBLIC },
		path: AppRoute.QUIZ,
    },
];

export { type RouteHandle, routes };
