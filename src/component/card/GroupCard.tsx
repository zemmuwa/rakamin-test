import { FONT_WEIGHT } from "@/utils/constant/fontWeight";
import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import Image from "next/image";
import { IGroup } from "@/types/api-interface/group.interface";
import Link from "next/link";
import { QUERY_KEY } from "@/utils/constant/queryKey";
import { getTasksByGroupId } from "@/action/task.action";
import TaskList from "../list/TaskList";
import { IMoveableProps } from "@/context/LeftRIghtContext";
import LeftRightProvider from "@/provider/LeftRightProvider";
import PlusCircleIcon from "../../../public/icons/plus-circle.svg";
import { TEST_CONST } from "@/utils/constant/testConst";

export interface GroupCardProps extends IMoveableProps {
  variant: "primary" | "warning" | "danger" | "success";
  data: IGroup;
  index:number
}

const GroupCard = async ({ variant, data, left, right,index }: GroupCardProps) => {
  const color = {
    main: `${variant}.main`,
    border: variant == "primary" ? `${variant}.main` : `${variant}.100`,
    bg: `${variant}.50`,
  };

  const tasks = await getTasksByGroupId(data.id);
  return (
    <Stack
      height="fit-content"
      spacing="8px"
      p="16px"
      borderRadius="4px"
      minWidth="326px"
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
          {data?.title}
        </Typography>
      </Box>
      <Typography variant="textS" fontWeight={FONT_WEIGHT.BOLD}>
        {data?.description}
      </Typography>
      <LeftRightProvider groupIndex={index} left={left} right={right} group={data}>
        <TaskList data={tasks} />
      </LeftRightProvider>
      <Stack
        data-test-id={`${TEST_CONST.BUTTON_CREATE}-${index}`}
        width="fit-content"
        component={Link}
        sx={{ textDecoration: "none" }}
        href={{
          query: {
            [QUERY_KEY.TASK_DIALOG]: data?.id,
          },
        }}
        direction="row"
        spacing="5px"
        alignItems="center"
      >
        <Image alt="plus-icon" width="20" height="20" src={PlusCircleIcon} />
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
