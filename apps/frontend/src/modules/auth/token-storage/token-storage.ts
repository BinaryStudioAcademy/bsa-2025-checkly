interface TokenStorage {
	clear(): void;
    get(): null | string;
    store(token: string): void;
}

export { type TokenStorage };
