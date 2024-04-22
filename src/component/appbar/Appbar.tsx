import { FONT_WEIGHT } from "@/utils/constant/fontWeight";
import { Button, Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Image from "next/image";
import React from "react";

const Appbar = () => {
  return (
    <AppBar position="sticky" sx={{ backgroundColor: "background.default" }} elevation={1}>
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
            sx={{ boxShadow: "0px 1px 2px 0px #0000001F" }}
            color="primary"
            variant="contained"
            startIcon={
              <Image
                src="/icons/plus.svg"
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
