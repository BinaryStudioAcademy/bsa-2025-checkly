import { z } from "zod";

import { userSignUpValidationSchema } from "~/modules/users/users.js";

const userSignUpValidationSchemaExtended = userSignUpValidationSchema
	.extend({
		confirmPassword: z.string().trim(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don`t match!",
		path: ["confirmPassword"],
	});

type SignUpFormValidationSchema = z.infer<typeof userSignUpValidationSchemaExtended>;

export { type SignUpFormValidationSchema, userSignUpValidationSchemaExtended };
