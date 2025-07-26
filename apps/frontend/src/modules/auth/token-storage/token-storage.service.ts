import { type TokenStorage } from "./token-storage.js";

class BaseTokenStorage implements TokenStorage {
	private readonly tokenKey = "token";

	public clear(): void {
		localStorage.removeItem(this.tokenKey);
	}

	public get(): null | string {
		return localStorage.getItem(this.tokenKey);
	}

	public store(token: string): void {
		localStorage.setItem(this.tokenKey, token);
	}
}

export { BaseTokenStorage };
