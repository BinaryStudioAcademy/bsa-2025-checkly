import { type JSX, StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "~/assets/css/styles.css";
import {
	App,
	ProtectedRoute,
	RouterProvider,
	StoreProvider,
} from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/enums.js";
import { enableMocking } from "~/libs/modules/api/mocks/mocks.js";
import { store } from "~/libs/modules/store/store.js";

import { routes } from "./routes.js";

const Root = (): JSX.Element => {
	return (
		<StrictMode>
			<StoreProvider store={store.instance}>
				<RouterProvider
					routes={[
						{
							children: routes,
							element: (
								<App>
									<ProtectedRoute />
								</App>
							),
							path: AppRoute.ROOT,
						},
					]}
				/>
			</StoreProvider>
		</StrictMode>
	);
};

await enableMocking();

createRoot(document.querySelector("#root") as HTMLElement).render(<Root />);
