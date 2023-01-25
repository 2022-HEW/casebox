import { Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Box } from "../../../../components/admin/common/box";
import { GlobalNav } from "../../../../components/admin/common/globalNav";
import { Nav } from "../../../../components/admin/common/nav";
import { SUBTITLE } from "../../../../themes/admin/ProductNav";
import { fetcher} from "../../../../utils";
import useSWR from "swr";

const ProductList = () => {

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
            
          </Grid>
          <Grid item xs={5} justifyContent={"center"} alignContent={"center"}>

          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
};

export default ProductList;
