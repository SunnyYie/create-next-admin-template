import { useCallback, useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useNavigate } from "react-router";
import PageError from "../../pages/errors/PageError";
import { useUserToken } from "../../store/user-setting";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
	const { accessToken } = useUserToken();
	const navigate = useNavigate();

	const check = useCallback(() => {
		if (!accessToken) {
			navigate("/login", { replace: true });
		}
	}, [navigate, accessToken]);

	useEffect(() => {
		check();
	}, [check]);

	return <ErrorBoundary FallbackComponent={PageError}>{children}</ErrorBoundary>;
}
