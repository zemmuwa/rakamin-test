"use client"
import { IMoveableProps, LeftRightContext } from "@/context/LeftRIghtContext";
import React, { PropsWithChildren } from "react";


const LeftRightProvider = ({
  children,
  left,
  right,
}: PropsWithChildren & IMoveableProps) => {
  return (
    <LeftRightContext.Provider value={{ left, right }}>
      {children}
    </LeftRightContext.Provider>
  );
};

export default LeftRightProvider;
