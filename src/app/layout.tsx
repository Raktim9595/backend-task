"use client";

import Theme from "@/theme/Theme";
import "./globals.css";
import QueryClientSetup from "@/queryClient/QueryClient";
import NavigationBar from "@/components/organisms/navbar";
import { Box } from "@mui/material";

// ag grid import done here because I want it to be global and loaded early
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import SnackbarProvider from "@/context/snackbar";
import CustomSnackbar from "@/components/molecules/snackbar";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<Box component={"body"}>
				<Theme>
					<QueryClientSetup>
						<SnackbarProvider>
							<NavigationBar />
							<Box component={"section"} sx={{ overflowY: "auto", height: "calc(100vh - 3.5rem)" }}>
								{children}
								<CustomSnackbar />
							</Box>
						</SnackbarProvider>
					</QueryClientSetup>
				</Theme>
			</Box>
		</html>
	);
}
