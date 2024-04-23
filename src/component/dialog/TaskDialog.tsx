"use client";
import useQueryParam from "@/hook/useQueryParam";
import { FONT_WEIGHT } from "@/utils/constant/fontWeight";
import { QUERY_KEY } from "@/utils/constant/queryKey";
import { Button, DialogActions, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import React from "react";
import NumberFormatField from "../field/NumberFormatField";

interface ServiceDialogProps {}

const TaskDialog = () => {
  const { getValue, replaceRoute } = useQueryParam();
  const splitedQueryValue = getValue(QUERY_KEY.TASK_DIALOG)?.split("+");
  const groupId = splitedQueryValue?.[0];
  const taskId = splitedQueryValue?.[1];
  const isOpen = Boolean(groupId);
  return (
    <Dialog
      PaperProps={{
        sx: {
          borderRadius: "10px",
        },
      }}
      maxWidth={"xs"}
      fullWidth
      open={isOpen}
    >
      <DialogTitle sx={{ px: 3 }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={2}
          p={2}
        >
          <Typography
            variant="textXl"
            color="text.tertiary"
            fontWeight={FONT_WEIGHT.BOLD}
          >
            {taskId ? "Edit Task" : "Create Task"}
          </Typography>
          <IconButton
            disableRipple
            edge="start"
            color="inherit"
            sx={{ color: "primary.main", fontSize: "24px", p: 0, m: 0 }}
            onClick={() => replaceRoute(QUERY_KEY.TASK_DIALOG, null)}
          >
            <Image
              src="/icons/close.svg"
              width="24"
              height="24"
              alt="close-icon"
            />
          </IconButton>
        </Stack>
      </DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          <Typography
            component="label"
            variant="textS"
            fontWeight={FONT_WEIGHT.BOLD}
          >
            Task Name
          </Typography>
          <TextField placeholder="Type your Task" />
          <Typography
            component="label"
            variant="textS"
            fontWeight={FONT_WEIGHT.BOLD}
          >
            Progress
          </Typography>
          <NumberFormatField suffix="%" placeholder="70%" />
        </Stack>
      </DialogContent>
      <DialogActions sx={{ p: 3 }}>
        <Stack spacing="10px" direction="row">
          <Button
            className="elevation-soft"
            sx={{ backgroundColor: "white", borderColor: "grey.200" }}
            disableElevation
            color="inherit"
            variant="outlined"
          >
            <Typography
              color="text.tertiary"
              variant="textM"
              fontWeight={FONT_WEIGHT.BOLD}
            >
              Cancel
            </Typography>
          </Button>
          <Button className="elevation-soft" disableElevation color="primary" variant="contained">
            <Typography
              color="white"
              variant="textM"
              fontWeight={FONT_WEIGHT.BOLD}
            >
              Save Task
            </Typography>
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};

export default TaskDialog;
