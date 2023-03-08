import { Grid, Tooltip } from "@mui/material";
import React, { Suspense, useEffect, useState } from "react";
import { BarChart, CartesianGrid, XAxis, YAxis, Legend, Bar } from "recharts";
import { SUBTITLE } from "../../../themes/admin/ChartNav";
import { Buys } from "../../../types/admin/Buys";
import { getDB } from "../../../utils";
import useEffectCustom from "../../../Hooks/common/useEffectCustom";
import { Body } from "../common/body";
import { Box } from "../common/box";
import { GlobalNav } from "../common/globalNav";
import { Nav } from "../common/nav";
import { Chart } from "./Chart";
type ChartBox = {
  xAxis: "quant" | "buy_money";
};
export const ChartBox = ({ xAxis }: ChartBox) => {
  const [situation, setSituation] = useState<"month" | "date" | "year">("year");
  const [buys, setBuys] = useState([]);
  // const day =
  const SearchYear = new Date().getFullYear();
  const body = {
    option: `Buys&year=${SearchYear}`,
  };
  const { result } = getDB(body.option);

  useEffect(() => {
    setBuys(result);
  }, [result]);

  if (!buys) return <></>;

  const thisYear = buys.filter((value: Buys) =>
    value.buy_created.includes(`${SearchYear}`)
  );

  const lastYear = buys.filter((value: Buys) =>
    value.buy_created.includes(`${SearchYear - 1}`)
  );

  return (
    <Suspense>
      <Grid container gap={0}>
        <GlobalNav />
        <Nav title={"商品売上"} values={SUBTITLE} />
        <Body>
          <Box>
            <Chart data={thisYear} xAxis={xAxis} />
          </Box>
          <Box>
            <Chart data={lastYear} xAxis={xAxis} />
          </Box>
        </Body>
      </Grid>
    </Suspense>
  );
};
