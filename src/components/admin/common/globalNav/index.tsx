import { Grid } from "@mui/material";
import React from "react";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import SettingsIcon from "@mui/icons-material/Settings";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ButtonValiant from "../../../../themes/admin/ButtonValiants";
import { useRouter } from "next/router";

export const GlobalNav = () => {
  const router = useRouter();
  const ICON_VARIANT = ButtonValiant.GlobalNav;
  let NEW_ICON_VARIANT = {
    ...ICON_VARIANT,
    sx: { ...ICON_VARIANT.sx, backgroundColor: "none" },
  };

  return (
    <Grid
      container
      direction={"column"}
      sx={{ backgroundColor: "#1E293C", height: "100vh", width: "70px" }}
      gap={2}
    >
      <Grid item>
        <LocalOfferIcon
          {...(router.pathname === "/admin/product"
            ? ICON_VARIANT
            : NEW_ICON_VARIANT)}
        />
      </Grid>
      <Grid item xs={8.75}>
        <ShowChartIcon
          {...(router.pathname === "/admin/chart"
            ? ICON_VARIANT
            : NEW_ICON_VARIANT)}
        />
      </Grid>

      <Grid item>
        <ExitToAppIcon {...NEW_ICON_VARIANT} />
      </Grid>
    </Grid>
  );
};
