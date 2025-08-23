import { HTTPCode, HTTPError } from "~/libs/modules/http/http.js";
import { type Service } from "~/libs/types/types.js";
import { FeedbackEntity } from "~/modules/feedbacks/feedback.entity.js";
import { type FeedbackRepository } from "~/modules/feedbacks/feedback.repository.js";

import { FeedbackGetAllOption } from "./libs/enums/enums.js";
import { sanitizeFeedbackInput } from "./libs/helpers/helpers.js";
import {
	type FeedbackCreateRequestDto,
	type FeedbackDeleteResponseDto,
	type FeedbackDto,
	type FeedbackUpdateRequestDto,
	type FeedbackUpdateResponseDto,
} from "./libs/types/types.js";

interface FeedbackServiceReturns {
	items: FeedbackDto[];
	total: number;
}

class FeedbackService implements Service {
	private feedbackRepository: FeedbackRepository;

	public constructor(feedbackRepository: FeedbackRepository) {
		this.feedbackRepository = feedbackRepository;
	}

	public async create(payload: FeedbackCreateRequestDto): Promise<FeedbackDto> {
		const sanitizedText = sanitizeFeedbackInput(payload.text);
		const item = await this.feedbackRepository.create(
			FeedbackEntity.initializeNew({
				text: sanitizedText,
				userId: payload.userId,
			}),
		);

		return item.toObjectWithRelations();
	}

	public delete(): ReturnType<Service["delete"]> {
		return Promise.resolve(false);
	}

	public async deleteById(
		id: number,
		userId: number,
	): Promise<FeedbackDeleteResponseDto> {
		await this.checkFeedbackAccess(id, userId);

		const isDeleted = await this.feedbackRepository.delete(id);

		return { isDeleted };
	}

	public find(): Promise<FeedbackDto | null> {
		return Promise.resolve(null);
	}

	public async findAll(
		options: { limit?: number; offset?: number } = {},
	): Promise<FeedbackServiceReturns> {
		const {
			limit = FeedbackGetAllOption.PAGE_SIZE,
			offset = FeedbackGetAllOption.DEFAULT_OFFSET,
		} = options;

		const { items, total } = await this.feedbackRepository.findAll({
			limit,
			offset,
		});

		return {
			items: items.map((item) => item.toObjectWithRelations()),
			total,
		};
	}

	public async findById(id: number): Promise<FeedbackDto | null> {
		const item = await this.feedbackRepository.findById(id);

		return item ? item.toObjectWithRelations() : null;
	}

	public async updateById(
		id: number,
		payload: FeedbackUpdateRequestDto,
		userId: number,
	): Promise<FeedbackUpdateResponseDto | null> {
		await this.checkFeedbackAccess(id, userId);

		const item = await this.feedbackRepository.update(
			id,
			payload as Partial<FeedbackEntity>,
		);

		return item.toObject();
	}

	private async checkFeedbackAccess(
		id: number,
		userId: number,
	): Promise<FeedbackEntity> {
		const feedback = await this.feedbackRepository.findById(id);

		if (!feedback) {
			throw new HTTPError({
				message: "Feedback not found.",
				status: HTTPCode.NOT_FOUND,
			});
		}

		if (feedback.toObject().userId !== userId) {
			throw new HTTPError({
				message: "You can only edit your own feedback.",
				status: HTTPCode.FORBIDDEN,
			});
		}

		return feedback;
	}
}

export { FeedbackService };
