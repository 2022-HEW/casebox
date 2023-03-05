import React, { useEffect } from "react";
import useSWR from "swr";
import Box from "../../components/main/common/Box";
import Nav from "../../components/main/common/Nav";
import { useRecoilValue } from "recoil";
import { productState, stockState } from "../../atoms/atoms";
import { NextPage } from "next";
import { handleSpeech } from "../../utils";
import { useRouter } from "next/router";

const Thankyou: NextPage = () => {
  
  const router = useRouter()

  useEffect(() => {
    // dataを持っていないとき遷移させる
    if(!model_id){
      router.push({
        pathname:"./service_select"
      })
      return;
    }

    handleSpeech("完成までしばらくお待ちください。");
    const timer =setTimeout(()=>{
      handleSpeech("ご利用ありがとうございました。またお越しくださいませ。");
      router.push({
        pathname:"./service_select"
      })
    },8000)

    InsertDB();

    return()=>{
      clearTimeout(timer)
    }

  }, []);

  const { m_product_price, product_ID, model_id, quant } =
    useRecoilValue(productState);
  const stocks = useRecoilValue(stockState);
  console.log(stocks);
  console.log(quant);

  const stock = () => {
    let new_stock = 0;
    stocks.map((value: any) => {
      console.log(value);
      if (value.model_id === model_id) {
        // 減った在庫分
        new_stock = value.model_stocks - quant;
      }
    });
    return new_stock;
  };

  // console.log(product_ID)
  const InsertDB = async () => {
    await fetch(
      `/api/Sql?sql=buy_data&&price=${
        m_product_price * quant
      }&&productID=${product_ID}&&modelID=${model_id}&&quant=${quant}`
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
      });

    // 在庫情報を追加
    await fetch(
      `/api/Sql?sql=update_stock&&modelID=${model_id}&&stock=${stock()}`
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
      });
  };

  return (
    <Box>
      <Nav>
        <div>
          <video src={"/movie/thankyou.mp4"} width={942} height={500} autoPlay loop/>
        </div>
      </Nav>
      -
    </Box>
  );
};

export default Thankyou;
