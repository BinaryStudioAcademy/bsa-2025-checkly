import { type ReactNode } from "react";
import { ToastContainer } from "react-toastify";

import { AppRoute } from "~/libs/enums/enums.js";
import {
	useAppDispatch,
	useAppSelector,
	useEffect,
	useLocation,
} from "~/libs/hooks/hooks.js";
import { actions as userActions } from "~/modules/users/users.js";

type Properties = {
	children: ReactNode;
};

const App: React.FC<Properties> = ({ children }: Properties) => {
	const { pathname } = useLocation();
	const dispatch = useAppDispatch();
	useAppSelector(({ users }) => ({
		dataStatus: users.dataStatus,
		users: users.users,
	}));

	const isRoot = pathname === AppRoute.ROOT;

	useEffect(() => {
		if (isRoot) {
			void dispatch(userActions.loadAll());
		}
	}, [isRoot, dispatch]);

	return (
		<>
			{children}
			<ToastContainer />
		</>
	);
};

export { App };
