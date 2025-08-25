import { useCallback, useState } from "react";

type LoadingIdsResult = {
	add: (id: number) => void;
	ids: number[];
	isLoading: (id: number) => boolean;
	remove: (id: number) => void;
};

const useLoadingIds = (): LoadingIdsResult => {
	const [ids, setIds] = useState<number[]>([]);

	const add = useCallback((id: number) => {
		setIds((previous) => [...previous, id]);
	}, []);

	const remove = useCallback((id: number) => {
		setIds((previous) => previous.filter((item) => item !== id));
	}, []);

	const isLoading = (id: number): boolean => ids.includes(id);

	return { add, ids, isLoading, remove };
};

export { useLoadingIds };
