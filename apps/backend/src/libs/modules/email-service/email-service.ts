import { Resend } from "resend";

import { config } from "../config/config.js";
import { logger } from "../logger/logger.js";
import { EmailService } from "./email-service.module.js";

const resend = new Resend(config.ENV.EMAIL_SERVICE.EMAIL_API_KEY);
const emailService = new EmailService(logger, resend);

export { emailService };
