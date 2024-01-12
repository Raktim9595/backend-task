import { ThemeProvider, createTheme } from "@mui/material";
import React from "react";

declare module "@mui/material/styles" {
	interface BreakpointOverrides {
		xxl: true;
		xxxl: true;
	}
}

const preBreakPointsTheme = createTheme({
	breakpoints: {
		values: {
			xs: 480,
			sm: 600,
			md: 768,
			lg: 992,
			xl: 1382,
			xxl: 1536,
			xxxl: 1920,
		},
	},
});

const theme = createTheme({
	typography: {
		fontFamily: "Roboto",
		body1: {
			fontSize: "1rem",
			fontWeight: "normal",
			lineHeight: "140%",
			textTransform: "none",
			color: "#000",
			[preBreakPointsTheme.breakpoints.down("lg")]: {
				fontSize: "0.875rem",
			},
		},
		body2: {
			fontSize: "0.875rem",
			fontWeight: "400",
			lineHeight: "140%",
			textTransform: "none",
			color: "#000",
			[preBreakPointsTheme.breakpoints.down("lg")]: {
				fontSize: "0.75rem",
			},
		},
		h6: {
			fontSize: "1.25rem",
			fontWeight: "500",
			lineHeight: "140%",
			textTransform: "none",
			color: "#000",
			[preBreakPointsTheme.breakpoints.down("lg")]: {
				fontSize: "1.125rem",
			},
		},
		h4: {
			fontSize: "1.5rem",
			fontWeight: "500",
			lineHeight: "140%",
			textTransform: "none",
			color: "#000",
			[preBreakPointsTheme.breakpoints.down("lg")]: {
				fontSize: "1.375rem",
			},
		},
	},
	components: {
		MuiOutlinedInput: {
			styleOverrides: {
				sizeSmall: {
					height: "2rem",
				},
			},
		},
	},
	breakpoints: {
		values: {
			xs: 480,
			sm: 600,
			md: 768,
			lg: 992,
			xl: 1382,
			xxl: 1536,
			xxxl: 1920,
		},
	},
});

export default function Theme({ children }: Readonly<{ children: React.ReactNode }>) {
	return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
