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
			order: 1,
			slug: "personal_development",
			title: "Personal development",
		},
		{
			icon_href:
				"https://res.cloudinary.com/dezfqozcv/image/upload/v1755447659/spirituality_zae43g.png",
			id: 2,
			order: 2,
			slug: "spirituality",
			title: "Spirituality",
		},
		{
			icon_href:
				"https://res.cloudinary.com/dezfqozcv/image/upload/v1755447659/sport_tfegpz.png",
			id: 3,
			order: 3,
			slug: "sport",
			title: "Sport",
		},
		{
			icon_href:
				"https://res.cloudinary.com/dezfqozcv/image/upload/v1755447659/money_mebx58.png",
			id: 4,
			order: 4,
			slug: "money",
			title: "Money",
		},
		{
			icon_href:
				"https://res.cloudinary.com/dezfqozcv/image/upload/v1755447659/creativity_lgykq1.png",
			id: 5,
			order: 5,
			slug: "creativity",
			title: "Creativity",
		},
		{
			icon_href:
				"https://res.cloudinary.com/dezfqozcv/image/upload/v1755447659/hobby_iz6zym.png",
			id: 6,
			order: 6,
			slug: "hobby",
			title: "Hobby",
		},
	]);
}

export { seed };
