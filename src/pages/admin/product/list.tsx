import { Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Box } from "../../../components/admin/common/box";
import { GlobalNav } from "../../../components/admin/common/globalNav";
import { Nav } from "../../../components/admin/common/nav";
import { SUBTITLE } from "../../../themes/admin/ProductNav";
import { fetcher, getProducts } from "../../../utils";
import useSWR from "swr";
import { Body } from "../../../components/admin/common/body";
import { ProductBox } from "../../../components/admin/product/list/ProductBox";
import { Product } from "../../../types/admin/Product";

const ProductList = () => {
  const { products } = getProducts();

  useEffect(() => {
    console.log(products);
  });

  return (
    <Grid container gap={0}>
      <GlobalNav />
      <Nav title={"商品情報"} values={SUBTITLE} />
      <Body>
        <Box>

          { products &&
          products.map((value: Product, index: number) => 
           <Grid item xs={3.3}>
              <ProductBox
                key={index}
                product_name={value.product_name}
                product_place={value.product_place}
                m_product_category={value.m_product_category}
                m_product_price={value.m_product_price}
              />
            </Grid>
          )}
        </Box>
      </Body>
    </Grid>
  );
};

export default ProductList;
