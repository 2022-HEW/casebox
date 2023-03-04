import { Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Box } from "../../../components/admin/common/box";
import { GlobalNav } from "../../../components/admin/common/globalNav";
import { Nav } from "../../../components/admin/common/nav";
import { SUBTITLE } from "../../../themes/admin/ProductNav";
import { UploadPicture } from "../../../components/admin/product/UploadPicture";
import { fetcher, InsertDB } from "../../../utils";
import { Body } from "../../../components/admin/common/body";
import { getDB } from "../../../utils";
import { NextPage } from "next";
import { ColorDetail } from "../../../components/admin/stock/ColorDetail";
import useEffectCustom from "../../../Hooks/common/useEffectCustom";

const Product: NextPage = () => {
  const [error, setError] = useState("");
  const [colorCode, setColorCode] = useState("#aaa");

  const colorResult = getDB("Colors").result;

  const handleSetError = (text: string) => {
    setError(text);
  };

  const handleChangeColorCode=(code:string)=>{
    setColorCode(code)
}

  const handleRegister = async (name: string) => {
    setError("");

    

    // error check
    if (!name) {
      setError("カラー名が入力されていません");
      return;
    }

    for (const value of colorResult) {
      if (value.color_name === name || value.color_code === colorCode) {
        setError("このカラーはすでに登録されています");
        return;
      }
    }

    const ColorBody = {
      situ: "addColor",
      color_name: name,
      color_code: colorCode,
    };
    InsertDB(ColorBody);
    alert("登録しました。")
  };

  return (
    <Grid container gap={0}>
      <GlobalNav />
      <Nav title={"商品情報"} values={SUBTITLE} />
      <Body>
        <Box>
          <Grid item xs={5} container direction={"column"} justifyContent={"center"}>
            <Grid
              item
              sx={{ background: `${colorCode}` }}
              width={225}
              height={225}
            />
          </Grid>

          <Grid item xs={5} justifyContent={"center"} alignContent={"center"}>
            <ColorDetail
              setError={handleSetError}
              handleRegister={handleRegister}
              handleChangeColorCode={handleChangeColorCode}
              colorCode={colorCode}
            />
            {error && <Typography color="error">※{error}</Typography>}
          </Grid>
        </Box>
      </Body>
    </Grid>
  );
};

export default Product;
