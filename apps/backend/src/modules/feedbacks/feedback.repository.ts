import { type Repository } from "~/libs/types/types.js";
import { FeedbackEntity } from "~/modules/feedbacks/feedback.entity.js";
import { type FeedbackModel } from "~/modules/feedbacks/feedback.model.js";

type FeedbackRepositoryReturn = Promise<FeedbackEntity | null>;
type FeedbackRepositoryReturns = Promise<FeedbackEntity[]>;

const DELETED_COUNT_THRESHOLD = 0;

class FeedbackRepository implements Repository<FeedbackEntity> {
	private feedbackModel: typeof FeedbackModel;

	public constructor(feedbackModel: typeof FeedbackModel) {
		this.feedbackModel = feedbackModel;
	}

	public async create(entity: FeedbackEntity): Promise<FeedbackEntity> {
		const { text, userId } = entity.toNewObject();

		const feedback = await this.feedbackModel
			.query()
			.insert({
				text,
				userId,
			})
			.onConflict("userId")
			.merge()
			.returning("*")
			.execute();

		return FeedbackEntity.initialize(feedback);
	}

	public async delete(id: number): Promise<boolean> {
		const deletedCount = await this.feedbackModel
			.query()
			.deleteById(id)
			.execute();

		return deletedCount > DELETED_COUNT_THRESHOLD;
	}

	public find(): FeedbackRepositoryReturn {
		return Promise.resolve(null);
	}

	public async findAll(): FeedbackRepositoryReturns {
		const feedbacks = await this.feedbackModel
			.query()
			.withGraphFetched("user(shortInfo)")
			.modifiers({
				shortInfo(builder) {
					builder.select("id", "name");
				},
			})
			.execute();

		return feedbacks.map((feedback) => FeedbackEntity.initialize(feedback));
	}

	public async findById(id: number): FeedbackRepositoryReturn {
		const feedback = await this.feedbackModel
			.query()
			.findById(id)
			.withGraphFetched("user")
			.execute();

		return feedback ? FeedbackEntity.initialize(feedback) : null;
	}

	public async update(
		id: number,
		payload: Partial<FeedbackEntity>,
	): Promise<FeedbackEntity> {
		const updatedFeedback = await this.feedbackModel
			.query()
			.patchAndFetchById(id, payload as Partial<FeedbackModel>);

		return FeedbackEntity.initialize(updatedFeedback);
	}
}

export { FeedbackRepository };
