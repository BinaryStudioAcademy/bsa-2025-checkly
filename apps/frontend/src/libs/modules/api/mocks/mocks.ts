import { AppEnvironment } from "~/libs/enums/enums.js";
import { config } from "~/libs/modules/config/config.js";

async function enableMocking(): Promise<ServiceWorkerRegistration | undefined> {
	if (config.ENV.APP.ENVIRONMENT !== AppEnvironment.LOCAL) {
		return;
	}

	const { worker } = await import("./browser.js");

	return await worker.start();
}

export { enableMocking };
