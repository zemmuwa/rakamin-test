import { z } from "zod";
const taskSchema = z.object({
  name: z.string().min(1, `Required`),
  todo_id:z.number().min(1),
  progress_percentage: z
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
