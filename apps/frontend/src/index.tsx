import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "~/assets/css/styles.css";
import {
	App,
	ProtectedRoute,
	RouterProvider,
	StoreProvider,
} from "~/libs/components/components.js";
import { AppRoute } from "~/libs/enums/enums.js";
import { store } from "~/libs/modules/store/store.js";

import { Wrapper } from "./pages/dashboard-wrapper-mock/components/wrapper.js";
import { NotFound } from "./pages/not-found-page/not-found-page.js";
import { Auth, Home } from "./pages/pages.js";

createRoot(document.querySelector("#root") as HTMLElement).render(
	<StrictMode>
		<StoreProvider store={store.instance}>
			<RouterProvider
				routes={[
					{
						children: [
							{
								element: <Home />,
								path: AppRoute.ROOT,
							},
							{
								element: <Auth />,
								path: AppRoute.SIGN_IN,
							},
							{
								element: <Auth />,
								path: AppRoute.SIGN_UP,
							},
							{
								children: [
									{
										element: <Wrapper />,
										path: AppRoute.DASHBOARD,
									},
									{
										element: <Wrapper />,
										path: AppRoute.PLAN,
									},
								],
								element: <ProtectedRoute />,
								path: AppRoute.ROOT,
							},
							{
								element: <NotFound />,
								path: "*",
							},
						],
						element: <App />,
						path: AppRoute.ROOT,
					},
				]}
			/>
		</StoreProvider>
	</StrictMode>,
);
