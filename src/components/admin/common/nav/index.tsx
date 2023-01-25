import { Button,Grid } from "@mui/material";
import React from "react";
import ButtonValiant from "../../../../themes/admin/ButtonValiants";
import { useRouter } from "next/router";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { Menu } from "./Menu";
import { NavValue } from "../../../../types/admin/Nav";
type Nav = {
  title: string;
  values: NavValue[];
};
export const Nav = ({ title, values }: Nav) => {
  const router = useRouter();
  const BUTTON_VARIANT = ButtonValiant.Nav;
  let NEW_BUTTON_VARIANT = {
    ...BUTTON_VARIANT,
    sx: { ...BUTTON_VARIANT.sx, backgroundColor: "none" },
  };

  const handleClickButton = (pathname: string) => {
    router.push({ pathname: pathname });
  };

  return (
    <Grid
      container
      direction={"column"}
      sx={{
        backgroundColor: "#EFF6FF",
        height: "100vh",
        width: "23.2vw",
        padding: "10px 40px 10px 20px",
      }}
      gap={1}
    >
      <Grid item>
        <Typography
          sx={{
            // padding: "5px 5px 10px 5px",
            fontWeight:"bold",
            fontSize:"1.4rem",
            color:" #44474F",
          }}
        >
          {title}
        </Typography>
      </Grid>
      {values.map((value,index) => (
        <Menu title={value.title} key={index}>
          {value.value.map((value,index) => (
            <Grid key={index}>
                <Button {...(router.pathname === value.url
            ? BUTTON_VARIANT
            : NEW_BUTTON_VARIANT)} onClick={()=>handleClickButton(value.url)}>{value.title}</Button>
            </Grid>
          ))}
        </Menu>
      ))}
    </Grid>
  );
};
