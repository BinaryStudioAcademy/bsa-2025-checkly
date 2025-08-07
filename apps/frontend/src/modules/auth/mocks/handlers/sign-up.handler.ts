import { http, HttpResponse } from "msw";

type RegisterRequestBody = {
	email: string;
	name: string;
	password: string;
};

const mockUser: RegisterRequestBody = {
	name: "admin",
	email: "admin@gmail.com",
	password: "paS1sword",
};

const mockToken =
	"eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjY2LCJpYXQiOjE3NTQ1NzU5NTAsImV4cCI6MTc1NDY2MjM1MH0.www1Dauo2DsQ3vwSA61IW4SM-SWeXNx129pFZpkFy38";

const signUpHandlers = [
	http.post("/register", async ({ request }) => {
		const body = (await request.json()) as RegisterRequestBody;

		const { email, name } = body;

		if (email === mockUser.email) {
			return HttpResponse.json(
				{
					errorType: "COMMON",
					message: "Email already in use",
				},
				{ status: 400 },
			);
		}

		if (!/^[A-Za-z]+(?:[-\s][A-Za-z]+)*$/.test(name)) {
			return HttpResponse.json(
				{
					errorType: "VALIDATION",
					message:
						"Spaces and hyphens are allowed, as long as they are surrounded by letters",
				},
				{ status: 400 },
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
			{ status: 201 },
		);
	}),
];

export { signUpHandlers };
