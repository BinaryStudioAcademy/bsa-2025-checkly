type EncryptedData = { hash: string; salt: string };

type Encryptor = {
	compare(value: string, storedHash: string, salt: string): Promise<boolean>;
	encrypt(value: string): Promise<{ hash: string; salt: string }>;
};

export { type EncryptedData, type Encryptor };
