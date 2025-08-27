import { logger } from "~/libs/modules/logger/logger.js";

import { FeedbackController } from "./feedback.controller.js";
import { FeedbackModel } from "./feedback.model.js";
import { FeedbackRepository } from "./feedback.repository.js";
import { FeedbackService } from "./feedback.service.js";

const feedbackRepository = new FeedbackRepository(FeedbackModel);
const feedbackService = new FeedbackService(feedbackRepository);
const feedbackController = new FeedbackController(logger, feedbackService);

export { feedbackController };
