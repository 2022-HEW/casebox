import {  Grid } from "@mui/material";
import React, { ReactNode} from "react";
import Typography from "@mui/material/Typography";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

type Menu = {
  title: string;
  children: ReactNode;
};
export const Menu = ({ title, children }: Menu) => {
  return (
    <>
      <Grid item sx={{
            borderTop: "1px solid #CAC4D0",
            flex: "none",
            order: 0,
            alignSelf: "stretch",
            flexGrow: 0,
            padding: "10px 5px 10px 5px",
            fontWeight:"bold",
            fontSize:"1.4rem",
            color:" #44474F",
            alignItems: "flexEnd"
          }}>
        <Grid container gap={0}>
          <ArrowDropDownIcon sx={{ padding: "0px 0 0 0" }} />
          <Typography
            sx={{
              fontSize: "13px",
              fontWeight: "bold",
            }}
          >
            {title}
          </Typography>
        </Grid>
      </Grid>
      {children}
    </>
  );
};
