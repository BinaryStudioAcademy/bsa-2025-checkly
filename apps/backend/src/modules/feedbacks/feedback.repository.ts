import { type Repository } from "~/libs/types/types.js";
import { FeedbackEntity } from "~/modules/feedbacks/feedback.entity.js";
import { type FeedbackModel } from "~/modules/feedbacks/feedback.model.js";

type FeedbackRepositoryReturn = Promise<FeedbackEntity | null>;

interface FeedbackRepositoryReturns {
	items: FeedbackEntity[];
	total: number;
}
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

	public findAll(): Promise<FeedbackEntity[]>;
	public findAll(options: {
		limit: number;
		offset: number;
	}): Promise<FeedbackRepositoryReturns>;
	public async findAll(options?: {
		limit: number;
		offset: number;
	}): Promise<FeedbackEntity[] | FeedbackRepositoryReturns> {
		if (options) {
			const { limit, offset } = options;

			const feedbacks = await this.feedbackModel
				.query()
				.withGraphFetched("user(shortInfo)")
				.modifiers({
					shortInfo(builder) {
						builder.select("id", "name");
					},
				})
				.orderBy("createdAt", "desc")
				.limit(limit)
				.offset(offset)
				.execute();

			const total = await this.feedbackModel.query().resultSize();

			return {
				items: feedbacks.map((feedback) => FeedbackEntity.initialize(feedback)),
				total,
			};
		}

		const allFeedbacks = await this.feedbackModel.query().execute();

		return allFeedbacks.map((feedback) => FeedbackEntity.initialize(feedback));
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
