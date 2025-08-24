import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { type VerifyTokenRequestDto } from "~/libs/types/types.js";
import { actions as authActions } from "~/modules/auth/auth.js";

import { useAppDispatch, useAppSelector } from "../hooks.js";

const useVerifyToken = ({ token, userId }: VerifyTokenRequestDto): void => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const { isPreparing } = useAppSelector(({ auth }) => auth);

	const initializeVerification = useCallback((): void => {
		if (!isPreparing) {
			return;
		}

		void dispatch(authActions.verifyToken({ navigate, token, userId }));
	}, [dispatch, isPreparing]);

	useEffect(() => {
		initializeVerification();
	}, [initializeVerification]);
};

export { useVerifyToken };
