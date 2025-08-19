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

	public async sendEmail(emailOptions: EmailOptions): Promise<void> {
		const { data, error } = await this.resend.emails.send(emailOptions);

		if (error) {
			this.logger.error(error.message);
		}

		this.logger.info("Email was sent. Id: " + (data?.id as string));
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
