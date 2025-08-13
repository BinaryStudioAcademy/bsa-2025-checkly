import { HTTPCode, HTTPError } from "~/libs/modules/http/http.js";
import { type Service } from "~/libs/types/types.js";
import { FeedbackEntity } from "~/modules/feedbacks/feedback.entity.js";
import { type FeedbackRepository } from "~/modules/feedbacks/feedback.repository.js";

import {
	type FeedbackCreateRequestDto,
	type FeedbackDeleteResponseDto,
	type FeedbackGetAllResponseDto,
	type FeedbackUpdateRequestDto,
	type FeedbackUpdateResponseDto,
} from "./libs/types/types.js";

type FeedbackServiceReturns = Promise<{
	items: FeedbackGetAllResponseDto[];
}>;

class FeedbackService implements Service {
	private feedbackRepository: FeedbackRepository;

	public constructor(feedbackRepository: FeedbackRepository) {
		this.feedbackRepository = feedbackRepository;
	}

	public async create(
		payload: FeedbackCreateRequestDto,
	): Promise<FeedbackGetAllResponseDto> {
		const item = await this.feedbackRepository.create(
			FeedbackEntity.initializeNew({
				text: payload.text,
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
		const feedback = await this.feedbackRepository.findById(id);

		if (!feedback) {
			throw new HTTPError({
				message: "Feedback not found.",
				status: HTTPCode.NOT_FOUND,
			});
		}

		if (feedback.toObject().userId !== userId) {
			throw new HTTPError({
				message: "You can only delete your own feedback.",
				status: HTTPCode.FORBIDDEN,
			});
		}

		const isDeleted = await this.feedbackRepository.delete(id);

		return { isDeleted };
	}

	public find(): Promise<FeedbackGetAllResponseDto | null> {
		return Promise.resolve(null);
	}

	public async findAll(): FeedbackServiceReturns {
		const items = await this.feedbackRepository.findAll();

		return {
			items: items.map((item) => item.toObjectWithRelations()),
		};
	}

	public async findById(id: number): Promise<FeedbackGetAllResponseDto | null> {
		const item = await this.feedbackRepository.findById(id);

		return item ? item.toObjectWithRelations() : null;
	}

	public update(): ReturnType<Service["update"]> {
		return Promise.resolve(null);
	}

	public async updateById(
		id: number,
		payload: FeedbackUpdateRequestDto,
		userId: number,
	): Promise<FeedbackUpdateResponseDto | null> {
		const feedback = await this.feedbackRepository.findById(id);

		if (!feedback) {
			throw new HTTPError({
				message: "Feedback not found.",
				status: HTTPCode.NOT_FOUND,
			});
		}

		if (feedback.toObject().userId !== userId) {
			throw new HTTPError({
				message: "You can only update your own feedback.",
				status: HTTPCode.FORBIDDEN,
			});
		}

		const entity = FeedbackEntity.initialize({
			createdAt: "",
			...payload,
			id,
			updatedAt: "",
			user: null,
		});

		const item = await this.feedbackRepository.update(id, entity);

		return item ? item.toObject() : null;
	}
}

export { FeedbackService };
