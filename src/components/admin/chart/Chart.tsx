import { Grid, Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";
import { BarChart, CartesianGrid, XAxis, YAxis, Legend, Bar } from "recharts";
import { Buys } from "../../../types/admin/Buys";

type Chart = {
  data: Buys[];
};

type SeparateMonth = {
  totalPrice: number;
  month: string;
};
export const Chart = ({ data }: Chart) => {
  const [ChartData, setChartData] = useState<SeparateMonth[]>();
  useEffect(() => {
    setChartData(SeparateMonth(data));
  }, []);

  return (
    <BarChart width={730} height={250} data={ChartData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey={"month"} />
      <YAxis />
      <Legend />
      <Bar dataKey="pv" fill="#8884d8" />
      <Bar dataKey="uv" fill="#82ca9d" />
    </BarChart>
  );
};

const SeparateMonth = (data: Buys[]): SeparateMonth[] => {
  const returnData = [];
  let thisMonthTradePrices = [];

  for (let i = 0; i < data.length; i++) {
    const numThisMonth = data[i].buy_created.split("-")[1];
    const tradePrice = data[i].buy_money;
    if (i > 0) {
      // 最後
      if (i == data.length - 1) {
  
        const totalPrice = thisMonthTradePrices.reduce((a, b) => {
          return a + b;
        });
  
        returnData.push({
          totalPrice: totalPrice,
          month: ChangeStrMonth(Number(numThisMonth)),
        });
        return returnData;
      }

      const numLastMonth = data[i - 1].buy_created.split("-")[1];
      // 月が変わったとき
      if (numLastMonth !== numThisMonth) {
        // console.log(thisMonthTradePrices);

        const totalPrice = thisMonthTradePrices.reduce((a, b) => {
          return a + b;
        });
        // const totalPrice = 0
        // 一月分追加
        returnData.push({
          totalPrice: totalPrice,
          month: ChangeStrMonth(Number(numLastMonth)),
        });
        // 初期化
        thisMonthTradePrices = [];
      }
      thisMonthTradePrices.push(tradePrice);
    } else {
      // 初回
      thisMonthTradePrices.push(tradePrice);
    }
  }
  console.log(returnData);

  return returnData;
};

const ChangeStrMonth = (numMonth: number) => {
  const strMonth = new Date(`2002-${numMonth}-01`).toDateString().split(" ")[1];

  return strMonth;
};
