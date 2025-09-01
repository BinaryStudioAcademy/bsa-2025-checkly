type SignUpOptions = {
	// When true, do not throw if the email is already registered (default: true)
	tolerateExisting?: boolean;
};

export async function signUpUser(
	email: string,
	password: string,
	name = "Test User",
	options: SignUpOptions = { tolerateExisting: true },
) {
	const apiBase = process.env["API_URL"] ?? "http://localhost:3001/api/v1/";
	const url = `${apiBase}auth/register`;

	// Sanitize name: allow only letters and spaces (backend forbids digits/special chars)
	const safeName =
		name
			.replaceAll(/[^A-Za-z\s]/g, " ")
			.replaceAll(/\s+/g, " ")
			.trim() || "Test User";

	const res = await fetch(url, {
		body: JSON.stringify({ email, name: safeName, password }),
		headers: { "content-type": "application/json" },
		method: "POST",
	});

	if (res.ok) {
		return;
	}

	const { status } = res;
	const text = await res.text();

	// Tolerate "already exists" cases even if backend returns 400 or 500
	try {
		const json = JSON.parse(text);
		const alreadyExists =
			/email already in use/i.test(String(json?.message)) ||
			/duplicate key value/i.test(String(json?.message));

		if ((options.tolerateExisting ?? true) && alreadyExists) {
			return; // treat as "user is ready"
		}
	} catch {
		// Ignore JSON parse errors; fall through to throw
	}

	throw new Error(`Sign up failed: ${status} ${text}`);
}
