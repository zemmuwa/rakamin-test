"use client";
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
  TextField,
  Typography,
} from "@mui/material";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import NumberFormatField from "../field/NumberFormatField";
import { Controller, useForm } from "react-hook-form";
import { TASK_ATTR_CONST, TTaskSchema, taskSchema } from "@/schema/task.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorLabel } from "../label/ErrorLabel";
import { ITask } from "@/types/api-interface/task.interface";
import { createTask, editTask, getTaskById } from "@/action/task.action";
import CloseIcon from "../../../public/icons/close.svg"

const TaskDialog = () => {
  const [loading, setLoading] = useState(false);
  const { getValue, replaceRoute } = useQueryParam();
  const splitedQueryValue = getValue(QUERY_KEY.TASK_DIALOG)?.split("+");
  const groupId = splitedQueryValue?.[0];
  const taskId = splitedQueryValue?.[1];
  const isOpen = Boolean(groupId);
  const closeDialog = () => replaceRoute(QUERY_KEY.TASK_DIALOG, null);

  const [data, setData] = useState<null | ITask>(null);

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    control,
    resetField,
  } = useForm<TTaskSchema>({ resolver: zodResolver(taskSchema) });

  const fillForm = () => {
    resetField(TASK_ATTR_CONST.NAME)
    resetField(TASK_ATTR_CONST.PROGESS_PERCENTAGE)
    setValue(TASK_ATTR_CONST.NAME, data?.name ?? "");
    setValue(TASK_ATTR_CONST.PROGESS_PERCENTAGE, data?.progress_percentage.toString() ?? "");
  };

  const getData = async () => {
    const res = await getTaskById(taskId!, groupId!);
    if (res) {
      setData(res);
    }
  };
  const handleSave = async (values: TTaskSchema) => {
    setLoading(true);
    let res = null;
    try {
      if (data?.id) {
        res = await editTask(values, data?.id);
      } else {
        res = await createTask(values);
      }

      if (res !== null) {
        closeDialog();
      }
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (taskId) {
      getData();
    }
  }, [taskId]);

  useEffect(() => {
    if (groupId) {
      setValue("todo_id", Number(groupId));
    }
  }, [groupId]);

  useEffect(() => {
    fillForm();
  }, [data?.id, isOpen]);

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
      <DialogTitle sx={{ p: 3 }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={2}
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
            onClick={closeDialog}
          >
            <Image
              src={CloseIcon}
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
          <TextField
            {...register(TASK_ATTR_CONST.NAME)}
            helperText={<ErrorLabel>{errors?.name?.message}</ErrorLabel>}
            error={!!errors?.name?.message}
            placeholder="Type your Task"
          />
          <Typography
            component="label"
            variant="textS"
            fontWeight={FONT_WEIGHT.BOLD}
          >
            Progress
          </Typography>
          <Controller
            control={control}
            name={TASK_ATTR_CONST.PROGESS_PERCENTAGE}
            render={({ field: { onChange, value } }) => (
              <NumberFormatField
                error={errors.progress_percentage?.message}
                value={value}
                onChange={onChange}
                suffix="%"
                placeholder="70%"
              />
            )}
          />
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
            onClick={handleSubmit(handleSave, (err) => console.log(err))}
            className="elevation-soft"
            disableElevation
            color="primary"
            variant="contained"
            disabled={loading}
          >
            {!loading ? (
              <Typography
                color="white"
                variant="textM"
                fontWeight={FONT_WEIGHT.BOLD}
              >
                Save Task
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

export default TaskDialog;
