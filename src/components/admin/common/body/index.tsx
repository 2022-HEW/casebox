import { Grid } from "@mui/material";
import React, { ReactNode } from "react";

type Body = {
  children: ReactNode;
};

export const Body = ({ children }: Body) => {
  return (
    <Grid
      container
      direction={"column"}
      sx={{ width: "71.3vw", backgroundColor: "#EFF6FF" }}
    >
      {children}
    </Grid>
  );
};
