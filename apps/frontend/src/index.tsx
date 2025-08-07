import { type JSX, StrictMode, useEffect } from "react";
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
	useEffect(() => {
		const startMocking = async (): Promise<void> => {
			await enableMocking();
		};

		void startMocking();
	}, []);

	return (
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
											children: [
												{
													element: <Plan />,
													path: AppRoute.PLAN,
												},
												{
													element: <Dashboard />,
													path: AppRoute.DASHBOARD,
												},
											],
											element: <Wrapper />,
											path: AppRoute.ROOT,
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
		</StrictMode>
	);
};

createRoot(document.querySelector("#root") as HTMLElement).render(<Root />);
