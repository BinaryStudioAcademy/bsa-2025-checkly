import { AppHeader } from "~/libs/components/components.js";
import { PlanStyle } from "~/libs/components/plan-styles/plan-style/plan-style.js";
import { type PlanStyleOption } from "~/libs/types/types.js";

const SELECTED_STYLE: PlanStyleOption = "withremarks";

const TestPage: React.FC = () => {
	return (
		<>
			<AppHeader />
			<main
				style={{
					display: "flex",
					flexDirection: "column",
					height: "100vh",
					paddingTop: 64,
				}}
			>
				<div
					style={{
						backgroundColor: "#f1f1f1",
						borderBottom: "1px solid #000",
						height: 64,
					}}
				/>
				<div style={{ flex: "1 1 auto", overflowY: "auto" }}>
					<PlanStyle inputStyle={SELECTED_STYLE} />
				</div>
				<div
					style={{
						backgroundColor: "#f1f1f1",
						borderBottom: "1px solid #000",
						height: 64,
					}}
				/>
			</main>
		</>
	);
};

export { TestPage };
