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
import {
	quizAnswerApi,
	reducer as quizAnswerReducer,
} from "~/modules/quiz-answers/quiz-answers.js";
import {
	quizQuestionApi,
	reducer as quizQuestionReducer,
} from "~/modules/quiz-questions/quiz-questions.js";
import { quizApi } from "~/modules/quiz/quiz.js";
import { userApi } from "~/modules/users/users.js";

import { notifications } from "../notifications/notifications.js";
import { type BaseStorage } from "../storage/base-storage.module.js";
import { listenerMiddleware } from "./listener-middleware/listener-middleware.js";

type ExtraArguments = {
	authApi: typeof authApi;
	notifications: typeof notifications;
	planApi: typeof planApi;
	planCategoryApi: typeof planCategoryApi;
	quizAnswerApi: typeof quizAnswerApi;
	quizApi: typeof quizApi;
	quizQuestionApi: typeof quizQuestionApi;
	storage: BaseStorage;
	userApi: typeof userApi;
};

type RootReducer = {
	auth: ReturnType<typeof authReducer>;
	plan: ReturnType<typeof planReducer>;
	planCategory: ReturnType<typeof planCategoryReducer>;
	quizAnswer: ReturnType<typeof quizAnswerReducer>;
	quizQuestion: ReturnType<typeof quizQuestionReducer>;
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
			quizAnswerApi,
			quizApi,
			quizQuestionApi,
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
				quizAnswer: quizAnswerReducer,
				quizQuestion: quizQuestionReducer,
			},
		});
	}
}

export { Store };
