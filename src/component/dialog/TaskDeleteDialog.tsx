"use client";
import { deleteTask } from "@/action/task.action";
import useQueryParam from "@/hook/useQueryParam";
import { FONT_WEIGHT } from "@/utils/constant/fontWeight";
import { QUERY_KEY } from "@/utils/constant/queryKey";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";

import Image from "next/image";
import { env } from "process";
import React, { useState } from "react";

const TaskDeleteDialog = () => {
  const [loading, setLoading] = useState(false);
  const { getValue, replaceRoute } = useQueryParam();
  const splitedQueryValue = getValue(QUERY_KEY.TASK_DELETE_DIALOG)?.split("+");
  const groupId = splitedQueryValue?.[0];
  const taskId = splitedQueryValue?.[1];
  const isOpen = Boolean(groupId);
  const closeDialog = () => replaceRoute(QUERY_KEY.TASK_DELETE_DIALOG, null);

  const handleDelete = async () => {
    setLoading(true);
    let res = null;
    try {
      res = await deleteTask(groupId!, taskId!);
      if (res !== null) {
        closeDialog();
      }
    } finally {
      setLoading(false);
    }
  };

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
      <DialogTitle sx={{ px: 3, pt: 3, pb: 2 }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={2}
        >
          <Stack direction="row" alignItems="center" spacing="8px">
            <Image
              width={24}
              height={24}
              alt="exclamation-icon"
              src={`${env.NEXT_PUBLIC_BASE_PATH ?? ""}/icons/exclamation.svg`}
            />
            <Typography
              variant="textXl"
              color="text.tertiary"
              fontWeight={FONT_WEIGHT.BOLD}
            >
              Delete Task
            </Typography>
          </Stack>
          <IconButton
            disableRipple
            edge="start"
            color="inherit"
            sx={{ color: "primary.main", fontSize: "24px", p: 0, m: 0 }}
            onClick={closeDialog}
          >
            <Image
              src={`${env.NEXT_PUBLIC_BASE_PATH ?? ""}/icons/close.svg`}
              width="24"
              height="24"
              alt="close-icon"
            />
          </IconButton>
        </Stack>
      </DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          <Typography fontWeight={FONT_WEIGHT.REGULAR} variant="textM">
            Are you sure want to delete this task? your action can’t be
            reverted.
          </Typography>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ p: 3 }}>
        <Stack spacing="10px" direction="row">
          <Button
            onClick={closeDialog}
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
          <Button
            onClick={handleDelete}
            className="elevation-soft"
            disableElevation
            color="error"
            variant="contained"
            disabled={loading}
          >
            {!loading ? (
              <Typography
                color="white"
                variant="textM"
                fontWeight={FONT_WEIGHT.BOLD}
              >
                Delete
              </Typography>
            ) : (
              <CircularProgress size="14px" color="inherit" />
            )}
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};

export default TaskDeleteDialog;
