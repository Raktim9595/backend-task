import { Typography } from "@mui/material";
import { ICellRendererParams } from "ag-grid-community";

interface Props extends ICellRendererParams {
  headerContent?: string;
}

export const CustomHeader = (props: Props) => {
  const { headerContent } = props;

  return (
    <Typography
      variant="body1"
      fontWeight={500}
    >
      {headerContent}
    </Typography>
  );
};
