"use client";

import { type QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { ReactNode } from "react";
import { getQueryClient } from "../QueryClient";
export const Provider = ({ children }: { children: ReactNode }) => {
	const queryClient: QueryClient = getQueryClient();
	return (
		<QueryClientProvider client={queryClient}>
			{children}
			<ReactQueryDevtools />
		</QueryClientProvider>
	);
};
