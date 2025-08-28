import { type IdParameter } from "../../../index.js";

const getIdParameter = (id: number): IdParameter => {
	return {
		id: String(id),
	};
};

export { getIdParameter };
