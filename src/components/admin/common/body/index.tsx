import { Grid } from "@mui/material";
import React, { ReactNode } from "react";

type Body = {
  children: ReactNode;
  direction?:"column" | "row"
  justifyContent?:string
};

export const Body = ({ children,direction = "column",justifyContent="center" }: Body) => {
  return (
    <Grid
      container
      direction={direction}
      sx={{
        maxWidth: "71.3vw",
        backgroundColor: "#EFF6FF",
        "& ::-webkit-scrollbar": {
          display: "none",
        },
      }}
      justifyContent={justifyContent}
    >
      {children}
    </Grid>
  );
};
