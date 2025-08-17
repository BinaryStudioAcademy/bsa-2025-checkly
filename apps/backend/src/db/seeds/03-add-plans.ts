import { type Knex } from "knex";

import { DatabaseTableName } from "~/libs/modules/database/database.js";

const assignPlansToUser = (userId: number): Record<string, unknown>[] => {
	return [
		{
			category_id: 3,
			created_at: new Date(),
			duration: 5,
			id: 1,
			intensity: "medium",
			title: "Daily Workout Routine",
			updated_at: new Date(),
			user_id: userId,
		},
		{
			category_id: 1,
			created_at: new Date(),
			duration: 14,
			id: 2,
			intensity: "medium",
			title: "Personal Growth Challenge",
			updated_at: new Date(),
			user_id: userId,
		},
		{
			category_id: 5,
			created_at: new Date(),
			duration: 21,
			id: 3,
			intensity: "low",
			title: "Creative Writing Journey",
			updated_at: new Date(),
			user_id: userId,
		},
		{
			category_id: 2,
			created_at: new Date(),
			duration: 14,
			id: 4,
			intensity: "low",
			title: "Meditation & Mindfulness",
			updated_at: new Date(),
			user_id: userId,
		},
		{
			category_id: 4,
			created_at: new Date(),
			duration: 21,
			id: 5,
			intensity: "high",
			title: "Financial Literacy Bootcamp",
			updated_at: new Date(),
			user_id: userId,
		},
		{
			category_id: 6,
			created_at: new Date(),
			duration: 14,
			id: 6,
			intensity: "medium",
			title: "Photography Skills",
			updated_at: new Date(),
			user_id: userId,
		},
		{
			category_id: 1,
			created_at: new Date(),
			duration: 21,
			id: 7,
			intensity: "low",
			title: "Morning Routine Builder",
			updated_at: new Date(),
			user_id: userId,
		},
		{
			category_id: 3,
			created_at: new Date(),
			duration: 5,
			id: 8,
			intensity: "high",
			title: "Quick Fitness Boost",
			updated_at: new Date(),
			user_id: userId,
		},
		{
			category_id: 6,
			created_at: new Date(),
			duration: 21,
			id: 9,
			intensity: "low",
			title: "Gardening Basics",
			updated_at: new Date(),
			user_id: userId,
		},
		{
			category_id: 4,
			created_at: new Date(),
			duration: 14,
			id: 10,
			intensity: "medium",
			title: "Investment Strategy",
			updated_at: new Date(),
			user_id: userId,
		},
		{
			category_id: 5,
			created_at: new Date(),
			duration: 14,
			id: 11,
			intensity: "medium",
			title: "Painting Fundamentals",
			updated_at: new Date(),
			user_id: userId,
		},
		{
			category_id: 2,
			created_at: new Date(),
			duration: 21,
			id: 12,
			intensity: "medium",
			title: "Spiritual Awakening",
			updated_at: new Date(),
			user_id: userId,
		},
	];
};

const ZERO_LENGTH = 0;
const FIRST_LIMIT = 1;

type UserRecord = {
	id: number;
};

async function seed(knex: Knex): Promise<void> {
	await knex(DatabaseTableName.PLANS).del();

	let userId: null | number = null;
	const existingUsers = await knex(DatabaseTableName.USERS)
		.select<UserRecord[]>("id")
		.limit(FIRST_LIMIT);

	if (existingUsers.length === ZERO_LENGTH) {
		const userSeedData = {
			email: "john@gmail.com",
			name: "john",
			// password: John1234
			password_hash:
				"c11fcc10e7cc4b9dd1c3a7015a10afc9dbae7bf75791777f96d9502634ce3a5e",
			password_salt:
				"5f4f61a7d7b36908a0d8cbf1321da017764c57439fbe28a297deb2e48d6e3e25f4511c1731253fd717a78733b60c60334e8b840e104d05e5664ecd9107279305751cb05d77ca52525ab7d3c37c7ed025300a870b70e9e3e3f7b60c84e168a8dbbef41a13717597ab7f815bc6e63246431b902c31bbd07eba0896a75ad7944ba561b06c73ea6540ddee44b7e7716ac7fd2aa658a6e1e45043641b10309074166bd9e59846057526250620132c6634f53bd7a139c19958dca747092ab80b213b8beb33fcd84cbf08eb5bbbe44780adea80ed012d828a89153397f3687a157bc1c4e81196687d0b1bc1086606dc5cd109815330b9f2705edcec8b447a921114c8c067bf4a53f4fdb56cc8e72c62924cc75f25d9d65d40d475ea40cfe638698d728c1cdab69e4b6aaa46ab5b955611492f58ae1eb8f68c385bd5cad207e72a3824085d2ac5bc0ca9f95b84cee63f5ed57366c74240d14ae6cf5f1f7733f00952d64c475242a2c85be078d1c49b9f2a209e2631b4d59f66e4bc1d2ae30ff751f09713dac2d29e9487e540cb9fdd1a74f809a8d5c3309e966db56d026955756e6d9d7f92c2528b715b5e19be3d9106ee2ae4cd34912c9d876c4005afbc2649c0fe690d84d7360e2c315d9973598c440eb05509adc421fdd29bd858e4d76aa42e11e3c0cdbfabfd3162323c7539eca3015898d8eda65fca",
		};

		const [user] = await knex(DatabaseTableName.USERS)
			.insert(userSeedData)
			.returning<UserRecord[]>("id");
		userId = user?.id as number;
	} else {
		userId = existingUsers[ZERO_LENGTH]?.id as number;
	}

	await knex(DatabaseTableName.PLANS).insert(assignPlansToUser(userId));
}

export { seed };
