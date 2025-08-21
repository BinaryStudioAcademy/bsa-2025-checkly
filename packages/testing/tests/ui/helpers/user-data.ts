import { faker } from "@faker-js/faker";

/** Build fixed-length strings (internal, used by helpers). */
const repeat = (ch: string, n: number) => ch.repeat(n);

/** prevents duplicate emails across local runs. */
const runId = `${Date.now()}-${Math.round(Math.random() * 1e6)}`;

/** Make per-run unique strings (internal). */
const makeUnique = (base: string) => `${base}.${runId}`;

/* =========================
 * NAME (3..32)
 * =======================*/
export const validName = (): string => faker.person.firstName();

/* =========================
 * EMAIL
 * =======================*/
export const uniqueEmail = (prefix = "user"): string =>
	`${makeUnique(prefix)}@${faker.internet.domainName()}`;

/* =========================
 * PASSWORD (8..32, 1U/1l/1d)
 * =======================*/
export const validPassword = (n = 12): string =>
	"A" + repeat("a", Math.max(0, n - 3)) + "1";
