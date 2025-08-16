import { type AppRoute } from "../enums/app-route.enum.js";

type AppRouteType = (typeof AppRoute)[keyof typeof AppRoute];

export { type AppRouteType };
