"use client";
import { FONT_WEIGHT } from "@/utils/constant/fontWeight";
import { Box, Divider, Stack, Typography } from "@mui/material";
import { Inter } from "next/font/google";
import Image from "next/image";
import React, { useContext } from "react";
import DropdownButton from "../button/DropdownButton";
import ArrowRightIcon from "../icon/ArrowRightIcon";
import ArrowLeftIcon from "../icon/ArrowLeftIcon";
import CreateIcon from "../icon/CreateIcon";
import DeleteIcon from "../icon/DeleteIcon";
import { ITask } from "@/types/api-interface/task.interface";
import useQueryParam from "@/hook/useQueryParam";
import { QUERY_KEY } from "@/utils/constant/queryKey";
import { LeftRightContext } from "@/context/LeftRIghtContext";
import { editTask } from "@/action/task.action";
import { useDrag, useDrop } from "react-dnd";
import { ItemTypes } from "../list/TaskList";
import { env } from "process";
import MoreIcon from "../../../public/icons/more.svg";
import ChecklistIcon from "../../../public/icons/checklist.svg";
import { TEST_CONST } from "@/utils/constant/testConst";

const inter = Inter({ subsets: ["latin"] });

export interface DragItem {
  id: number;
  originalIndex: number;
}

interface TaskCardProps {
  data: ITask;
  index: number;
}

const TaskCard = ({ data, index }: TaskCardProps) => {
  const { left, right, groupIndex } = useContext(LeftRightContext);
  const isComplete = data?.progress_percentage == 100;
  const { pushRoute } = useQueryParam();
  const [{}, drag] = useDrag(
    () => ({
      type: ItemTypes.TASK_ITEM,
      item: { id: data?.id, originalIndex: data?.todo_id },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      end: (item, monitor) => {
        const { id: droppedId, originalIndex } = item;
        const didDrop = monitor.didDrop();
        if (!didDrop) {
        }
      },
    }),
    [data?.id, data?.todo_id]
  );

  const [, drop] = useDrop(
    () => ({
      accept: ItemTypes.TASK_ITEM,
      hover({ originalIndex }: DragItem) {},
    }),
    [data?.id]
  );

  const moveTask = async (target: number) => {
    await editTask(
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
      component={"div"}
      sx={{ backgroundColor: "grey.50", cursor: "grab" }}
      borderRadius={"4px"}
      border="1px solid"
      borderColor="grey.200"
      p={2}
      spacing={1}
      ref={(node) => drag(drop(node)) as any}
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
              src={ChecklistIcon}
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
          testId={`${TEST_CONST.ACTION_MENU}-${groupIndex}-${index}`}
          menuTestId={`${TEST_CONST.ACTION_MENU_DIALOG}-${groupIndex}-${index}`}
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
              testId: `${TEST_CONST.BUTTON_EDIT}-${groupIndex}-${index}`,
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
              testId: `${TEST_CONST.BUTTON_DELETE}-${groupIndex}-${index}`,
              onClick: () => {
                pushRoute(
                  QUERY_KEY.TASK_DELETE_DIALOG,
                  `${data?.todo_id}+${data?.id}`
                );
              },
            },
          ]}
        >
          <Image
            suppressHydrationWarning
            alt="more-icon"
            width="24"
            height="24"
            src={MoreIcon}
          />
        </DropdownButton>
      </Stack>
    </Stack>
  );
};

export default TaskCard;
