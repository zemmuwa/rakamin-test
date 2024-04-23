import { z } from "zod";

export const TASK_ATTR_CONST = {
  NAME: "name",
  TODO_ID: "todo_id",
  PROGESS_PERCENTAGE: "progress_percentage",
} as const;

const taskSchema = z.object({
  [TASK_ATTR_CONST.NAME]: z.string().min(1, `Required`),
  [TASK_ATTR_CONST.TODO_ID]: z.number().min(1),
  [TASK_ATTR_CONST.PROGESS_PERCENTAGE]: z
    .string()
    .min(1, `Required`)
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) >= 0 && Number(val) <= 100,
      `Must be 0-100`
    ),
});
type TTaskSchema = z.infer<typeof taskSchema>;

export { taskSchema };
export type { TTaskSchema };
