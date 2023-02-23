import { Grid, Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";
import { BarChart, CartesianGrid, XAxis, YAxis, Legend, Bar } from "recharts";
import { Buys } from "../../../types/admin/Buys";
import { Stock } from "../../../types/admin/Stock";
import { getDB } from "../../../utils";
import useEffectCustom from "../../../Hooks/common/useEffectCustom";

type Chart = {
  data: Buys[];
  xAxis: "buy_money" | "quant";
};

type Return = {
  xAxis: string;
  yAxis: number;
};

// type SeparateMonth = {
//   TotalPrice: number;
//   month: string;
// };
export const Chart = ({ data, xAxis }: Chart) => {
  const [ChartData, setChartData] = useState<Return[]>();
  const { result } = getDB("Stocks");

  // const [ChartData, setChartData] = useState<SeparateMonth[]>();
  useEffectCustom(() => {
    // setChartData(SeparateMonth(data));
    if (xAxis === "buy_money") {
      setChartData(SeparateMonth(data));
    } else if (xAxis === "quant") {
      setChartData(SeparateType(data, result));
    }
  }, [data, result]);
  if (!data || !result) {
    return <></>;
  } else {
    // console.log(data);
  }
  return (
    <BarChart width={730} height={200} data={ChartData}>
      <CartesianGrid strokeDasharray="3 3" />
      {/* <XAxis dataKey={"month"} /> */}
      <XAxis dataKey={"xAxis"} />
      <YAxis />
      {/* <Legend /> */}
      <Bar dataKey="yAxis" fill="#CCE1FF" />
    </BarChart>
  );
};

const SeparateType = (data: Buys[], Stocks: Stock[]): Return[] => {
  const ExistData = [];
  // 販売数0を追加したデータ
  const returnData = [];
  const types = [];
  let thisTypeTradeQuants = [data[0].quant];
  // console.log(data);

  for (let i = 1; i < data.length; i++) {
    const ThisType = data[i].model_name;
    const LastType = data[i - 1].model_name;
    const tradeQuant = data[i].quant;
    const totalQuant = thisTypeTradeQuants.reduce((a, b) => {
      return a + b;
    });
    if (LastType !== ThisType) {
      ExistData.push({
        yAxis: totalQuant,
        xAxis: LastType,
      });
      types.push(LastType);
      // 最後かつまだ入っていないとき
      if (i === data.length - 1 && totalQuant !== 0) {
        ExistData.push({
          yAxis: tradeQuant,
          xAxis: ThisType,
        });
        types.push(ThisType);
      }
      // 初期化
      thisTypeTradeQuants = [];
    } else {
      if (i === data.length - 1 && totalQuant !== 0) {
        ExistData.push({
          yAxis: totalQuant + tradeQuant,
          xAxis: ThisType,
        });
        types.push(ThisType);
      }
    }
    // 同月を一つの配列についか
    thisTypeTradeQuants.push(tradeQuant);
  }
  // データがない選択肢を追加する
  for (const value of Stocks) {
    returnData.push({ yAxis: 0, xAxis: value.model_name });
  }

  for (let i = 0; returnData.length > i; i++) {
    for (const value of ExistData) {
      if (returnData[i].xAxis === value.xAxis) {
        returnData[i].yAxis += value.yAxis;
      }
      // console.log(value.yAxis);
    }
  }

  return returnData;
};

const SeparateMonth = (data: Buys[]): Return[] => {
  const returnData = [];
  const STR_MONTHS = [];
  const strMonths = [];
  let thisMonthTradePrices = [data[0].buy_money];
  // console.log(data);

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
        yAxis: totalPrice,
        xAxis: ChangeStrMonth(Number(numLastMonth)),
      });
      strMonths.push(ChangeStrMonth(Number(numLastMonth)));
      // 最後かつまだ入っていないとき
      if (i === data.length - 1 && totalPrice !== 0) {
        returnData.push({
          yAxis: tradePrice,
          xAxis: ChangeStrMonth(Number(numThisMonth)),
        });
        strMonths.push(ChangeStrMonth(Number(numThisMonth)));
      }
      // 初期化
      thisMonthTradePrices = [];
    } else {
      if (i === data.length - 1 && totalPrice !== 0) {
        returnData.push({
          yAxis: totalPrice + tradePrice,
          xAxis: ChangeStrMonth(Number(numThisMonth)),
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
    STR_MONTHS.push({ xAxis: ChangeStrMonth(i), yAxis: 0 });
  }
  for (let i = 0; STR_MONTHS.length > i; i++) {
    for (const value of returnData) {
      if (STR_MONTHS[i].xAxis === value.xAxis) {
        STR_MONTHS[i].yAxis += value.yAxis;
      }
    }
  }

  return STR_MONTHS;
};

const ChangeStrMonth = (numMonth: number) => {
  const strMonth = new Date(`2002-${numMonth}-01`).toDateString().split(" ")[1];

  return strMonth;
};
