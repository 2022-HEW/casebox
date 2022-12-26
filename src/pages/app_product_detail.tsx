import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { modalState, productState, profileState } from "../atoms/app_atoms";
import App_header from "../components/common/App_header";
import Image from "next/image";
import styles from "../styles/app_product_detail.module.css";
import ModalStyles from "../styles/app_search.module.css"

import App_nav from "../components/common/App_nav";
import Modal from "../components/common/App_modal";
import { Button } from "../components/common/App_button";
import { NextPage } from "next";
import { useRouter } from "next/router";

type QRButton = {
  // label:string
  setModalBody: Dispatch<SetStateAction<"QRcode"|"ProductMenu">>;
};

type Product = {
  name: string;
  category: string;
  price: number;
  setModalBody: Dispatch<SetStateAction<"QRcode"|"ProductMenu">>;
};

const QRcode = () => {
  return <div>a</div>;
};

const ProductMenu = () => {
  return <div className={ModalStyles.modal}></div>;
};

const app_product_detail: NextPage = () => {
  const {
    product_place,
    product_name,
    m_product_category,
    m_product_price,
    product_user_id,
  } = useRecoilValue(productState);
  const router = useRouter();

  const [ModalBody, setModalBody] = useState<"QRcode"|"ProductMenu">("QRcode");
  // 再読み込み時
  useEffect(() => {
    if (router.isReady) {
      if (!product_place) {
        router.back();
      }
    }
  });

  return (
    <>
      <App_header />
      <ImageView path={product_place} />
      <ProductInfo
        name={product_name}
        category={m_product_category}
        price={m_product_price}
        setModalBody={setModalBody}
      />
      <QRButton setModalBody={setModalBody} />
      <App_nav />
      <Modal>
        {ModalBody === "QRcode" 
        ?
        <QRcode />
        :
        <ProductMenu/>
    }
      </Modal>
    </>
  );
};

const ImageView = ({ path }: { path: string }) => {
  return (
    <div className={styles.product_view}>
      <Image width={300} height={300} src={"/product_image/" + path} />
    </div>
  );
};

const ProductInfo = ({ name, category, price, setModalBody }: Product) => {
  const { user_id } = useRecoilValue(profileState);
  const { product_user_id } = useRecoilValue(productState);
  const [modal, setModal] = useRecoilState(modalState);

  const handleClickMenu = () => {
    setModal(true);
    setModalBody("ProductMenu");
  };

  return (
    <div className={styles.product_info}>
      {user_id === product_user_id && <button onClick={handleClickMenu}>...</button>}
      <p className={styles.case_name}>{name}</p>
      <p className={styles.case_category}>{category}</p>
      <p className={styles.case_price}>￥{price.toLocaleString()}(税込)</p>
    </div>
  );
};

const QRButton = ({ setModalBody }: QRButton) => {
  const [modal, setModal] = useRecoilState(modalState);
  const handleQRcode = () => {
    setModal(true);
    setModalBody("QRcode");
  };
  return <Button label="QRコードを表示" onClick={handleQRcode} />;
};
export default app_product_detail;
