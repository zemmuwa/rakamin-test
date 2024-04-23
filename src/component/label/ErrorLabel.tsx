import { FONT_WEIGHT } from "@/utils/constant/fontWeight";
import Typography from "@mui/material/Typography";
import React, { type PropsWithChildren } from "react";

export const ErrorLabel = ({ children }: PropsWithChildren) => {
  if (children) {
    return (
      <Typography
        variant="textS"
        color="error.main"
        fontWeight={FONT_WEIGHT.REGULAR}
      >
        {children}
      </Typography>
    );
  }
};
