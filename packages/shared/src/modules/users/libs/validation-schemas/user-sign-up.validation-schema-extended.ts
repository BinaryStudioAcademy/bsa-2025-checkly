import { z } from "zod";

import { UserValidationMessage } from "../enums/enums.js";
import { userSignUp } from "./user-sign-up.validation-schema.js";

const userSignUpExtended = userSignUp
	.extend({
		confirmPassword: z.string().trim(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: UserValidationMessage.PASSWORD_DOES_NOT_MATCH,
		path: ["confirmPassword"],
	});

type SignUpFormValidationSchema = z.infer<typeof userSignUpExtended>;

export { type SignUpFormValidationSchema, userSignUpExtended };
