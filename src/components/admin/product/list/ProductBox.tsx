import { Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import React, { useState } from "react";
import { Product } from "../../../../types/admin/Product";
import { getThumbnailAzure } from "../../../../utils";

export const ProductBox = ({
  product_place,
  product_name,
  m_product_price,
  m_product_category,
}: Pick<
  Product,
  "m_product_price" | "product_place" | "product_name" | "m_product_category"
>) => {
  const [userProductImage, setUserProductImage] = useState("");

  if (m_product_category === "user") {
    getThumbnailAzure(product_place, setUserProductImage);
  }
  return (
    <Grid container direction={"column"}
    sx={{margin:"10px",position:"relative",top:"250px"}}
    >
      <Grid item>
        <Image
          // 投稿者がユーザーか運営か
          src={
            m_product_category === "user"
              ? userProductImage
              : "/product_image/" + product_place
          }
          width={100}
          height={100}
        />
      </Grid>
      <Grid item>
        <Typography
          sx={{
            fontStyle: "normal",
            fontWeight: "bold",
            fontSize: "16px",
            lineHeight: "30px",
            color: "#333333",
          }}
        >
          {product_name}
        </Typography>
      </Grid>
      <Grid item>
        <Typography
        sx={{
            fontStyle: "normal",
            fontSize: "12px",
            lineHeight: "20px",
            color: "#888",
          }}
        >{m_product_category}</Typography>
      </Grid>
      <Grid item>
        <Typography
         sx={{
            fontStyle: "normal",
            fontSize: "12px",
            lineHeight: "20px",
            color: "#333",
          }}
        >￥{m_product_price.toLocaleString()}(税込)</Typography>
      </Grid>
    </Grid>
  );
};
