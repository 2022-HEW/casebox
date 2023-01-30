import { Grid } from "@mui/material";
import React, { ReactNode } from "react";

type Box = {
  children: ReactNode;
};

export const Box = ({ children }: Box) => {
  return (
    <Grid
      container
      sx={{
        backgroundColor: "#fff",
        boxShadow: "2px 2px 7px 1px rgba(0, 0, 0, 0.07)",
        borderRadius: "9px",
        width: "97%",
        height: "70%",
        marginTop: "3%",
      }}
      justifyContent="center"
      alignContent={"center"}
    >
      {children}
    </Grid>
  );
};
