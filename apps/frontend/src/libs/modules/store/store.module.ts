import {
	type ThunkMiddleware,
	type Tuple,
	type UnknownAction,
} from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";

import { AppEnvironment } from "~/libs/enums/enums.js";
import { type Config } from "~/libs/modules/config/config.js";
import { storage } from "~/libs/modules/storage/storage.js";
import { authApi, reducer as authReducer } from "~/modules/auth/auth.js";
import {
	planCategoryApi,
	reducer as planCategoryReducer,
} from "~/modules/plan-categories/plan-categories.js";
import { planApi, reducer as planReducer } from "~/modules/plans/plans.js";
import { quizApi, reducer as quizReducer } from "~/modules/quiz/quiz.js";
import { userApi } from "~/modules/users/users.js";

import { notifications } from "../notifications/notifications.js";
import { type BaseStorage } from "../storage/base-storage.module.js";
import { listenerMiddleware } from "./listener-middleware/listener-middleware.js";

type ExtraArguments = {
	authApi: typeof authApi;
	notifications: typeof notifications;
	planApi: typeof planApi;
	planCategoryApi: typeof planCategoryApi;
	quizApi: typeof quizApi;
	storage: BaseStorage;
	userApi: typeof userApi;
};

type RootReducer = {
	auth: ReturnType<typeof authReducer>;
	plan: ReturnType<typeof planReducer>;
	planCategory: ReturnType<typeof planCategoryReducer>;
	quiz: ReturnType<typeof quizReducer>;
};

class Store {
	public instance: ReturnType<
		typeof configureStore<
			RootReducer,
			UnknownAction,
			Tuple<[ThunkMiddleware<RootReducer, UnknownAction, ExtraArguments>]>
		>
	>;

	public get extraArguments(): ExtraArguments {
		return {
			authApi,
			notifications,
			planApi,
			planCategoryApi,
			quizApi,
			storage,
			userApi,
		};
	}

	public constructor(config: Config) {
		this.instance = configureStore({
			devTools: config.ENV.APP.ENVIRONMENT !== AppEnvironment.PRODUCTION,
			middleware: (getDefaultMiddleware) => {
				return getDefaultMiddleware({
					thunk: {
						extraArgument: this.extraArguments,
					},
				}).prepend(listenerMiddleware.middleware);
			},
			reducer: {
				auth: authReducer,
				plan: planReducer,
				planCategory: planCategoryReducer,
				quiz: quizReducer,
			},
		});
	}
}

export { Store };
