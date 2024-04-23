"use client";
import { FONT_WEIGHT } from "@/utils/constant/fontWeight";
import { Box, Divider, Stack, Typography } from "@mui/material";
import { Inter } from "next/font/google";
import Image from "next/image";
import React, { useContext } from "react";
import DropdownButton from "../button/DropdownButton";
const inter = Inter({ subsets: ["latin"] });

import Icon from "../../../public/icons/more.svg";
import ArrowRightIcon from "../icon/ArrowRightIcon";
import ArrowLeftIcon from "../icon/ArrowLeftIcon";
import CreateIcon from "../icon/CreateIcon";
import DeleteIcon from "../icon/DeleteIcon";
import { ITask } from "@/types/api-interface/task.interface";
import useQueryParam from "@/hook/useQueryParam";
import { QUERY_KEY } from "@/utils/constant/queryKey";
import { LeftRightContext } from "@/context/LeftRIghtContext";
import { editTask } from "@/action/task.action";

interface TaskCardProps {
  data: ITask;
}

const TaskCard = ({ data }: TaskCardProps) => {
  const { left, right } = useContext(LeftRightContext);
  const isComplete = data?.progress_percentage == 100;
  const { pushRoute } = useQueryParam();

  const moveTask = async (target: number) => {
    const res = await editTask(
      {
        name: data?.name,
        progress_percentage: data?.progress_percentage.toString(),
        todo_id: data?.todo_id,
      },
      data?.id,
      target
    );
  };
  return (
    <Stack
      sx={{ backgroundColor: "grey.50" }}
      borderRadius={"4px"}
      border="1px solid"
      borderColor="grey.200"
      p={2}
      spacing={1}
    >
      <Typography variant="textM" fontWeight={FONT_WEIGHT.BOLD}>
        {data?.name}
      </Typography>
      <Divider sx={{ borderStyle: "dashed" }} />
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack direction="row">
          <Box
            overflow="hidden"
            mr="12px"
            width="188px"
            borderRadius="9.999px"
            height="16px"
            bgcolor="grey.100"
            position="relative"
          >
            <Box
              bgcolor={isComplete ? "success.main" : "primary.main"}
              position="absolute"
              left={0}
              height="inherit"
              width={`${data?.progress_percentage}%`}
            />
          </Box>
          {isComplete ? (
            <Image
              src="/icons/checklist.svg"
              alt="checklist-icon"
              width="16"
              height="16"
            />
          ) : (
            <Typography
              className={inter.className}
              variant="textS"
              lineHeight="16px"
            >
              {data?.progress_percentage}%
            </Typography>
          )}
        </Stack>
        <DropdownButton
          sx={{
            minWidth: 0,
            p: "0 !important",
            py: 1,
            "& .MuiButtonBase-root": {
              p: "0 !important",
            },
          }}
          variant="text"
          size="small"
          menuWidth={"auto"}
          color="inherit"
          menu={[
            ...(Boolean(right)
              ? [
                  {
                    content: (
                      <Stack
                      width="100%"
                        className="primary-hover"
                        sx={{
                          "&:hover": {
                            "& svg": {
                              color: (thm) => thm.palette.primary.main,
                            },
                            "& .MuiTypography-root": {
                              color: (thm) => thm.palette.primary.main,
                            },
                          },
                        }}
                        px={2}
                        py="6px"
                        spacing={2}
                        direction="row"
                        alignItems="center"
                      >
                        <ArrowRightIcon sx={{ color: "grey.900" }} />
                        <Typography
                          variant="textM"
                          fontWeight={FONT_WEIGHT.SEMI_BOLD}
                          color="grey.900"
                        >
                          Move Right
                        </Typography>
                      </Stack>
                    ),
                    onClick: () => moveTask(right!),
                  },
                ]
              : []),
            ...(Boolean(left)
              ? [
                  {
                    content: (
                      <Stack
                      width="100%"
                        sx={{
                          "&:hover": {
                            "& svg": {
                              color: (thm) => thm.palette.primary.main,
                            },
                            "& .MuiTypography-root": {
                              color: (thm) => thm.palette.primary.main,
                            },
                          },
                        }}
                        px={2}
                        py="6px"
                        spacing={2}
                        direction="row"
                        alignItems="center"
                      >
                        <ArrowLeftIcon sx={{ color: "grey.900" }} />
                        <Typography
                          variant="textM"
                          fontWeight={FONT_WEIGHT.SEMI_BOLD}
                          color="grey.900"
                        >
                          Move Left
                        </Typography>
                      </Stack>
                    ),
                    onClick: () => moveTask(left!),
                  },
                ]
              : []),
            {
              content: (
                <Stack
                width="100%"
                  sx={{
                    "&:hover": {
                      "& svg": {
                        color: (thm) => thm.palette.primary.main,
                      },
                      "& .MuiTypography-root": {
                        color: (thm) => thm.palette.primary.main,
                      },
                    },
                  }}
                  px={2}
                  py="6px"
                  spacing={2}
                  direction="row"
                  alignItems="center"
                >
                  <CreateIcon sx={{ color: "grey.900" }} />
                  <Typography
                    variant="textM"
                    fontWeight={FONT_WEIGHT.SEMI_BOLD}
                    color="grey.900"
                  >
                    Edit
                  </Typography>
                </Stack>
              ),
              onClick: () => {
                pushRoute(
                  QUERY_KEY.TASK_DIALOG,
                  `${data?.todo_id}+${data?.id}`
                );
              },
            },
            {
              content: (
                <Stack
                width="100%"
                  sx={{
                    "&:hover": {
                      "& svg": {
                        color: (thm) => thm.palette.error.main,
                      },
                      "& .MuiTypography-root": {
                        color: (thm) => thm.palette.error.main,
                      },
                    },
                  }}
                  px={2}
                  py="6px"
                  spacing={2}
                  direction="row"
                  alignItems="center"
                >
                  <DeleteIcon sx={{ color: "grey.900" }} />
                  <Typography
                    variant="textM"
                    fontWeight={FONT_WEIGHT.SEMI_BOLD}
                    color="grey.900"
                  >
                    Delete
                  </Typography>
                </Stack>
              ),
              onClick: () => {
                pushRoute(
                  QUERY_KEY.TASK_DELETE_DIALOG,
                  `${data?.todo_id}+${data?.id}`
                );
              },
            },
          ]}
        >
          <Image alt="more-icon" width="24" height="24" src="/icons/more.svg" />
        </DropdownButton>
      </Stack>
    </Stack>
  );
};

export default TaskCard;
