import { http, HttpResponse } from "msw";

type LoginRequestBody = {
	name: string;
	email: string;
	password: string;
};

const mockUser: LoginRequestBody = {
	name: "admin",
	email: "admin@gmail.com",
	password: "paS1sword",
};

const mockToken =
	"eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjY2LCJpYXQiOjE3NTQ1NzU5NTAsImV4cCI6MTc1NDY2MjM1MH0.www1Dauo2DsQ3vwSA61IW4SM-SWeXNx129pFZpkFy38";

const signInHandlers = [
	http.post("/login", async ({ request }) => {
		const body = (await request.json()) as LoginRequestBody;

		const { email, password } = body;

		if (!email || !password) {
			return HttpResponse.json(
				{
					errorType: "VALIDATION",
					message: "Email and password are required",
				},
				{ status: 400 },
			);
		}

		if (email !== mockUser.email || password !== mockUser.password) {
			return HttpResponse.json(
				{
					errorType: "AUTH",
					message: "Invalid email or password",
				},
				{ status: 401 },
			);
		}

		return HttpResponse.json(
			{
				token: mockToken,
				user: {
					email,
					id: 1,
					name,
				},
			},
			{ status: 200 },
		);
	}),
];

export { signInHandlers };
