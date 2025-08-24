type PasswordTokenDto = {
	expirationDate: Date;
	id?: number;
	token?: string;
	userId: number;
};

export { type PasswordTokenDto };
