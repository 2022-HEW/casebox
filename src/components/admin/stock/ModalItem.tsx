import React, { ReactNode } from "react";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import { StyleSheetTuple } from "next/dist/client/page-loader";

type ModalItem = {
  title: string;
  value: number | string;
  isAble?: boolean;
  positionLeft?: string;
  children?: ReactNode;
};

export const ModalItem = ({
  title,
  value,
  isAble = false,
  positionLeft = "0px",
  children,
}: ModalItem) => {
  const ableStyle = {
    color: "#000",
    fontSize:"3vh"
  };
  const disableStyle = {
    color: "#888",
    fontSize:"3vh"
  };

  return (
    <Grid item >
      <Grid container gap={5}>
        <Grid item sx={{ position: "relative", left: positionLeft }}>
          <Typography style={isAble ? ableStyle : disableStyle}>
            {title}
          </Typography>
        </Grid>
        <Grid item sx={{ position: "relative", left: positionLeft }}>
          {isAble ? (
            <>{children}</>
          ) : (
            <Typography style={disableStyle}>{value}</Typography>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};
