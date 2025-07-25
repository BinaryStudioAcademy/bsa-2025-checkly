import { type JSX } from "react";
import { NavLink } from "react-router-dom";

const Nav = (): JSX.Element => {
	return (
		<nav className="cluster">
			<NavLink to="/start-quiz">Start quiz</NavLink>
			<NavLink to="/sign-in">Sign in</NavLink>
		</nav>
	);
};

export { Nav };
