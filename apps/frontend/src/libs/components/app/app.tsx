import React from "react";
import { ToastContainer } from "react-toastify";

type Properties = {
	children: React.ReactNode;
};

const App: React.FC<Properties> = ({ children }: Properties) => {
	return (
		<>
			{children}
			<ToastContainer />
		</>
	);
};

export { App };
