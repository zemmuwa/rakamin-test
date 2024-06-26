"use client";

import { Button, ButtonProps, Menu, MenuItem } from "@mui/material";
import React, { type PropsWithChildren, type ReactNode, useState } from "react";

interface PropsDropdownButton {
  menu?: {
    testId?: string;
    content: string | ReactNode;
    onClick?: (index: number) => void;
  }[];
  content?: ReactNode;
  menuWidth?: string | number;
  testId?: string;
  menuTestId?: string;
}

function DropdownButton({
  children,
  menu,
  content,
  menuWidth,
  testId,
  menuTestId,
  ...props
}: PropsWithChildren<PropsDropdownButton> & ButtonProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (menu?.length ?? content) setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Button
        data-test-id={testId}
        id="basic-button"
        aria-haspopup="true"
        onClick={handleClick}
        variant={props.variant ?? "contained"}
        color="inherit"
        disableElevation
        sx={
          props.sx ?? {
            backgroundColor: "white",
            border: 1,
            borderColor: "#F0F0F0",
          }
        }
        {...props}
      >
        {children}
      </Button>
      <Menu
        data-test-id={menuTestId}
        id="basic-menu"
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={handleClose}
        sx={{ "& .MuiPaper-root": { width: menuWidth ?? "400px" } }}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {menu
          ? menu.map((menuItem, menuI) => (
              <MenuItem
                data-test-id={menuItem.testId}
                disableRipple
                disableTouchRipple
                sx={{
                  p: 0,
                  width: "100%",
                  "& :hover": {
                    backgroundColor: "background.default",
                  },
                }}
                key={menuI}
                onClick={() => {
                  menuItem.onClick ? menuItem.onClick(menuI) : undefined;
                  handleClose();
                }}
              >
                {menuItem.content}
              </MenuItem>
            ))
          : content}
      </Menu>
    </>
  );
}

export default DropdownButton;
