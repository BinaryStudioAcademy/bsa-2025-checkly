import { type JSX } from "react";

import { Link } from "~/libs/components/components.js";

const Nav = (): JSX.Element => {
	return (
		<nav className="cluster">
			<Link to="/">Start quiz</Link>
			<Link to="/sign-in">Sign in</Link>
		</nav>
	);
};

export { Nav };
