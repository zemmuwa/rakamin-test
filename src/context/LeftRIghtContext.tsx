"use client";
import { IGroup } from "@/types/api-interface/group.interface";
import { createContext } from "react";

export interface IMoveableProps {
  left?: number;
  right?: number;
  group?: IGroup;
  groupIndex?: number;
}

export const LeftRightContext = createContext<IMoveableProps>({
  left: undefined,
  right: undefined,
  group: undefined,
  groupIndex: undefined,
});
