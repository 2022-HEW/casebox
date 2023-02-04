import { Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Box } from "../../../components/admin/common/box";
import { GlobalNav } from "../../../components/admin/common/globalNav";
import { Nav } from "../../../components/admin/common/nav";
import { SUBTITLE } from "../../../themes/admin/ProductNav";
import { UploadDetail } from "../../../components/admin/product/UploadDetail";
import { UploadPicture } from "../../../components/admin/product/UploadPicture";
import { fetcher, InsertDB } from "../../../utils";
import { InsertAzure } from "../../../utils";
import useSWR from "swr";
import { Body } from "../../../components/admin/common/body";

const Product = () => {
  const [error, setError] = useState("");
  const [thumbnailPath, setThumbnailPath] = useState<any>("/image/imageEdit.svg");
  const [thumbnailFile, setThumbnailFile] = useState<Blob>();
  const [designPath,setDesignPath] = useState<any>("/image/imageEdit.svg");
  const [designFile, setDesignFile] = useState<Blob>();


  const handleSetError = (text: string) => {
    setError(text);
  };

  const SetFormData = async (name: string,file:Blob,path:string) => {
    const formData = new FormData();
    if (file) {
      const blob = file.slice(0, file.size, file.type);
      // ファイル名称変更後のファイルオブジェクト
      const renamedFile = new File([blob], name, { type: file.type });
      formData.append("files", renamedFile);

      const post = await fetch(`/api/downloadImage?path=${path}`, {
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
      // console.log(error);
      return;
    }
    if (!thumbnailFile || !designFile) {
      setError("画像が選択されていません");
      console.log(thumbnailFile);
      console.log(designFile);
      
      return;
    }
    const ImageExt = thumbnailFile?.name.substring(
      thumbnailFile?.name.lastIndexOf(".") + 1
    );
// 画像保存
    SetFormData(text,thumbnailFile,"./public/product_image/");
    SetFormData(text,designFile,"./public/design/");

    const DBBody = {
      situ: "addProduct",
      product_name: text,
      user_id: "1",
      product_place: `${text}.${ImageExt}`,
      m_product_ID: category,
      product_situation: situation,
    };

    // DB登録処理：名前さえ入っていればどっちも取れる
    InsertDB(DBBody);
    alert("登録されました");
  };

  return (
    <Grid container gap={0}>
      <GlobalNav />
      <Nav title={"商品情報"} values={SUBTITLE} />
      <Body>
        <Box>
          <Grid item xs={5} container direction={"column"}>
            <Grid item>
              <UploadPicture
                title={"サムネイル"}
                imagePath={thumbnailPath}
                setImagePath={setThumbnailPath}
                setError={handleSetError}
                setImageFile={setThumbnailFile}
              />
            </Grid>
            <Grid item>
              <UploadPicture
                title={"デザインイメージ"}
                imagePath={designPath}
                setImagePath={setDesignPath}
                setError={handleSetError}
                setImageFile={setDesignFile}
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
