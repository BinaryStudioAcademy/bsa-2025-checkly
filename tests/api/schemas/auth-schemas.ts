export const registerResponseSchema = {
	properties: {
		token: { type: "string" },
		user: {
			properties: {
				email: { type: "string" },
				id: { type: "number" },
				name: { type: "string" },
			},
			type: "object",
		},
	},
	required: ["user", "token"],
	type: "object",
};
export const loginResponseSchema = {
	properties: {
		token: { type: "string" },
		user: {
			properties: {
				email: { type: "string" },
				password: { type: "string" },
			},
			type: "object",
		},
	},
	required: ["user", "token"],
	type: "object",
};
export const getCurrentUserSchema = {
	properties: {
		email: { type: "string" },
		id: { type: "number" },
		name: { type: "string" },
	},
	required: ["id", "email", "name"],
	type: "object",
};
