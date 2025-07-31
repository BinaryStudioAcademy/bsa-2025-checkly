import { type FC } from "react";

import { getClassNames } from "~/libs/helpers/get-class-names.js";

import { FeedbackCard } from "./components/feedback-card/feedback-card.js";
import { FeedbackSectionDecoration } from "./components/feedback-decoration/feedbacksection-decoration.js";
import styles from "./styles.module.css";

const FEEDBACKS = [
	{
		avatar: "src/assets/img/home/roy.jpg",
		id: 1,
		name: "Roy",
		text: "Lorem ipsum dolor amet, consectetur adipiscing elit. Cras sed dui sagittis, scelerisque lectus at, porttitor lectus. Sed libero est, tincidunt eget purus nec, dignissim consequat mauris",
	},
	{
		avatar: "src/assets/img/home/emma.jpg",
		id: 2,
		name: "Emma",
		text: "Nulla et nulla pulvinar, congue justo id, cursus ligula. Nunc pharetra sapien libero, vel blandit orci rhoncus ut. Sed aliquam efficitur semper.",
	},
	{
		avatar: "src/assets/img/home/joan.jpg",
		id: 3,
		name: "Joan",
		text: "Nullam tempus, elit non tempus molestie, tellus diam sagittis urna, vel viverra velit risus in nunc. Cras in quam leo. Nullam mattis at lacus eget pretium. Etiam quis pulvinar",
	},
] as const;

const FeedbacksSection: FC = () => {
	return (
		<div className={getClassNames(styles["wrapper"])}>
			<FeedbackSectionDecoration />
			<div className={styles["container"]}>
				<h2 className={styles["title"]}>Testimonials</h2>
				<div className={styles["grid"]}>
					{FEEDBACKS.map((item) => (
						<FeedbackCard key={item.id} {...item} />
					))}
				</div>
			</div>
		</div>
	);
};

export { FeedbacksSection };
