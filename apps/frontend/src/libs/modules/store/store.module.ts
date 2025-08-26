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
import { calendarExportApi } from "~/modules/calendar-export/index.js";
import { reducer as calendarExportReducer } from "~/modules/calendar-export/slices/calendar-export.js";
import { pdfExportApi } from "~/modules/pdf-export/pdf-export.js";
import { reducer as pdfExportReducer } from "~/modules/pdf-export/slices/pdf-export.js";
import {
	planCategoryApi,
	reducer as planCategoryReducer,
} from "~/modules/plan-categories/plan-categories.js";
import { planApi, reducer as planReducer } from "~/modules/plans/plans.js";
import { quizApi, reducer as quizReducer } from "~/modules/quiz/quiz.js";
import { taskApi, reducer as taskReducer } from "~/modules/tasks/tasks.js";
import { userApi } from "~/modules/users/users.js";

import { notifications } from "../notifications/notifications.js";
import { type BaseStorage } from "../storage/base-storage.module.js";
import { listenerMiddleware } from "./listener-middleware/listener-middleware.js";

type ExtraArguments = {
	authApi: typeof authApi;
	calendarExportApi: typeof calendarExportApi;
	notifications: typeof notifications;
	pdfExportApi: typeof pdfExportApi;
	planApi: typeof planApi;
	planCategoryApi: typeof planCategoryApi;
	quizApi: typeof quizApi;
	storage: BaseStorage;
	taskApi: typeof taskApi;
	userApi: typeof userApi;
};

type RootReducer = {
	auth: ReturnType<typeof authReducer>;
	calendarExport: ReturnType<typeof calendarExportReducer>;
	pdfExport: ReturnType<typeof pdfExportReducer>;
	plan: ReturnType<typeof planReducer>;
	planCategory: ReturnType<typeof planCategoryReducer>;
	quiz: ReturnType<typeof quizReducer>;
	task: ReturnType<typeof taskReducer>;
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
			calendarExportApi,
			notifications,
			pdfExportApi,
			planApi,
			planCategoryApi,
			quizApi,
			storage,
			taskApi,
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
				calendarExport: calendarExportReducer,
				pdfExport: pdfExportReducer,
				plan: planReducer,
				planCategory: planCategoryReducer,
				quiz: quizReducer,
				task: taskReducer,
			},
		});
	}
}

export { Store };
