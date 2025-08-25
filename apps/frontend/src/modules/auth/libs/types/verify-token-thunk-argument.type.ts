import { type VerifyTokenRequestDto } from "~/libs/types/types.js";

type VerifyTokenThunkArgument = VerifyTokenRequestDto & {
	navigate: (path: string) => Promise<void> | void;
};

export { type VerifyTokenThunkArgument };
