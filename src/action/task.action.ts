"use server";

import { TTaskSchema } from "@/schema/task.schema";
import { ITask } from "@/types/api-interface/task.interface";
import { ENDPOINT } from "@/utils/constant/endpoint";
import { revalidatePath } from "next/cache";

const url = process.env.API_URL;
const token = process.env.API_KEY;

export const createTask = async (input: TTaskSchema) => {
  try {
    const data = await fetch(`${url}/${ENDPOINT.ITEMS(input?.todo_id)}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type":'application/json',
        "Accept":'*/*'
      },
      body: JSON.stringify({
        name: input?.name,
        progress_percentage: Number(input?.progress_percentage),
      }),
    });
    const response = await data.json();
    revalidatePath("/", "page");
    return response;
  } catch (error) {
    return false;
  }
};

export const getTaskById = async (
  id: number | string
): Promise<ITask | null> => {
  try {
    const data = await fetch(`${url}/${ENDPOINT.ITEMS}/${id}`, {
      method: "GET",
      cache: "no-cache",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const response = await data.json();
    return response;
  } catch (error) {
    return null;
  }
};
