import { type EmailOptions } from "../types/types.js";

const EmailOptionsValues: Readonly<Partial<EmailOptions>> = {
	from: "Checkly <checkly@brunoazvd.com>",
	subject: "Password Recovery",
} as const;

export { EmailOptionsValues };
