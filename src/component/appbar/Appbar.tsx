import { FONT_WEIGHT } from "@/utils/constant/fontWeight";
import { AppBar, Button, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import PlusIcon from "../../../public/icons/plus.svg"


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
                src={PlusIcon}
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
