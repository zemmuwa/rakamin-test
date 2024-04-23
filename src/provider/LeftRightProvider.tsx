"use client"
import { IMoveableProps, LeftRightContext } from "@/context/LeftRIghtContext";
import React, { PropsWithChildren } from "react";


const LeftRightProvider = ({
  children,
  left,
  right,
  group
}: PropsWithChildren & IMoveableProps) => {
  return (
    <LeftRightContext.Provider value={{ left, right,group }}>
      {children}
    </LeftRightContext.Provider>
  );
};

export default LeftRightProvider;
