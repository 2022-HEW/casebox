import { Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Box } from "../../../components/admin/common/box";
import { GlobalNav } from "../../../components/admin/common/globalNav";
import { Nav } from "../../../components/admin/common/nav";
import { SUBTITLE } from "../../../themes/admin/ProductNav";
import { fetcher } from "../../../utils";
import useSWR from "swr";
import { Body } from "../../../components/admin/common/body";
import { StockTable } from "../../../components/admin/stock/StockTable";

const ProductList = () => {
  return (
    <Grid container gap={0}>
      <GlobalNav />
      <Nav title={"商品情報"} values={SUBTITLE} />
      <Body direction="row" justifyContent="space-evenly">
            <Box width="45%" alignContent="start" >
              <StockTable />
            </Box>
            <Box width="45%" alignContent="start">
              <StockTable />
            </Box>
      </Body>
    </Grid>
  );
};

export default ProductList;
