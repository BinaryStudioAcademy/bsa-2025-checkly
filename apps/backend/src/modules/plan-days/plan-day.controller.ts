import { APIPath } from "~/libs/enums/enums.js";
import {
	type APIHandlerOptions,
	type APIHandlerResponse,
	BaseController,
} from "~/libs/modules/controller/controller.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type Logger } from "~/libs/modules/logger/logger.js";
import { type PlanDayService } from "~/modules/plan-days/plan-day.service.js";
import {
	planDayCreateValidationSchema,
	type PlanDayRequestDto,
} from "~/modules/plan-days/plan-days.js";

import { PlanDaysApiPath } from "./libs/enums/enums.js";

class PlanDayController extends BaseController {
	private planDayService: PlanDayService;

	public constructor(logger: Logger, planDayService: PlanDayService) {
		super(logger, APIPath.PLAN_DAYS);

		this.planDayService = planDayService;

		this.addRoute({
			handler: (options) =>
				this.findById(options as APIHandlerOptions<{ params: { id: number } }>),
			method: "GET",
			path: PlanDaysApiPath.PLAN_DAY,
		});

		this.addRoute({
			handler: (options) =>
				this.create(
					options as APIHandlerOptions<{
						body: PlanDayRequestDto;
					}>,
				),
			method: "POST",
			path: PlanDaysApiPath.PLAN_DAY_CREATE,
			validation: {
				body: planDayCreateValidationSchema,
			},
		});
	}

	private async create(
		options: APIHandlerOptions<{ body: PlanDayRequestDto }>,
	): Promise<APIHandlerResponse> {
		return {
			payload: await this.planDayService.create(options.body),
			status: HTTPCode.OK,
		};
	}

	private async findById(
		options: APIHandlerOptions<{ params: { id: number } }>,
	): Promise<APIHandlerResponse> {
		const { id } = options.params;

		return {
			payload: await this.planDayService.findById(id),
			status: HTTPCode.OK,
		};
	}
}

export { PlanDayController };
