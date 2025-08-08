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

const signInHandlers = [
	http.post("/auth/login", async ({ request }) => {
		const body = await request.json();

		const user = mockUsers.find((u) => u.email === body.email);
		const storedPassword = userPasswords.get(body.email);

		await delay();

		if (!user || !storedPassword || storedPassword !== body.password) {
			return HttpResponse.json(
				{
					errorType: "COMMON",
					message: "Invalid Credentials",
				},
				{ status: 401 },
			);
		}

		const token = await generateTokens({
			userId: user.id,
			email: user.email,
		});

		return HttpResponse.json(
			{
				token,
				user,
			},
			{
				status: 200,
			},
		);
	}),
];

export { signInHandlers };
