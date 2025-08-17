import { ApiSchemas } from "~/libs/modules/api/schema/schema.js";

const MOCK_USERS: ApiSchemas["User"][] = [
	{
		id: 1,
		email: "admin@gmail.com",
		name: "admin",
	},
];

const DEFAULT_USER_INDEX = 1;

const TOKEN =
	"eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjY2LCJpYXQiOjE3NTQ1NzU5NTAsImV4cCI6MTc1NDY2MjM1MH0.www1Dauo2DsQ3vwSA61IW4SM-SWeXNx129pFZpkFy38";

const USER_PASSWORDS = new Map<string, string>([
	["admin@gmail.com", "123456!Aa"],
]);

const INCREMENT = 1;

export { MOCK_USERS, TOKEN, USER_PASSWORDS, INCREMENT, DEFAULT_USER_INDEX };
