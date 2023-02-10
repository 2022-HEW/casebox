import { Grid, Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";
import { BarChart, CartesianGrid, XAxis, YAxis, Legend, Bar } from "recharts";
import { Buys } from "../../../types/admin/Buys";

type Chart = {
  data: Buys[];
};

type SeparateMonth = {
  TotalPrice: number;
  month: string;
};
export const Chart = ({ data }: Chart) => {
  const [ChartData, setChartData] = useState<SeparateMonth[]>();
  useEffect(() => {
    setChartData(SeparateMonth(data));
  }, []);

  return (
    <BarChart width={730} height={200} data={ChartData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey={"month"} />
      <YAxis />
      <Legend />
      <Bar dataKey="TotalPrice" fill="#82ca9d" label="g" />
    </BarChart>
  );
};

const SeparateMonth = (data: Buys[]): SeparateMonth[] => {
  const returnData = [];
  const STR_MONTHS = [];
  const strMonths = [];
  let thisMonthTradePrices = [data[0].buy_money];

  for (let i = 1; i < data.length; i++) {
    const numThisMonth = data[i].buy_created.split("-")[1];
    const numLastMonth = data[i - 1].buy_created.split("-")[1];
    const tradePrice = data[i].buy_money;
    const totalPrice = thisMonthTradePrices.reduce((a, b) => {
      return a + b;
    });
    // 月が変わったとき
    if (numLastMonth !== numThisMonth) {
      // 一月分追加
      returnData.push({
        TotalPrice: totalPrice,
        month: ChangeStrMonth(Number(numLastMonth)),
      });
      strMonths.push(ChangeStrMonth(Number(numLastMonth)));
      // 最後かつまだ入っていないとき
      if (i === data.length - 1 && totalPrice !== 0) {
        returnData.push({
          TotalPrice: tradePrice,
          month: ChangeStrMonth(Number(numThisMonth)),
        });
        strMonths.push(ChangeStrMonth(Number(numThisMonth)));
      }
      // 初期化
      thisMonthTradePrices = [];
    } else {
      if (i === data.length - 1 && totalPrice !== 0) {
        returnData.push({
          TotalPrice: totalPrice + tradePrice,
          month: ChangeStrMonth(Number(numThisMonth)),
        });
        strMonths.push(ChangeStrMonth(Number(numThisMonth)));
      }
    }
    // 同月を一つの配列についか
    thisMonthTradePrices.push(tradePrice);
  }
  // console.log(returnData);

  // データがない付きの選択肢を追加する
  for (let i = 1; i <= 12; i++) {
    STR_MONTHS.push({ month: ChangeStrMonth(i), TotalPrice: 0 });
  }
  for (let i = 0; STR_MONTHS.length > i; i++) {
    for(const value of returnData){
      if (STR_MONTHS[i].month === value.month) {
        STR_MONTHS[i].TotalPrice = value.TotalPrice;
      }
    }
  }

  return STR_MONTHS;
};

const ChangeStrMonth = (numMonth: number) => {
  const strMonth = new Date(`2002-${numMonth}-01`).toDateString().split(" ")[1];

  return strMonth;
};
