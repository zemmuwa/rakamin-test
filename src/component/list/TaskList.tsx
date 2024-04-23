import { ITask } from "@/types/api-interface/task.interface";
import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import TaskCard from "../card/TaskCard";
import { FONT_WEIGHT } from "@/utils/constant/fontWeight";

interface TaskListProps {
  data: ITask[];
}

const TaskList = ({ data }: TaskListProps) => {
  return (
    <Stack spacing="12px">
      {data.length > 0 ? (
        data.map((item, itemI) => (
          <TaskCard
            key={itemI}
            data={item}
          />
        ))
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
