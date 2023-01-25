import { Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Box } from "../../../components/admin/common/box";
import { GlobalNav } from "../../../components/admin/common/globalNav";
import { Nav } from "../../../components/admin/common/nav";
import { SUBTITLE } from "../../../themes/admin/ProductNav";
import { UploadDetail } from "./UploadDetail";
import { UploadPicture } from "./UploadPicture";
import { fetcher, InsertDB } from "../../../utils";
import { InsertAzure } from "../../../utils";
import useSWR from "swr";

const Product = () => {
  const [error, setError] = useState("画像が選択されていません");
  const [imagePath, setImagePath] = useState<any>("/image/imageEdit.svg");
  const [imageFile, setImageFile] = useState<Blob>();

  const handleSetError = (text: string) => {
    setError(text);
  };

  const SetFormData = async (name: string) => {
    const formData = new FormData();
    if (imageFile) {
      const blob = imageFile.slice(0, imageFile.size, imageFile.type);
      // ファイル名称変更後のファイルオブジェクト
      const renamedFile = new File([blob], name, { type: imageFile.type });
      formData.append("files", renamedFile);

      const post = await fetch(`/api/downloadImage`, {
        method: "POST",
        body: formData,
      });

      console.log(await post.json());
    }
  };

  const handleRegister = async (
    text: string,
    category: number,
    situation: number
  ) => {
    if (!text) {
      setError("商品名が入力されていません");
      return;
    }
    if (error !== "") {
      console.log(error);
      return;
    }
    const ImageExt = imageFile?.name.substring(
      imageFile?.name.lastIndexOf(".") + 1
    );

    SetFormData(text);
    const DBBody = {
      situ: "addProduct",
      product_name: text,
      user_id: "1",
      product_place: `${text}.${ImageExt}`,
      m_product_ID: category,
      product_situation: situation,
    };

    // DB登録処理
    InsertDB("/api/admin_sql", DBBody);
  };

  return (
    <Grid container gap={0}>
      <GlobalNav />
      <Nav title={"商品情報"} values={SUBTITLE} />
      <Box>
        <Grid
          container
          sx={{
            backgroundColor: "#fff",
            boxShadow: "2px 2px 7px 1px rgba(0, 0, 0, 0.07)",
            borderRadius: "9px",
            width: "97%",
            height: "70%",
            marginTop: "3%",
          }}
          justifyContent="center"
          alignContent={"center"}
        >
          <Grid item xs={5}>
            <UploadPicture
              imagePath={imagePath}
              setImagePath={setImagePath}
              setError={handleSetError}
              setImageFile={setImageFile}
            />
          </Grid>
          <Grid item xs={5} justifyContent={"center"} alignContent={"center"}>
            <UploadDetail
              setError={handleSetError}
              handleRegister={handleRegister}
            />
            {error && <Typography color="error">※{error}</Typography>}
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
};

export default Product;
