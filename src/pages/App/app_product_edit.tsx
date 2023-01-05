import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { productState,modalState } from "../../atoms/app_atoms";
import { Button } from "../../components/common/App_button";
import App_header from "../../components/common/App_header";
import { IOSSwitch } from "../../components/common/App_iosswitch";
import { App_product_view } from "../../components/common/App_product_view";

type ProductInfo = {
  label: string;
  value: string;
};
const app_product_edit: NextPage = () => {
  const router = useRouter();
  const { product_place, product_ID } = useRecoilValue(productState);
  const [modal,setModal]=useRecoilState(modalState)
  

  useEffect(() => {
    if (router.isReady) {
      if (!product_place) {
        router.push({ pathname: "./app_service_select" });
      }
    }
    if(modal){
      setModal(false)
    }
  },[]);
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
      <App_product_view />
      <ProductDetail />
    </>
  );
};

const ProductDetail = () => {
  const {
    product_ID,
    product_name,
    model_id,
    model_color,
    m_product_category,
    product_situation,
  } = useRecoilValue(productState);
  const [name, setName] = useState("");
  const [situation, setSituation] = useState(product_situation);
  const router = useRouter();

  const handleChangeName = (name:string) => {
    setName(name);
  };
  const handleClickSituation = () => {
    if (situation === 0) {
      setSituation(1);
    } else {
      setSituation(0);
    }
  };

  const handleClickSave = async () => {
    await fetch(
      `/api/app_sql?sql=update_product&productID=${product_ID}&product_name=${name}&product_situation=${situation}`
    )
      .then((res) => {
        return res.json();
      })
      .then(() => {
        router.push({ pathname: "./app_service_select" });
      });
  };

  const ProductInfo = ({ label, value }: ProductInfo) => {
    return (
      <div>
        {label}
        {value}
      </div>
    );
  };

  return (
    <div>
      <label>
        <strong>商品名</strong>
        <input
          type={"text"}
          value={name}
          placeholder={product_name ? product_name : "名前を入力してください"}
          onChange={(e)=>{handleChangeName(e.currentTarget.value)}}
        />
      </label>
      <p>{situation === 0 ? "非公開の商品" : "公開の商品"}</p>
      <IOSSwitch
        value={"on"}
        checked={situation === 0 ? false : true}
        onClick={handleClickSituation}
      />
      <Button label="デザインを保存する" onClick={handleClickSave} />

      {/* <ProductInfo label="機種" value={}/> */}
      {/* <ProductInfo/> */}
    </div>
  );
};
export default app_product_edit;
