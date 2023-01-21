import { Dialog, Grid } from "@mui/material";
import React, { useState } from "react";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import SettingsIcon from "@mui/icons-material/Settings";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ButtonValiant from "../../../../themes/admin/ButtonValiants";
import { useRouter } from "next/router";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";

type Nav = {
  title: string;
};
export const Nav = ({ title }: Nav) => {
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
    <Grid
      container
      direction={"column"}
      sx={{
        backgroundColor: "#EFF6FF",
        height: "100vh",
        width: "25vw",
        padding: "10px 40px 0 20px",
      }}
      gap={2}
    >
      <Grid item>
        <Typography
          variant="h5"
          sx={{
            borderBottom: "1px solid #CAC4D0",
            flex: "none",
            order: 0,
            alignSelf: "stretch",
            flexGrow: 0,
            padding:"0 0 10px 0"
          }}
        >
          {title}
        </Typography>
      </Grid>
      <Grid item xs={8.75}>
        <ShowChartIcon
          {...(router.pathname === "/admin/chart"
            ? ICON_VARIANT
            : NEW_ICON_VARIANT)}
          onClick={() => handleClickIcon("/admin/chart")}
        />
      </Grid>

      <Grid item>
        <ExitToAppIcon {...NEW_ICON_VARIANT} onClick={handleClickExit} />
      </Grid>
      <Dialog open={isModal} onClose={handleClose}></Dialog>
    </Grid>
  );
};
