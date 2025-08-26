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
import { pdfExportApi } from "~/modules/pdf-export/pdf-export.js";
import { reducer as pdfExportReducer } from "~/modules/pdf-export/slices/pdf-export.js";
import {
	planCategoryApi,
	reducer as planCategoryReducer,
} from "~/modules/plan-categories/plan-categories.js";
import {
	planStylesApi,
	reducer as planStylesReducer,
} from "~/modules/plan-styles/plan-styles.js";
import { planApi, reducer as planReducer } from "~/modules/plans/plans.js";
import {
	quizAnswerApi,
	reducer as quizAnswerReducer,
} from "~/modules/quiz-answers/quiz-answers.js";
import {
	quizQuestionApi,
	reducer as quizQuestionReducer,
} from "~/modules/quiz-questions/quiz-questions.js";
import { quizApi } from "~/modules/quiz/quiz.js";
import { taskApi, reducer as taskReducer } from "~/modules/tasks/tasks.js";
import { userApi } from "~/modules/users/users.js";

import { notifications } from "../notifications/notifications.js";
import { type BaseStorage } from "../storage/base-storage.module.js";
import { listenerMiddleware } from "./listener-middleware/listener-middleware.js";

type ExtraArguments = {
	authApi: typeof authApi;
	notifications: typeof notifications;
	pdfExportApi: typeof pdfExportApi;
	planApi: typeof planApi;
	planCategoryApi: typeof planCategoryApi;
	planStylesApi: typeof planStylesApi;
	quizAnswerApi: typeof quizAnswerApi;
	quizApi: typeof quizApi;
	quizQuestionApi: typeof quizQuestionApi;
	storage: BaseStorage;
	taskApi: typeof taskApi;
	userApi: typeof userApi;
};

type RootReducer = {
	auth: ReturnType<typeof authReducer>;
	pdfExport: ReturnType<typeof pdfExportReducer>;
	plan: ReturnType<typeof planReducer>;
	planCategory: ReturnType<typeof planCategoryReducer>;
	planStyles: ReturnType<typeof planStylesReducer>;
	quizAnswer: ReturnType<typeof quizAnswerReducer>;
	quizQuestion: ReturnType<typeof quizQuestionReducer>;
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
			notifications,
			pdfExportApi,
			planApi,
			planCategoryApi,
			planStylesApi,
			quizAnswerApi,
			quizApi,
			quizQuestionApi,
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
				pdfExport: pdfExportReducer,
				plan: planReducer,
				planCategory: planCategoryReducer,
				planStyles: planStylesReducer,
				quizAnswer: quizAnswerReducer,
				quizQuestion: quizQuestionReducer,
				task: taskReducer,
			},
		});
	}
}

export { Store };
