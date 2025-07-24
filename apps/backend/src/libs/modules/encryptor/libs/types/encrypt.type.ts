type Encryptor = {
	decrypt(value: string, storedHash: string, salt: string): Promise<boolean>;
	encrypt(value: string): Promise<{ hash: string; salt: string }>;
};

export { type Encryptor };
