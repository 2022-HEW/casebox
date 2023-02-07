import { Grid } from "@mui/material";
import React, { ReactNode } from "react";

type Box = {
  children: ReactNode;
  width?: string;
  alignContent?: string;
};

export const Box = ({
  children,
  width = "97%",
  alignContent = "center",
}: Box) => {
  return (
    <Grid
      container
      sx={{
        backgroundColor: "#fff",
        boxShadow: "2px 2px 7px 1px rgba(0, 0, 0, 0.07)",
        borderRadius: "9px",
        width: width,
        marginTop: "3%",
        padding: "5% 0",
        maxHeight: "95vh",
        overflowY: "scroll",
      }}
      justifyContent="center"
      alignContent={alignContent}
    >
      {children}
    </Grid>
  );
};
