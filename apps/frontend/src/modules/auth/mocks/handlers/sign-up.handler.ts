import { delay, HttpResponse } from "msw";
import { http } from "~/libs/modules/api/mocks/http.js";
import { ApiSchemas } from "~/libs/modules/api/schema/schema.js";

const mockUsers: ApiSchemas["User"][] = [
	{
		id: "1",
		email: "admin@gmail.com",
		name: "admin",
	},
];

const generateTokens = async (payload: { userId: string; email: string }) =>
	"eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjY2LCJpYXQiOjE3NTQ1NzU5NTAsImV4cCI6MTc1NDY2MjM1MH0.www1Dauo2DsQ3vwSA61IW4SM-SWeXNx129pFZpkFy38";

const userPasswords = new Map<string, string>();
userPasswords.set("admin@gmail.com", "123456");

const signUpHandlers = [
	http.post("/auth/register", async ({ request }) => {
		const body = await request.json();

		await delay();

		if (mockUsers.some((u) => u.email === body.email)) {
			return HttpResponse.json(
				{
					errorType: "COMMON",
					message: "Email already in use",
				},
				{ status: 400 },
			);
		}

		const newUser: ApiSchemas["User"] = {
			id: String(mockUsers.length + 1),
			email: body.email,
			name: body.name,
		};

		const token = await generateTokens({
			userId: newUser.id,
			email: newUser.email,
		});

		mockUsers.push(newUser);
		userPasswords.set(body.email, body.password);

		return HttpResponse.json(
			{
				token,
				user: newUser,
			},
			{
				status: 201,
			},
		);
	}),
];

export { signUpHandlers };
