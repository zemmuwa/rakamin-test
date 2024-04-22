"use client";

import React, { type PropsWithChildren } from "react";
import { DndProvider as Provider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export const DndProvider = ({ children }: PropsWithChildren) => {
  return <Provider backend={HTML5Backend}>{children}</Provider>;
};
