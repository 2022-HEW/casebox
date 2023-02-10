import { Grid, Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";
import { BarChart, CartesianGrid, XAxis, YAxis, Legend, Bar } from "recharts";
import { SUBTITLE } from "../../../themes/admin/ChartNav";
import { Buys } from "../../../types/admin/Buys";
import { getDB } from "../../../utils";
import useEffectCustom from "../../common/useEffectCustom";
import { Body } from "../common/body";
import { Box } from "../common/box";
import { GlobalNav } from "../common/globalNav";
import { Nav } from "../common/nav";
import { Chart } from "./Chart";

export const ChartBox = () => {
  const [situation, setSituation] = useState<"month" | "date" | "year">("year");
  // const day =
  const SearchYear = new Date().getFullYear();
  const body = {
    option: `Buys&year=${SearchYear}`,
  };

  const buys = getDB(body.option).result;

  if (!buys) return <></>;

  //   useEffect(() => {
  //     console.log(buys);
  //     console.log(thisYear);
  //   });

  const thisYear = buys.filter(
    (value: Buys) => value.buy_created.includes(`${SearchYear}`)
  );

  const lastYear = buys.filter((value: Buys) =>
    value.buy_created.includes(`${SearchYear - 1}`)
  );

  return (
    <Grid container gap={0}>
      <GlobalNav />
      <Nav title={"商品売上"} values={SUBTITLE} />
      <Body>
        <Box>
          <Chart data={thisYear} />
        </Box>
        <Box>
          <Chart data={lastYear} />
        </Box>
      </Body>
    </Grid>
  );
};
