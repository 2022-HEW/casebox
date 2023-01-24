import { Dialog, Grid } from "@mui/material";
import React, { ReactNode, useState } from "react";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import SettingsIcon from "@mui/icons-material/Settings";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ButtonValiant from "../../../../themes/admin/ButtonValiants";
import { useRouter } from "next/router";
import Typography from "@mui/material/Typography";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Value } from "../../../../types/admin/Nav";

type Menu = {
  title: string;
  children: ReactNode;
};
export const Menu = ({ title, children }: Menu) => {
  const router = useRouter();
  const ICON_VARIANT = ButtonValiant.GlobalNav;
  let NEW_ICON_VARIANT = {
    ...ICON_VARIANT,
    sx: { ...ICON_VARIANT.sx, backgroundColor: "none" },
  };
  const [isModal, setIsModal] = useState(false);

  const handleClickIcon = (pathname: string) => {
    router.push({ pathname: pathname });
  };

  const handleClickExit = () => {
    setIsModal(true);
  };

  const handleClose = () => {
    setIsModal(false);
  };

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
