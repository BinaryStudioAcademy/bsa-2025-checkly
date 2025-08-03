import { APIPath, HTTPCode } from "shared";
import { HTTPMethod } from "shared/src/libs/modules/http/libs/enums/http-method.enum.js";

import { BaseController } from "~/libs/modules/controller/controller.js";
import { type Logger } from "~/libs/modules/logger/logger.js";

class QuizContoller extends BaseController {
	public constructor(logger: Logger) {
		super(logger, APIPath.QUIZ);

		this.addRoute({
			handler: () => {
				return {
					payload: {
						message: "Hello World",
					},
					status: HTTPCode.OK,
				};
			},
			isPublic: true,
			method: HTTPMethod.GET,
			path: "/",
		});
	}
}

export { QuizContoller };
