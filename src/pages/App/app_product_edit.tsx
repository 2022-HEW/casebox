import { NextPage } from "next";
import Image from "next/image";
import React, { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { productState } from "../../atoms/app_atoms";
import { Button } from "../../components/common/App_button";
import App_header from "../../components/common/App_header";

type ProductInfo={
  label:string
  value:string
}

const app_product_edit: NextPage = () => {
  return (
    <div>
      <App_header label="商品登録" />
      <ProductEdit />
    </div>
  );
};

const ProductEdit = () => {
  return (
    <>
      <ProductView />
      <ProductDetail />
      <Button label="デザインを保存する"/>
    </>
  );
};

const ProductView = () => {
  const { product_place } = useRecoilValue(productState);
  return (
    <div>
      <Image
        width={200}
        height={200}
        src={product_place ? `/product_image/${product_place}` : ""}
        alt="商品画像"
      />
    </div>
  );
};
const ProductDetail = () => {
  const { product_name,model_id,model_color,m_product_category } = useRecoilValue(productState);
  const [name, setName] = useState("");

  const ProductInfo=({label,value}:ProductInfo)=>{
    return(
      <div>
        {label}{value}
      </div>
    )  
  }

  return (
    <div>
      <label>
        <strong>商品名</strong>
        <input
          type={"text"}
          value={name}
          placeholder={product_name ? product_name : "名前を入力してください"}
        />
      </label>
      <p>非公開の商品</p>
      {/* <ProductInfo label="機種" value={}/> */}
      {/* <ProductInfo/> */}
    </div>
  );
};
export default app_product_edit;
