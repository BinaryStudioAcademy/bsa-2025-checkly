type EncryptedData = { hash: string; salt: string };

type Encryptor = {
	compare(value: string, storedHash: string, salt: string): Promise<boolean>;
	encrypt(value: string): Promise<EncryptedData>;
};

export { type EncryptedData, type Encryptor };
