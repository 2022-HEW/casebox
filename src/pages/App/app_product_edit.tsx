import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import useSWR from "swr";
import {
  productState,
  modalState,
  originalState,
  profileState,
} from "../../atoms/app_atoms";
import { Button } from "../../components/common/App_button";
import App_header from "../../components/common/App_header";
import { IOSSwitch } from "../../components/common/App_iosswitch";
import { App_product_view } from "../../components/common/App_product_view";
import useEffectCustom from "../../components/common/useEffectCustom";
import { fetcher } from "../../utils";

const app_product_edit: NextPage = () => {
  const router = useRouter();
  const { product_place, product_ID } = useRecoilValue(productState);
  const [modal, setModal] = useRecoilState(modalState);
  const { image, imagePosition } = useRecoilValue(originalState);

  useEffect(() => {
    if (router.isReady) {
      if (!product_place) {
        router.push({ pathname: "./app_service_select" });
      }
    }
    if (modal) {
      setModal(false);
    }
  }, []);
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
  const { image, imagePosition } = useRecoilValue(originalState);
  const {
    product_ID,
    product_name,
    model_id,
    model_color,
    m_product_category,
    product_situation,
    product_place
  } = useRecoilValue(productState);
  const { user_id } = useRecoilValue(profileState);
  const [name, setName] = useState("");
  const [situation, setSituation] = useState(product_situation);
  const [productPlace, setProductPlace] = useState("");
  const router = useRouter();

  const { data, error } = useSWR(
    `/api/app_sql?sql=template&&where=p.user_id="${user_id}"`,
    fetcher
  );

  useEffect(() => {
    if(data){
      setProductPlace(user_id + data.length);
    }
  }, [data]);

  const handleChangeName = (name: string) => {
    setName(name);
  };
  const handleClickSituation = () => {
    if (situation === 0) {
      setSituation(1);
    } else {
      setSituation(0);
    }
  };

  const insertBlobStorage = () => {
    const file = image;
    const formData = new FormData();
    if (file) {
      formData.append("file", file);
    }
    // nodeでは出来ない
    const reader = new FileReader();
    reader.onload = async () => {
      // Azureに入れる
      try {
        await fetch(`/api/blob_strage`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            //  アップロード
            image: reader.result,
            situ: "add",
            place: imagePosition,
            name:productPlace,
            thumbnail:product_place
            // QRcode
            // user_id: user_id,
            // "situ":"create",
          }),
        })
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            //         // Azureからbase64を取ってくる
            //         setImagePath(data[0]);
            console.log(data);
          });
      } catch (e) {
        console.error(e);
      }
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const insertProductDB = async () => {
    await fetch(
      `/api/app_sql?sql=insert_product&product_name=${name}&user_id=${user_id}&product_place=${productPlace}&product_situation=${situation}`
    )
      .then((res) => {
        return res.json();
      })
      .then(() => {
        // router.push({ pathname: "./app_service_select" });
      });
  };

  const updateProductDB = async () => {
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

  const handleClickSave = async () => {
    // 編集
    if (product_ID) {
      updateProductDB();
      // 登録
    } else {
      insertProductDB();
      insertBlobStorage();
    }
  };

  // const ProductInfo = ({ label, value }: ProductInfo) => {
  //   return (
  //     <div>
  //       {label}
  //       {value}
  //     </div>
  //   );
  // };

  return (
    <div>
      <label>
        <strong>商品名</strong>
        <input
          type={"text"}
          value={name}
          placeholder={product_name ? product_name : "名前を入力してください"}
          onChange={(e) => {
            handleChangeName(e.currentTarget.value);
          }}
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
