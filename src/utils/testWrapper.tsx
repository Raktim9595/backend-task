import SnackbarProvider from "@/context/snackbar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

export const createTestWrapper = () => {
	// ✅ creates a new QueryClient for each test
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				retry: false,
			},
		},
	});
	return ({ children }: { children: ReactNode }) => (
		<QueryClientProvider client={queryClient}>
			<SnackbarProvider>{children}</SnackbarProvider>
		</QueryClientProvider>
	);
};
