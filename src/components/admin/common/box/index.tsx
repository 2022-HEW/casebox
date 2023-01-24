import { Grid } from "@mui/material";
import React, { ReactNode } from "react";

type Box={
    children:ReactNode
}

export const Box = ({children}:Box) => {
  return <Grid container direction={"column"} sx={{width:"71.3vw",backgroundColor:"#EFF6FF"}}>{children}</Grid>;
};
