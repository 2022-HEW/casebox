import { Grid } from "@mui/material";
import React from "react";
import { GlobalNav } from "../../../components/admin/common/globalNav";
import { Nav } from "../../../components/admin/common/nav";

const Product = () => {
  return (
    <Grid container>
      <GlobalNav />
      <Nav title={"商品売上"} />
    </Grid>
  );
};

export default Product;
