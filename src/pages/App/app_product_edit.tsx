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
import { Button } from "../../components/app/common/App_button";
import App_header from "../../components/app/common/App_header";
import { IOSSwitch } from "../../themes/app/Switch";
import { App_product_view } from "../../components/app/common/App_product_view";
import useEffectCustom from "../../Hooks/common/useEffectCustom";
import { fetcher } from "../../utils";
import styles from "../../styles/app/app_product_edit.module.css";

const app_product_edit: NextPage = () => {
  const router = useRouter();
  const { product_place, product_ID } = useRecoilValue(productState);
  const [modal, setModal] = useRecoilState(modalState);

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
    <div className={styles.container}>
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
    model_name,
    m_product_category,
    product_situation,
    product_place,
    m_product_price,
  } = useRecoilValue(productState);
  const { user_id, user_name } = useRecoilValue(profileState);
  const [name, setName] = useState("");
  const [situation, setSituation] = useState(product_situation);
  const [productPlace, setProductPlace] = useState("");
  const router = useRouter();

  const { data, error } = useSWR(
    `/api/app_sql?sql=template&&where=p.user_id="${user_id}"`,
    fetcher
  );

  useEffect(() => {
    if (data) {
      setProductPlace(user_id + data.length);
    };
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
            name: productPlace,
            thumbnail: product_place,
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
      // if (file.type === 'image/heif' || file.type === 'image/heic') {
      //   const outputBlob = await heic2any({
      //     blob: imageFile,
      //     toType: 'image/jpeg',
      //   });

      reader.readAsDataURL(file);
    }
  };

  const insertProductDB = async () => {
    await fetch(
      `/api/app_sql?sql=insert_product&product_name=${name}&user_id=${user_id}&product_place=${productPlace}&product_situation=${situation}`
    )
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then(() => {
        router.push({ pathname: "./app_service_select" });
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

  const ProductInfo = () => {
    const { model_name, m_product_price } = useRecoilValue(productState);
    const { user_id, user_name } = useRecoilValue(profileState);
    const type = model_name?.split("/")[2];
    const color = model_name?.split("/")[3].split(".")[0];

    return (
      <div className={styles.product_info}>
        <ProductRecord label="機種" value={type!} />
        <ProductRecord label="カラー" value={color!} />
        <ProductRecord label="カテゴリー" value={user_name} />
        <ProductRecord
          label="価格"
          value={`￥${m_product_price.toLocaleString()} 税込`}
        />
      </div>
    );
  };

  type ProductRecord = {
    label: string;
    value: string;
  };

  const ProductRecord = ({ label, value }: ProductRecord) => {
    return (
      <div className={styles.product_record_box}>
        <strong>{label}</strong>
        <span>{value}</span>
      </div>
    );
  };

  return (
    <div className={styles.product_detail}>
      <label className={styles.product_name_box}>
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
      <div className={styles.product_open_box}>
        <strong>{situation === 0 ? "非公開の商品" : "公開の商品"}</strong>
        <IOSSwitch
          value={"on"}
          checked={situation === 0 ? false : true}
          onClick={handleClickSituation}
        />
      </div>
      <ProductInfo />
      <div className={styles.button}>
        <Button label="デザインを保存する" onClick={handleClickSave} disabled={name===""?true:false} style={{background:"#23ABDD"}}/>
      </div>
    </div>
  );
};

export default app_product_edit;
