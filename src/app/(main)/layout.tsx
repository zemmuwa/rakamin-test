import Appbar from "@/component/appbar/Appbar";
import { Stack } from "@mui/material";
import React, { PropsWithChildren } from "react";

function layout({ children }: PropsWithChildren) {
  return (
    <Stack>
      <Appbar />
      <Stack height="calc(100dvh - 64px)"  overflow="auto">{children}</Stack>
    </Stack>
  );
}

export default layout;
