import { APIPath } from "~/libs/enums/enums.js";
import {
	type APIHandlerOptions,
	type APIHandlerResponse,
	BaseController,
} from "~/libs/modules/controller/controller.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Logger } from "~/libs/modules/logger/logger.js";
import { type PlanService } from "~/modules/plans/plan.service.js";
import {
	planCreateValidationSchema,
	type PlanRequestDto,
} from "~/modules/plans/plans.js";

import { PlansApiPath } from "./libs/enums/enums.js";

class PlanController extends BaseController {
	private planService: PlanService;

	public constructor(logger: Logger, planService: PlanService) {
		super(logger, APIPath.PLANS);

		this.planService = planService;

		this.addRoute({
			handler: (options) =>
				this.findById(options as APIHandlerOptions<{ params: { id: number } }>),
			method: "GET",
			path: PlansApiPath.PLAN,
		});

		this.addRoute({
			handler: (options) =>
				this.create(
					options as APIHandlerOptions<{
						body: PlanRequestDto;
					}>,
				),
			method: "POST",
			path: PlansApiPath.PLAN_CREATE,
			validation: {
				body: planCreateValidationSchema,
			},
		});
	}

	private async create(
		options: APIHandlerOptions<{ body: PlanRequestDto }>,
	): Promise<APIHandlerResponse> {
		return {
			payload: await this.planService.create(options.body),
			status: HTTPCode.OK,
		};
	}

	private async findById(
		options: APIHandlerOptions<{ params: { id: number } }>,
	): Promise<APIHandlerResponse> {
		const { id } = options.params;

		return {
			payload: await this.planService.findById(id),
			status: HTTPCode.OK,
		};
	}
}

export { PlanController };
