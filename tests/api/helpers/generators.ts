import { faker } from "@faker-js/faker";

const generateComplexPassword = (): string => {
	const length = faker.number.int({ max: 32, min: 8 });
	const lowercase = faker.string.alpha({ casing: "lower", length: 1 });
	const uppercase = faker.string.alpha({ casing: "upper", length: 1 });
	const digit = faker.string.numeric(1);
	const remaining = faker.internet.password({
		length: length - 3,
		memorable: false,
		pattern: /[a-zA-Z0-9!@#$%^&*]/,
	});

	const chars = (lowercase + uppercase + digit + remaining).split("");

	return faker.helpers.shuffle(chars).join("");
};

export const generateUser = () => {
	return {
		email: faker.internet.email(),
		name: `${faker.person.firstName()} ${faker.person.lastName()}`.replace(
			"'",
			"",
		),
		password: generateComplexPassword(),
	};
};
