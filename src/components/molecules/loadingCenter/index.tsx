import { Box, CircularProgress } from "@mui/material";
import React from "react";

const CustomLoading = () => {
  return (
    <Box
      height={"100%"}
      width={"100%"}
      sx={{
        display: "grid",
        placeItems: "center",
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default CustomLoading;
