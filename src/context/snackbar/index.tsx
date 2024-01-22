import React, { createContext } from "react";
import { SnackbarContextType } from "./snackbarContext.types";
import { useSnackbarContext } from "./useSnackbarContext";

export const SnackbarContext = createContext<SnackbarContextType | null>(null);

const SnackbarProvider = ({ children }: { children: React.ReactNode }) => {
	const snackbarProps = useSnackbarContext();

	return <SnackbarContext.Provider value={snackbarProps}>{children}</SnackbarContext.Provider>;
};

export default SnackbarProvider;
