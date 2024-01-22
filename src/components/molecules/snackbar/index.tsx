import React from "react";
import { Alert, Snackbar } from "@mui/material";
import { SnackbarContext } from "@/context/snackbar";
import { SnackbarContextType } from "@/context/snackbar/snackbarContext.types";

const CustomSnackbar = () => {
	const { snackbarState, closeSnackBar } = React.useContext(SnackbarContext) as SnackbarContextType;

	return (
		<Snackbar
			anchorOrigin={{ vertical: "top", horizontal: "center" }}
			open={snackbarState.open}
			onClose={closeSnackBar}
			ClickAwayListenerProps={{ onClickAway: () => {}, disableReactTree: true }}
		>
			<Alert
				onClose={closeSnackBar}
				severity={snackbarState.variant}
				sx={{ width: "100%", display: "flex", alignItems: "center" }}
			>
				{snackbarState.message}
			</Alert>
		</Snackbar>
	);
};

export default CustomSnackbar;
