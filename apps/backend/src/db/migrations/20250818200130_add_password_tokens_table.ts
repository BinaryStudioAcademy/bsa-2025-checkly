import { type Knex } from "knex";

const TABLE_NAMES = {
	PASSWORD_TOKENS: "password_tokens",
	USERS: "users",
};

const PasswordTokenColumnName = {
	CREATED_AT: "created_at",
	EXPIRATION_DATE: "expiration_date",
	ID: "id",
	TOKEN_HASH: "token_hash",
	TOKEN_SALT: "token_salt",
	UPDATED_AT: "updated_at",
	USER_ID: "user_id",
};

const UserColumnName = {
	ID: "id",
} as const;

function down(knex: Knex): Promise<void> {
	return knex.schema.dropTableIfExists(TABLE_NAMES.PASSWORD_TOKENS);
}

function up(knex: Knex): Promise<void> {
	return knex.schema.createTable(TABLE_NAMES.PASSWORD_TOKENS, (table) => {
		table.increments(PasswordTokenColumnName.ID).primary();
		table.text(PasswordTokenColumnName.TOKEN_HASH).notNullable();
		table.text(PasswordTokenColumnName.TOKEN_SALT).notNullable();
		table
			.integer(PasswordTokenColumnName.USER_ID)
			.notNullable()
			.references(UserColumnName.ID)
			.inTable(TABLE_NAMES.USERS);
		table
			.timestamp(PasswordTokenColumnName.EXPIRATION_DATE, { useTz: true })
			.defaultTo(knex.raw("NOW() + INTERVAL '1 hour'"));
		table
			.timestamp(PasswordTokenColumnName.CREATED_AT, { useTz: true })
			.notNullable()
			.defaultTo(knex.fn.now());
		table
			.dateTime(PasswordTokenColumnName.UPDATED_AT)
			.notNullable()
			.defaultTo(knex.fn.now());
	});
}

export { down, up };
