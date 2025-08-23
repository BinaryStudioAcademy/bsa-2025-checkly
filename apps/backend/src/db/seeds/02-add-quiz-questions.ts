import { type Knex } from "knex";

import { DatabaseTableName } from "~/libs/modules/database/database.js";

const QuizQuestionFormat = {
	MULTIPLE_CHOICE: "multiple_choice",
	MULTIPLE_CHOICE_WITH_TEXT_INPUT: "multiple_choice_with_text_input",
	SINGLE_CHOICE: "single_choice",
	SINGLE_CHOICE_WITH_TEXT_INPUT: "single_choice_with_text_input",
	TEXT_INPUT: "text_input",
} as const;

async function seed(knex: Knex): Promise<void> {
	await knex(DatabaseTableName.QUESTION_OPTIONS).del();
	await knex(DatabaseTableName.QUESTIONS).del();
	await knex(DatabaseTableName.QUESTIONS_CATEGORIES).del();

	await knex(DatabaseTableName.QUESTIONS).insert([
		// Personal Development Questions (Category 1)
		{
			id: 1,
			is_optional: false,
			text: "What aspect of your personal growth are you most interested in improving right now?",
			type: QuizQuestionFormat.SINGLE_CHOICE_WITH_TEXT_INPUT,
		},
		{
			id: 2,
			is_optional: false,
			text: "Which personal development outcome would feel most meaningful to you in the near future?",
			type: QuizQuestionFormat.SINGLE_CHOICE,
		},
		// Spirituality Questions (Category 2)
		{
			id: 3,
			is_optional: false,
			text: "In your spiritual journey, what is your primary area of focus right now?",
			type: QuizQuestionFormat.SINGLE_CHOICE_WITH_TEXT_INPUT,
		},
		{
			id: 4,
			is_optional: false,
			text: "Which spiritual milestone would you like to achieve in the coming months?",
			type: QuizQuestionFormat.SINGLE_CHOICE,
		},
		// Sport Questions (Category 3)
		{
			id: 5,
			is_optional: false,
			text: "What sport or fitness activity are you focused on right now?",
			type: QuizQuestionFormat.TEXT_INPUT,
		},
		{
			id: 6,
			is_optional: false,
			text: "What is your primary goal within that activity?",
			type: QuizQuestionFormat.SINGLE_CHOICE_WITH_TEXT_INPUT,
		},
		// Money Questions (Category 4)
		{
			id: 7,
			is_optional: false,
			text: "When it comes to your finances, what area are you most focused on improving right now?",
			type: QuizQuestionFormat.SINGLE_CHOICE_WITH_TEXT_INPUT,
		},
		{
			id: 8,
			is_optional: false,
			text: "Which financial milestone would be most exciting for you to reach in the short term?",
			type: QuizQuestionFormat.SINGLE_CHOICE,
		},
		// Creativity Questions (Category 5)
		{
			id: 9,
			is_optional: false,
			text: "What aspect of your creative journey are you most eager to explore or develop?",
			type: QuizQuestionFormat.SINGLE_CHOICE_WITH_TEXT_INPUT,
		},
		{
			id: 10,
			is_optional: false,
			text: "Which of these creative achievements would you find most fulfilling in the near future?",
			type: QuizQuestionFormat.SINGLE_CHOICE,
		},
		// Hobby Questions (Category 6)
		{
			id: 11,
			is_optional: false,
			text: "What hobby are you currently interested in?",
			type: QuizQuestionFormat.TEXT_INPUT,
		},
		{
			id: 12,
			is_optional: false,
			text: "What do you hope to achieve with this hobby?",
			type: QuizQuestionFormat.SINGLE_CHOICE,
		},
		// General Questions (originally questions 2-11, now 13-22)
		{
			id: 13,
			is_optional: false,
			text: "How much time can you realistically dedicate per day?",
			type: QuizQuestionFormat.SINGLE_CHOICE,
		},
		{
			id: 14,
			is_optional: true,
			text: "When do you usually have the most energy?",
			type: QuizQuestionFormat.SINGLE_CHOICE,
		},
		{
			id: 15,
			is_optional: true,
			text: "What type of tasks do you enjoy more?",
			type: QuizQuestionFormat.SINGLE_CHOICE,
		},
		{
			id: 16,
			is_optional: true,
			text: "What motivates you the most right now?",
			type: QuizQuestionFormat.SINGLE_CHOICE_WITH_TEXT_INPUT,
		},
		{
			id: 17,
			is_optional: true,
			text: "How structured do you want your plan to be?",
			type: QuizQuestionFormat.SINGLE_CHOICE,
		},
		{
			id: 18,
			is_optional: true,
			text: "What's your current emotional state?",
			type: QuizQuestionFormat.SINGLE_CHOICE_WITH_TEXT_INPUT,
		},
		{
			id: 19,
			is_optional: true,
			text: "Do you want your plan to include social or interactive tasks?",
			type: QuizQuestionFormat.SINGLE_CHOICE,
		},
		{
			id: 20,
			is_optional: true,
			text: "Do you have any limitations we should consider?",
			type: QuizQuestionFormat.SINGLE_CHOICE_WITH_TEXT_INPUT,
		},
		{
			id: 21,
			is_optional: true,
			text: "Have you ever followed a structured plan like this before?",
			type: QuizQuestionFormat.SINGLE_CHOICE,
		},
		{
			id: 22,
			is_optional: true,
			text: "Choose your plan duration",
			type: QuizQuestionFormat.SINGLE_CHOICE,
		},
		{
			id: 23,
			is_optional: false,
			text: "What style of work fits you best?",
			type: QuizQuestionFormat.SINGLE_CHOICE,
		},
	]);

	await knex(DatabaseTableName.QUESTION_OPTIONS).insert([
		// Personal Development Question 1 Options
		{
			order: 1,
			question_id: 1,
			text: "💪 Becoming more disciplined and productive",
		},
		{
			order: 2,
			question_id: 1,
			text: "🗣️ Improving my communication and social skills",
		},
		{
			order: 3,
			question_id: 1,
			text: "🧠 Enhancing my emotional intelligence and resilience",
		},
		{
			order: 4,
			question_id: 1,
			text: "🌱 Exploring new interests and expanding my knowledge",
		},
		{
			order: 5,
			question_id: 1,
			text: "✨ Cultivating a positive mindset and self-confidence",
		},
		{ order: 6, question_id: 1, text: "✍️ Other" },

		// Personal Development Question 2 Options
		{
			order: 1,
			question_id: 2,
			text: "🎯 Consistently achieving my goals and feeling in control of my time",
		},
		{
			order: 2,
			question_id: 2,
			text: "💞 Building stronger, more fulfilling relationships",
		},
		{
			order: 3,
			question_id: 2,
			text: "🕊️ Feeling a greater sense of peace and emotional stability",
		},
		{
			order: 4,
			question_id: 2,
			text: "⚡ Discovering a new passion or skill that energizes me",
		},
		{
			order: 5,
			question_id: 2,
			text: "🦋 Overcoming self-doubt and feeling truly comfortable in my own skin",
		},

		// Spirituality Question 1 Options
		{
			order: 1,
			question_id: 3,
			text: "🧘 Deepening my meditation or prayer practice",
		},
		{
			order: 2,
			question_id: 3,
			text: "🤝 Connecting with a community or finding like-minded people",
		},
		{
			order: 3,
			question_id: 3,
			text: "📚 Understanding philosophical concepts and spiritual texts",
		},
		{
			order: 4,
			question_id: 3,
			text: "🙏 Cultivating more gratitude and a positive outlook",
		},
		{
			order: 5,
			question_id: 3,
			text: "☮️ Developing a greater sense of inner peace and presence",
		},
		{ order: 6, question_id: 3, text: "✍️ Other" },

		// Spirituality Question 2 Options
		{
			order: 1,
			question_id: 4,
			text: "📿 Establishing a consistent daily spiritual routine",
		},
		{
			order: 2,
			question_id: 4,
			text: "🕯️ Finding a supportive group or mentor to guide me",
		},
		{
			order: 3,
			question_id: 4,
			text: "🧭 Gaining clarity on my core beliefs and purpose",
		},
		{
			order: 4,
			question_id: 4,
			text: "😌 Experiencing more moments of joy and contentment",
		},
		{
			order: 5,
			question_id: 4,
			text: "🌍 Feeling more connected to myself and the world around me",
		},

		// Sport Question 2 Options (Question 5 is text input, no options needed)
		{
			order: 1,
			question_id: 6,
			text: "💪 Increasing my strength and building muscle",
		},
		{
			order: 2,
			question_id: 6,
			text: "🏃‍♀️ Improving my endurance and cardiovascular fitness",
		},
		{
			order: 3,
			question_id: 6,
			text: "⚖️ Losing weight or improving my body composition",
		},
		{
			order: 4,
			question_id: 6,
			text: "🎯 Mastering a specific skill or technique",
		},
		{
			order: 5,
			question_id: 6,
			text: "🏆 Training for a specific event or competition",
		},
		{ order: 6, question_id: 6, text: "✍️ Other" },

		// Money Question 1 Options
		{
			order: 1,
			question_id: 7,
			text: "📊 Creating and sticking to a personal budget",
		},
		{
			order: 2,
			question_id: 7,
			text: "💳 Paying off debt and becoming debt-free",
		},
		{
			order: 3,
			question_id: 7,
			text: "🏦 Building up my savings or emergency fund",
		},
		{
			order: 4,
			question_id: 7,
			text: "📈 Investing my money for long-term growth",
		},
		{
			order: 5,
			question_id: 7,
			text: "💰 Increasing my income or finding new revenue streams",
		},
		{ order: 6, question_id: 7, text: "✍️ Other" },

		// Money Question 2 Options
		{
			order: 1,
			question_id: 8,
			text: "🎛️ Feeling confident and in control of my monthly spending",
		},
		{
			order: 2,
			question_id: 8,
			text: "🚫 Eliminating a significant amount of debt",
		},
		{
			order: 3,
			question_id: 8,
			text: "🎯 Seeing my savings account reach a specific target",
		},
		{
			order: 4,
			question_id: 8,
			text: "📊 Making my first investment or seeing my portfolio grow",
		},
		{
			order: 5,
			question_id: 8,
			text: "🚀 Starting a side hustle or getting a raise at work",
		},

		// Creativity Question 1 Options
		{
			order: 1,
			question_id: 9,
			text: "💡 Finding new ideas and overcoming creative blocks",
		},
		{
			order: 2,
			question_id: 9,
			text: "🛠️ Improving my technical skills in a specific medium",
		},
		{
			order: 3,
			question_id: 9,
			text: "📅 Building a consistent creative routine or habit",
		},
		{
			order: 4,
			question_id: 9,
			text: "📂 Sharing my work with others and building a creative portfolio",
		},
		{
			order: 5,
			question_id: 9,
			text: "🎨 Experimenting with new styles and pushing my artistic boundaries",
		},
		{ order: 6, question_id: 9, text: "✍️ Other" },

		// Creativity Question 2 Options
		{
			order: 1,
			question_id: 10,
			text: "🌊 Consistently creating work without feeling stuck",
		},
		{
			order: 2,
			question_id: 10,
			text: "⚡ Feeling confident in my ability to execute a new technique",
		},
		{
			order: 3,
			question_id: 10,
			text: "✅ Finishing a specific project or series of work",
		},
		{
			order: 4,
			question_id: 10,
			text: "👏 Getting positive feedback or selling a piece of my work",
		},
		{
			order: 5,
			question_id: 10,
			text: "🦄 Creating something that feels truly unique and authentic to me",
		},

		// Hobby Question 2 Options (Question 11 is text input, no options needed)
		{
			order: 1,
			question_id: 12,
			text: "🚀 Finding and starting a new project",
		},
		{
			order: 2,
			question_id: 12,
			text: "📈 Improving my skills and techniques",
		},
		{
			order: 3,
			question_id: 12,
			text: "👥 Connecting with a community of people who share my interest",
		},
		{
			order: 4,
			question_id: 12,
			text: "💼 Turning it into a side business or professional pursuit",
		},
		{
			order: 5,
			question_id: 12,
			text: "🎁 Creating something specific and having a finished product to show for it",
		},

		{ order: 1, question_id: 13, text: "⏱ 10–15 min" },
		{ order: 2, question_id: 13, text: "⏱ 20–30 min" },
		{ order: 3, question_id: 13, text: "⏱ 45–60 min" },
		{ order: 4, question_id: 13, text: "⏱ 1–2 hours" },
		{ order: 5, question_id: 13, text: "⏱ More than 2 hours" },

		{ order: 1, question_id: 14, text: "🌅 Morning" },
		{ order: 2, question_id: 14, text: "🌞 Midday" },
		{ order: 3, question_id: 14, text: "🌇 Evening" },
		{ order: 4, question_id: 14, text: "🌙 Night owl" },
		{ order: 5, question_id: 14, text: "🤷 Depends on the day" },

		{
			order: 1,
			question_id: 15,
			text: "🎯 Action-based (physical or practical tasks)",
		},
		{
			order: 2,
			question_id: 15,
			text: "🧘‍♀️ Reflective (journaling, mindfulness, thought exercises)",
		},
		{
			order: 3,
			question_id: 15,
			text: "🎓 Learning (courses, reading, exploration)",
		},
		{
			order: 4,
			question_id: 15,
			text: "🎨 Creative (writing, making, designing)",
		},
		{ order: 5, question_id: 15, text: "🌀 I like a mix!" },

		{ order: 1, question_id: 16, text: "🎁 Achieving a concrete result" },
		{ order: 2, question_id: 16, text: "🧭 Building new habits or discipline" },
		{ order: 3, question_id: 16, text: "🧡 Feeling better emotionally" },
		{ order: 4, question_id: 16, text: "💡 Exploring something new" },
		{ order: 5, question_id: 16, text: "🧘‍♂️ Slowing down / restoring balance" },
		{ order: 6, question_id: 16, text: "✍️ Other" },

		{
			order: 1,
			question_id: 17,
			text: "📋 Fully structured (clear steps, order, timing)",
		},
		{
			order: 2,
			question_id: 17,
			text: "🧩 Semi-structured (general guide, but flexible)",
		},
		{
			order: 3,
			question_id: 17,
			text: "☁️ Loose & inspirational (just suggestions)",
		},

		{ order: 1, question_id: 18, text: "🥱 Tired" },
		{ order: 2, question_id: 18, text: "😵 Overwhelmed" },
		{ order: 3, question_id: 18, text: "😐 Meh" },
		{ order: 4, question_id: 18, text: "😊 Calm" },
		{ order: 5, question_id: 18, text: "🔥 Pumped & excited" },
		{ order: 6, question_id: 18, text: "✍️ Other" },

		{ order: 1, question_id: 19, text: "👯 Yes, I like engaging with others" },
		{ order: 2, question_id: 19, text: "☕ Only if it's optional" },
		{ order: 3, question_id: 19, text: "🙅 No, I prefer solo activities" },

		{ order: 1, question_id: 20, text: "🧍‍♀️ Physical limitations" },
		{ order: 2, question_id: 20, text: "🕒 Limited free time" },
		{
			order: 3,
			question_id: 20,
			text: "🌐 No internet during parts of the day",
		},
		{ order: 4, question_id: 20, text: "📍 Only at home (can't go out)" },
		{ order: 5, question_id: 20, text: "✍️ Other" },

		{ order: 1, question_id: 21, text: "✅ Yes, and I loved it" },
		{ order: 2, question_id: 21, text: "✅ Yes, but I dropped it quickly" },
		{ order: 3, question_id: 21, text: "❌ No, this is my first time" },
		{ order: 4, question_id: 21, text: "🤔 Not sure" },

		{ order: 1, question_id: 22, text: "5-day micro boost" },
		{ order: 2, question_id: 22, text: "14-day reset" },
		{ order: 3, question_id: 22, text: "21-day habit builder" },
		{ order: 4, question_id: 22, text: "🤷 Not sure yet — surprise me!" },

		{ order: 1, question_id: 23, text: "🐾 Many small steps" },
		{ order: 2, question_id: 23, text: "🏋️‍♂️ A few big challenges" },
		{ order: 3, question_id: 23, text: "👌 I like a bit of both" },
	]);

	await knex(DatabaseTableName.QUESTIONS_CATEGORIES).insert([
		// Personal Development Questions (Category 1)
		{ category_id: 1, order: 1, question_id: 1 },
		{ category_id: 1, order: 2, question_id: 2 },

		// Spirituality Questions (Category 2)
		{ category_id: 2, order: 1, question_id: 3 },
		{ category_id: 2, order: 2, question_id: 4 },

		// Sport Questions (Category 3)
		{ category_id: 3, order: 1, question_id: 5 },
		{ category_id: 3, order: 2, question_id: 6 },

		// Money Questions (Category 4)
		{ category_id: 4, order: 1, question_id: 7 },
		{ category_id: 4, order: 2, question_id: 8 },

		// Creativity Questions (Category 5)
		{ category_id: 5, order: 1, question_id: 9 },
		{ category_id: 5, order: 2, question_id: 10 },

		// Hobby Questions (Category 6)
		{ category_id: 6, order: 1, question_id: 11 },
		{ category_id: 6, order: 2, question_id: 12 },

		// General Questions for all categories
		{ category_id: 1, order: 3, question_id: 23 },
		{ category_id: 2, order: 3, question_id: 23 },
		{ category_id: 3, order: 3, question_id: 23 },
		{ category_id: 4, order: 3, question_id: 23 },
		{ category_id: 5, order: 3, question_id: 23 },
		{ category_id: 6, order: 3, question_id: 23 },

		{ category_id: 1, order: 4, question_id: 13 },
		{ category_id: 2, order: 4, question_id: 13 },
		{ category_id: 3, order: 4, question_id: 13 },
		{ category_id: 4, order: 4, question_id: 13 },
		{ category_id: 5, order: 4, question_id: 13 },
		{ category_id: 6, order: 4, question_id: 13 },

		{ category_id: 1, order: 5, question_id: 14 },
		{ category_id: 2, order: 5, question_id: 14 },
		{ category_id: 3, order: 5, question_id: 14 },
		{ category_id: 4, order: 5, question_id: 14 },
		{ category_id: 5, order: 5, question_id: 14 },
		{ category_id: 6, order: 5, question_id: 14 },

		{ category_id: 1, order: 6, question_id: 15 },
		{ category_id: 2, order: 6, question_id: 15 },
		{ category_id: 3, order: 6, question_id: 15 },
		{ category_id: 4, order: 6, question_id: 15 },
		{ category_id: 5, order: 6, question_id: 15 },
		{ category_id: 6, order: 6, question_id: 15 },

		{ category_id: 1, order: 7, question_id: 16 },
		{ category_id: 2, order: 7, question_id: 16 },
		{ category_id: 3, order: 7, question_id: 16 },
		{ category_id: 4, order: 7, question_id: 16 },
		{ category_id: 5, order: 7, question_id: 16 },
		{ category_id: 6, order: 7, question_id: 16 },

		{ category_id: 1, order: 8, question_id: 17 },
		{ category_id: 2, order: 8, question_id: 17 },
		{ category_id: 3, order: 8, question_id: 17 },
		{ category_id: 4, order: 8, question_id: 17 },
		{ category_id: 5, order: 8, question_id: 17 },
		{ category_id: 6, order: 8, question_id: 17 },

		{ category_id: 1, order: 9, question_id: 18 },
		{ category_id: 2, order: 9, question_id: 18 },
		{ category_id: 3, order: 9, question_id: 18 },
		{ category_id: 4, order: 9, question_id: 18 },
		{ category_id: 5, order: 9, question_id: 18 },
		{ category_id: 6, order: 9, question_id: 18 },

		{ category_id: 1, order: 10, question_id: 19 },
		{ category_id: 2, order: 10, question_id: 19 },
		{ category_id: 3, order: 10, question_id: 19 },
		{ category_id: 4, order: 10, question_id: 19 },
		{ category_id: 5, order: 10, question_id: 19 },
		{ category_id: 6, order: 10, question_id: 19 },

		{ category_id: 1, order: 11, question_id: 20 },
		{ category_id: 2, order: 11, question_id: 20 },
		{ category_id: 3, order: 11, question_id: 20 },
		{ category_id: 4, order: 11, question_id: 20 },
		{ category_id: 5, order: 11, question_id: 20 },
		{ category_id: 6, order: 11, question_id: 20 },

		{ category_id: 1, order: 12, question_id: 21 },
		{ category_id: 2, order: 12, question_id: 21 },
		{ category_id: 3, order: 12, question_id: 21 },
		{ category_id: 4, order: 12, question_id: 21 },
		{ category_id: 5, order: 12, question_id: 21 },
		{ category_id: 6, order: 12, question_id: 21 },

		{ category_id: 1, order: 13, question_id: 22 },
		{ category_id: 2, order: 13, question_id: 22 },
		{ category_id: 3, order: 13, question_id: 22 },
		{ category_id: 4, order: 13, question_id: 22 },
		{ category_id: 5, order: 13, question_id: 22 },
		{ category_id: 6, order: 13, question_id: 22 },
	]);
}

export { seed };
