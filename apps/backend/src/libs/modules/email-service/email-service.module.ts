import { type Resend } from "resend";

import { type Logger } from "../logger/logger.js";
import { EmailOptionsValues } from "./libs/constants/email-options-values.js";
import { type EmailOptions } from "./libs/types/types.js";

class EmailService {
	private logger: Logger;
	private resend: Resend;

	public constructor(logger: Logger, resend: Resend) {
		this.logger = logger;
		this.resend = resend;
	}

	public async sendEmail(emailOptions: EmailOptions): Promise<string> {
		const { data, error } = await this.resend.emails.send(emailOptions);

		const emailId = data?.id as string;

		if (error) {
			this.logger.error(error.message);
		} else {
			this.logger.info("Email was sent. Id: " + emailId);
		}

		return emailId;
	}

	public setEmailOptions(html: string, to: string): EmailOptions {
		const { from, subject } = EmailOptionsValues;

		return {
			from: from as string,
			html,
			subject: subject as string,
			to,
		};
	}
}

export { EmailService };
