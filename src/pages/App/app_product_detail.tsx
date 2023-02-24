import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { modalState, productState, profileState } from "../../atoms/app_atoms";
import App_header from "../../components/app/common/App_header";
import Image from "next/image";
import styles from "../../styles/app_product_detail.module.css";
import ModalStyles from "../../styles/app_search.module.css";

import App_nav from "../../components/app/common/App_nav";
import Modal from "../../components/app/common/App_modal";
import { Button } from "../../components/app/common/App_button";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { App_product_view } from "../../components/app/common/App_product_view";
import { QRCode } from "react-qrcode";
import { style } from "@mui/system";


type QRButton = {
  // label:string
  setModalBody: Dispatch<SetStateAction<"QRcode" | "ProductMenu">>;
};

type Product = {
  name: string;
  category: string;
  price: number;
  product_liked:number
  setModalBody: Dispatch<SetStateAction<"QRcode" | "ProductMenu">>;
};

type MenuButton = {
  label: string;
  onClick: () => void;
};

type CheckDelete = {
  setCheckDelete: Dispatch<SetStateAction<boolean>>;
  product_ID: number | null;
};
const QRcode = () => {
  const { azure_path,product_place } = useRecoilValue(productState);
  
  

  return <div className={styles.qr_modal_body}>
              <QRCode value={azure_path ? azure_path : product_place}/>
        </div>;
};

const DeleteCheck = ({ setCheckDelete, product_ID }: CheckDelete) => {
  const router = useRouter();
  const [modal, setModal] = useRecoilState(modalState);

  const deleteCancel = () => {
    setModal(false);
    setCheckDelete(false);
  };
  const productDelete = async() => {
    await fetch(`/api/app_sql?sql=delete_product&productID=${product_ID}`)
      .then((res) => {
        return res.json;
      })
      .then((data) => {
        setModal(false);
        router.back();
      });
  };
  return (
    <div className={styles.delete_check}>
      <h3>商品を削除しますか？</h3>
      <p>商品は完全に削除され、もとに戻すことは出来ません</p>
      <button onClick={productDelete}>削除</button>
      <button onClick={deleteCancel}>キャンセル</button>
    </div>
  );
};

const ProductMenu = () => {
  const { product_ID } = useRecoilValue(productState);
  const [modal, setModal] = useRecoilState(modalState);
  const [product, setProduct] = useRecoilState(productState);
  const [checkDelete, setCheckDelete] = useState(false);

  const router = useRouter();

  
  const MenuButton = ({ label, onClick }: MenuButton) => {
    return <button onClick={onClick}>{label}</button>;
  };
  const handleClickCancel = () => {
    setModal(false);
  };
  const handleClickSituation = async () => {
    await fetch(
      `/api/app_sql?sql=situation&productID=${product_ID}&product_situation=${
        product.product_situation === 0 ? 1 : 0
      }`
    ).then((res) => {
      return res.json;
    });
    if (product.product_situation === 1) {
      setProduct((prev) => ({ ...prev, product_situation: 0 }));
    } else {
      setProduct((prev) => ({ ...prev, product_situation: 1 }));
    }
  };
  const handleClickEditProduct = () => {
    router.push({
      pathname: "./app_product_edit",
    });
  };
  const handleClickDeleteProduct = async () => {
    setCheckDelete(true);
    setModal(true);
  };
  return checkDelete ? (
    <>
      <Modal>
        <DeleteCheck setCheckDelete={setCheckDelete} product_ID={product_ID} />
      </Modal>
    </>
  ) : (
    <div className={ModalStyles.modal}>
      <div>
        <Image
          src={"/image/cancel.svg"}
          width={20}
          height={20}
          onClick={handleClickCancel}
        />
        <MenuButton
          label={
            product.product_situation
              ? "デザインを非公開にする"
              : "デザインを公開にする"
          }
          onClick={handleClickSituation}
        />
        <MenuButton label="編集" onClick={handleClickEditProduct} />
        <MenuButton label="削除" onClick={handleClickDeleteProduct} />
      </div>
    </div>
  );
};

const app_product_detail: NextPage = () => {
  const {
    product_ID,
    product_place,
    product_name,
    m_product_category,
    m_product_price,
    product_liked
  } = useRecoilValue(productState);
  const router = useRouter();

  const [ModalBody, setModalBody] = useState<"QRcode" | "ProductMenu">(
    "QRcode"
  );
  // 再読み込み時
  useEffect(() => {
    if (router.isReady) {
      if (!product_place) {
        router.back();
      }
    }
  });

  
  useEffect(()=>{
    console.log(product_liked)
  },[])

  return (
    <div className={styles.container}>
      <App_header />
      <App_product_view  />
      <ProductInfo
        name={product_name}
        category={m_product_category}
        price={m_product_price}
        setModalBody={setModalBody}
        product_liked={product_liked}
      />
      <QRButton setModalBody={setModalBody} />
      <App_nav />
      <Modal>{ModalBody === "QRcode" ? <QRcode /> : <ProductMenu />}</Modal>
    </div>
  );
};


const ProductInfo = ({ name, category, price, setModalBody,product_liked }: Product) => {
  const { user_id } = useRecoilValue(profileState);
  const { product_user_id } = useRecoilValue(productState);
  const [modal, setModal] = useRecoilState(modalState);

  const handleClickMenu = () => {
    setModal(true);
    setModalBody("ProductMenu");
  };

  return (
    <div className={styles.product_info}>
      {user_id === product_user_id && (
        <button onClick={handleClickMenu}>...</button>
      )}
      <p className={styles.case_name}>{name}</p>
      <p className={styles.case_category}>{category}</p>
      <p className={styles.case_price}>￥{price.toLocaleString()}<span>税込</span></p>
      <p className={styles.favorite}>❤</p>
      <p className={styles.product_liked}>{product_liked}</p>
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
