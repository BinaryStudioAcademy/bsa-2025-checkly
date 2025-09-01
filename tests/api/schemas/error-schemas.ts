export const errorSchema = {
	properties: {
		errorType: { type: "string" },
		message: { type: "string" },
	},
	required: ["errorType", "message"],
	type: "object",
};
