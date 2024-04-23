"use client"
import { IMoveableProps, LeftRightContext } from "@/context/LeftRIghtContext";
import React, { PropsWithChildren } from "react";


const LeftRightProvider = ({
  children,
  left,
  right,
  group,
  groupIndex
}: PropsWithChildren & IMoveableProps) => {
  return (
    <LeftRightContext.Provider value={{ left, right,group,groupIndex }}>
      {children}
    </LeftRightContext.Provider>
  );
};

export default LeftRightProvider;
