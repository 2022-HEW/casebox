import { Grid } from "@mui/material";
import Image from "next/image";
import React from "react";

export const UploadPicture = () => {
  return (
    <Grid container direction="column">
      <Grid item >商品画像</Grid>
      <Grid item > 
        <Image width={100} height={100} alt="写真追加" src="" />
      </Grid>
    </Grid>
  );
};
