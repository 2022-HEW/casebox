import { Grid } from "@mui/material";
import React from "react";
import { Box } from "../../../components/admin/common/box";
import { GlobalNav } from "../../../components/admin/common/globalNav";
import { Nav } from "../../../components/admin/common/nav";
import { SUBTITLE } from "../../../themes/admin/ProductNav";
const Product = () => {
  
  return (
    <Grid container gap={0}>
      <GlobalNav />
      <Nav title={"商品情報"} values={SUBTITLE}/>
      <Box>
        <></>
      </Box>
    </Grid>
  );
};

export default Product;
