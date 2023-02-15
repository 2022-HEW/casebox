import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Grid,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import SettingsIcon from "@mui/icons-material/Settings";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ButtonValiant from "../../../../themes/admin/ButtonValiants";
import { useRouter } from "next/router";
import Modal from "@mui/material/Modal";
import { useRecoilValue } from "recoil";
import { productState } from "../../../../atoms/admin_atoms";

export const GlobalNav = () => {
  const router = useRouter();
  const ICON_VARIANT = ButtonValiant.GlobalNav;
  let NEW_ICON_VARIANT = {
    ...ICON_VARIANT,
    sx: { ...ICON_VARIANT.sx, backgroundColor: "none" },
  };
  const [isModal, setIsModal] = useState(false);
  const {userID} = useRecoilValue(productState)
  // logout
  useEffect(() => {
    if(!userID){
      router.push({
        pathname:"/admin/login"
      })      
    }
  },[]);
  
  const handleClickIcon = (pathname: string) => {
    router.push({ pathname: pathname });
  };


  const handleClickExit = () => {
    setIsModal(true);
  };

  const handleClose = () => {
    setIsModal(false);
  };

  const handleLogout = () => {
    router.push({
      pathname: "/admin/login",
    });
  };

  return (
    <Grid
      container
      direction={"column"}
      sx={{ backgroundColor: "#1E293C", height: "100vh", width: "5.5vw" }}
      gap={2}
    >
      <Grid item>
        <LocalOfferIcon
          {...(!router.pathname.includes("/admin/chart") 
            ? ICON_VARIANT
            : NEW_ICON_VARIANT)}
          onClick={() => handleClickIcon("/admin/product")}
        />
      </Grid>
      <Grid item xs={8.75}>
        <ShowChartIcon
          {...(router.pathname.includes("/admin/chart")
            ? ICON_VARIANT
            : NEW_ICON_VARIANT)}
          onClick={() => handleClickIcon("/admin/chart")}
        />
      </Grid>

      <Grid item>
        <ExitToAppIcon {...NEW_ICON_VARIANT} onClick={handleClickExit} />
      </Grid>
      <Dialog open={isModal} onClose={handleClose}>
        <DialogTitle align="center" variant="h4" mt={5}>
          {"ログアウトしますか？"}
          <DialogActions>
            <Grid
              container
              direction={"column"}
              gap={2}
              alignItems={"center"}
              sx={{ width: "60vw", height: "50vh" }}
            >
              <Grid xs={5} item />
              <Grid item>
                <Button
                  onClick={handleLogout}
                  color={"error"}
                  variant="contained"
                  sx={{ fontSize: "1.3rem", width: "20vw" }}
                >
                  ログアウト
                </Button>
              </Grid>
              <Grid item>
                <Button
                  onClick={handleClose}
                  variant="text"
                  sx={{ fontSize: "1.3rem", width: "20vw", color: "#222" }}
                >
                  キャンセル
                </Button>
              </Grid>
            </Grid>
          </DialogActions>
        </DialogTitle>
      </Dialog>
    </Grid>
  );
};
