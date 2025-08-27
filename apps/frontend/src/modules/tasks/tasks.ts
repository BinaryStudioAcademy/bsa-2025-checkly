import { config } from "~/libs/modules/config/config.js";
import { http } from "~/libs/modules/http/http.js";
import { storage } from "~/libs/modules/storage/storage.js";

import { TaskApi } from "./tasks-api.js";

const taskApi = new TaskApi({
	baseUrl: config.ENV.API.ORIGIN_URL,
	http,
	storage,
});

export { taskApi };
export { getIdParameter } from "./libs/helpers/helpers.js";
export { actions, reducer } from "./slices/task.js";
export {
	type TaskDto,
	TasksApiPath,
	type TaskUpdateRequestDto,
} from "~/modules/tasks/libs/types/types.js";
