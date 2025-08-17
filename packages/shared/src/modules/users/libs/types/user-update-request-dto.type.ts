import { type z } from "zod";

import { type userUpdate } from "../validation-schemas/user-update.validation-schema.js";

type UserUpdateRequestDto = z.infer<typeof userUpdate>;

export { type UserUpdateRequestDto };
