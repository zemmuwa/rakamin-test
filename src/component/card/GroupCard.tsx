import { FONT_WEIGHT } from "@/utils/constant/fontWeight";
import { Box, ButtonBase, Container, Stack, Typography } from "@mui/material";
import React from "react";
import TaskCard from "./TaskCard";
import Image from "next/image";

interface GroupCardProps {
  variant: "primary" | "secondary" | "warning" | "danger";
}

const GroupCard = ({ variant }: GroupCardProps) => {
  const color = {
    main: `${variant}.main`,
    border: variant == "primary" ? `${variant}.main` : `${variant}.100`,
    bg: `${variant}.50`,
  };
  return (
    <Stack
      spacing="8px"
      p="16px"
      borderRadius="4px"
      width="326px"
      border="1px solid"
      borderColor={color.border}
      sx={{ backgroundColor: color.bg }}
    >
      <Box
        alignSelf="start"
        px={1}
        border="1px solid"
        py="2px"
        borderRadius="4px"
        borderColor={color.border}
      >
        <Typography
          variant="textS"
          color={color.main}
          fontWeight={FONT_WEIGHT.REGULAR}
        >
          Group Task 1
        </Typography>
      </Box>
      <Typography variant="textS" fontWeight={FONT_WEIGHT.BOLD}>
        January - March
      </Typography>
      <Stack spacing="12px">
        <TaskCard
          progress={30}
          title="Re-designed the zero-g doggie bags. No more spills!"
        />
      </Stack>
      <Stack
        width="fit-content"
        component={ButtonBase}
        direction="row"
        spacing="5px"
        alignItems="center"
      >
        <Image
          alt="plus-icon"
          width="20"
          height="20"
          src="/icons/plus-circle.svg"
        />
        <Typography
          variant="textS"
          fontWeight={FONT_WEIGHT.REGULAR}
          color="text.tertiary"
        >
          New Task
        </Typography>
      </Stack>
    </Stack>
  );
};

export default GroupCard;
