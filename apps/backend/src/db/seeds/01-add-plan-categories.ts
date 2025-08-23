import { type Knex } from "knex";

import { DatabaseTableName } from "~/libs/modules/database/database.js";

async function seed(knex: Knex): Promise<void> {
	await knex(DatabaseTableName.PLANS).del();
	await knex(DatabaseTableName.PLAN_CATEGORIES).del();

	await knex(DatabaseTableName.PLAN_CATEGORIES).insert([
		{
			icon_href:
				"https://res.cloudinary.com/dezfqozcv/image/upload/v1755447659/personal-dev_qopczl.png",
			id: 1,
			key: "personal_development",
			order: 1,
			title: "Personal development",
		},
		{
			icon_href:
				"https://res.cloudinary.com/dezfqozcv/image/upload/v1755447659/spirituality_zae43g.png",
			id: 2,
			key: "spirituality",
			order: 2,
			title: "Spirituality",
		},
		{
			icon_href:
				"https://res.cloudinary.com/dezfqozcv/image/upload/v1755447659/sport_tfegpz.png",
			id: 3,
			key: "sport",
			order: 3,
			title: "Sport",
		},
		{
			icon_href:
				"https://res.cloudinary.com/dezfqozcv/image/upload/v1755447659/money_mebx58.png",
			id: 4,
			key: "money",
			order: 4,
			title: "Money",
		},
		{
			icon_href:
				"https://res.cloudinary.com/dezfqozcv/image/upload/v1755447659/creativity_lgykq1.png",
			id: 5,
			key: "creativity",
			order: 5,
			title: "Creativity",
		},
		{
			icon_href:
				"https://res.cloudinary.com/dezfqozcv/image/upload/v1755447659/hobby_iz6zym.png",
			id: 6,
			key: "hobby",
			order: 6,
			title: "Hobby",
		},
	]);
}

export { seed };
