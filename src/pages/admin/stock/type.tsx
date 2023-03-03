import { Grid, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { Box } from "../../../components/admin/common/box";
import { GlobalNav } from "../../../components/admin/common/globalNav";
import { Nav } from "../../../components/admin/common/nav";
import { SUBTITLE } from "../../../themes/admin/ProductNav";
import { UploadDetail } from "../../../components/admin/stock/UploadDetail";
import { UploadPicture } from "../../../components/admin/product/UploadPicture";
import { fetcher, InsertDB } from "../../../utils";
import { Body } from "../../../components/admin/common/body";
import { getDB } from "../../../utils";
import { NextPage } from "next";
import { downloadImage } from "../../../utils";

const Product: NextPage = () => {
  const [error, setError] = useState("");
  const [typePath, setTypePath] = useState<any>("/image/imageEdit.svg");
  const [typeFile, setTypeFile] = useState<Blob>();
  const [cameraPath, setCameraPath] = useState<any>("/image/imageEdit.svg");
  const [cameraFile, setCameraFile] = useState<Blob>();

  const { result } = getDB("Stocks");
    useEffect(()=>{
        console.log(result);
        
    },[result])
  const handleSetError = (text: string) => {
    setError(text);
  };

  

  const handleRegister = async (
    typeName: string,
    os: string,
    color: string
  ) => {
    
    setError("");
    // error check
    

    if (!typeName) {
      setError("商品名が入力されていません");
      return;
    }

    if (error !== "") {
      // console.log(error);
      return;
    }
    if (!typeFile || !cameraFile) {
      setError("画像が選択されていません");
      return;
    }
      
    // 画像保存
    downloadImage(color, typeFile, `./public/${os}/${typeName}/`);
    
    downloadImage(`${color}_camera`, cameraFile, `./public/${os}/${typeName}/`);

    const DBBody = {
      situ: "addType",
      model_name: typeName,     
    };

    alert("登録されました");
    for (const value of result) {
      if (typeName === value.model_name) {
        // setError("商品名が既に登録されています");
        return;
      }
    }
    // DB登録処理：名前さえ入っていればどっちも取れる
    InsertDB(DBBody);
  };

  return (
    <Grid container gap={0}>
      <GlobalNav />
      <Nav title={"機種情報"} values={SUBTITLE} />
      <Body>
        <Box>
          <Grid item xs={5} container direction={"column"}>
            <Grid item>
              <UploadPicture
                title={"機種画像"}
                imagePath={typePath}
                setImagePath={setTypePath}
                setError={handleSetError}
                setImageFile={setTypeFile}
              />
              <UploadPicture
                title={"カメラ画像"}
                imagePath={cameraPath}
                setImagePath={setCameraPath}
                setError={handleSetError}
                setImageFile={setCameraFile}
              />
            </Grid>
          </Grid>

          <Grid item xs={5} justifyContent={"center"} alignContent={"center"}>
            <UploadDetail
              setError={handleSetError}
              handleRegister={handleRegister}
            />
            {error && <Typography color="error">※{error}</Typography>}
          </Grid>
        </Box>
      </Body>
    </Grid>
  );
};

export default Product;
