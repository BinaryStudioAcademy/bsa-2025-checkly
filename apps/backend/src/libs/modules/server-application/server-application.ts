import { config } from "~/libs/modules/config/config.js";
import { database } from "~/libs/modules/database/database.js";
import { logger } from "~/libs/modules/logger/logger.js";
import { authController } from "~/modules/auth/auth.js";
import { planCategoryController } from "~/modules/plan-categories/plan-categories.js";
import { planDayController } from "~/modules/plan-days/plan-days.js";
import { planPdfExportController } from "~/modules/plan-pdf-export/plan-pdf-export.js";
import { planStylesController } from "~/modules/plan-styles/plan-styles.js";
import { planController } from "~/modules/plans/plans.js";
import { quizQuestionController } from "~/modules/quiz-questions/quiz-question.js";
import { taskController } from "~/modules/tasks/tasks.js";
import { userController } from "~/modules/users/users.js";

import { BaseServerApplicationApi } from "./base-server-application-api.js";
import { BaseServerApplication } from "./base-server-application.js";

const apiV1 = new BaseServerApplicationApi(
	"v1",
	config,
	...authController.routes,
	...userController.routes,
	...planController.routes,
	...planDayController.routes,
	...planPdfExportController.routes,
	...planStylesController.routes,
	...taskController.routes,
	...quizQuestionController.routes,
	...planCategoryController.routes,
);
const serverApplication = new BaseServerApplication({
	apis: [apiV1],
	config,
	database,
	logger,
	title: "Checkly",
});

export { serverApplication };
export { type ServerApplicationRouteParameters } from "./libs/types/types.js";
