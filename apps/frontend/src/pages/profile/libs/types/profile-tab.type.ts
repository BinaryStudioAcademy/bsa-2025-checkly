import { type ProfileTab } from "../enums/enums.js";

type ProfileTabType = (typeof ProfileTab)[keyof typeof ProfileTab];

export { type ProfileTabType };
