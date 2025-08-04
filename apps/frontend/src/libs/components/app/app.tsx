import { ToastContainer } from "react-toastify";

import { RouterOutlet } from "~/libs/components/components.js";

const App: React.FC = () => {
	return (
		<>
			<RouterOutlet />
			<ToastContainer />
		</>
	);
};

export { App };
