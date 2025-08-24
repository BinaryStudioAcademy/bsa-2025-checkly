import { type EmailOptions } from "../types/types.js";

const EmailOptionsValues: Readonly<Partial<EmailOptions>> = {
	from: "Checkly <onboarding@resend.dev>",
	subject: "Password Recovery",
} as const;

export { EmailOptionsValues };
