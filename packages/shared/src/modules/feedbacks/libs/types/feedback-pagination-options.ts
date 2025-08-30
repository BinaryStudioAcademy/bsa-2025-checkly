type FeedbackPaginationOptions = {
	limit?: number;
	offset?: number;
};

type IdParameter = {
	id: string;
};

type Pagination<T> = {
	items: T[];
	limit: number;
	page: number;
	total: number;
};

export { type FeedbackPaginationOptions, type IdParameter, type Pagination };
