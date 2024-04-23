import { FONT_WEIGHT } from "@/utils/constant/fontWeight";
import { Button, Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Image from "next/image";
import { env } from "process";
import React from "react";

const Appbar = () => {
  return (
    <AppBar
      position="sticky"
      sx={{ backgroundColor: "background.default" }}
      elevation={1}
    >
      <Container sx={{ position: "relative" }}>
        <Stack
          direction="row"
          justifyContent="start"
          alignItems="center"
          minHeight="64px"
          spacing="10px"
        >
          <Typography
            variant="textXl"
            fontWeight={FONT_WEIGHT.BOLD}
            color="text.secondary"
          >
            Product Roadmap
          </Typography>
          <Button
            disableElevation
            className="elevation-soft"
            color="primary"
            variant="contained"
            startIcon={
              <Image
                src={`${env.NEXT_PUBLIC_BASE_PATH ?? ""}/icons/plus.svg`}
                alt="icon-plus"
                width="12"
                height="12"
              />
            }
          >
            <Typography
              variant="textS"
              fontWeight={FONT_WEIGHT.BOLD}
              color="white"
            >
              Add New Group
            </Typography>
          </Button>
        </Stack>
      </Container>
    </AppBar>
  );
};

export default Appbar;
