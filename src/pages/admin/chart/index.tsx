import { Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Box } from "../../../components/admin/common/box";
import { GlobalNav } from "../../../components/admin/common/globalNav";
import { Nav } from "../../../components/admin/common/nav";
import { SUBTITLE } from "../../../themes/admin/ChartNav";
import { UploadDetail } from "../../../components/admin/product/UploadDetail";
import { UploadPicture } from "../../../components/admin/product/UploadPicture";
import { fetcher, InsertDB } from "../../../utils";
import { InsertAzure } from "../../../utils";
import useSWR from "swr";
import { Body } from "../../../components/admin/common/body";
import { getDB } from "../../../utils";
import { ChartBox } from "../../../components/admin/chart";

const ProductChart = () => {
  return <ChartBox xAxis="buy_money"></ChartBox>;
};

export default ProductChart;
