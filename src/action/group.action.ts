"use server";

import { IGroup } from "@/types/api-interface/group.interface";
import { ENDPOINT } from "@/utils/constant/endpoint";

const url = process.env.API_URL;
const token = process.env.API_KEY;

export const getGroups = async (): Promise<IGroup[]> => {
  try {
    const data = await fetch(`${url}/${ENDPOINT.TODO}`, {
      method: "GET",
      cache: "no-cache",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const response = await data.json();
    return response;
  } catch (error) {
    return [];
  }
};
