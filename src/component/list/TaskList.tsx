"use client";
import { ITask } from "@/types/api-interface/task.interface";
import { Box, Stack, Typography } from "@mui/material";
import React, { useContext } from "react";
import TaskCard, { DragItem } from "../card/TaskCard";
import { FONT_WEIGHT } from "@/utils/constant/fontWeight";
import { useDrop } from "react-dnd";
import { moveTask } from "@/action/task.action";
import { LeftRightContext } from "@/context/LeftRIghtContext";

interface TaskListProps {
  data: ITask[];
}

export const ItemTypes = {
  TASK_ITEM: "task-item",
};

const TaskList = ({ data }: TaskListProps) => {
  const { group } = useContext(LeftRightContext);
  const [, drop] = useDrop(() => ({
    accept: ItemTypes.TASK_ITEM,
    drop({ id, originalIndex }: DragItem) {
      moveTask(originalIndex, id, group?.id!);
    },
  }));

  return (
    <Stack component={"div"} spacing="12px" ref={drop as any}>
      {data.length > 0 ? (
        data.map((item, itemI) => <TaskCard key={itemI} data={item} />)
      ) : (
        <Box
          sx={{ backgroundColor: "grey.50" }}
          borderRadius="4px"
          border="1px solid"
          borderColor="grey.200"
          py={1}
          px={2}
        >
          <Typography
            color="grey.500"
            variant="textM"
            fontWeight={FONT_WEIGHT.REGULAR}
          >
            No Task
          </Typography>
        </Box>
      )}
    </Stack>
  );
};

export default TaskList;
