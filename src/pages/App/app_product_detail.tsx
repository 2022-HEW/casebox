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
import { CSSProperties } from "react";

type QRButton = {
  // label:string
  setModalBody: Dispatch<SetStateAction<"QRcode" | "ProductMenu">>;
};

type Product = {
  name: string;
  category: string;
  price: number;
  product_liked: number;
  setModalBody: Dispatch<SetStateAction<"QRcode" | "ProductMenu">>;
};

type MenuButton = {
  label: string;
  onClick: () => void;
  style?: CSSProperties;
  src: string;
};

type CheckDelete = {
  setCheckDelete: Dispatch<SetStateAction<boolean>>;
  product_ID: number | null;
};
const QRcode = () => {
  const { azure_path, product_place } = useRecoilValue(productState);
  const [modal, setModal] = useRecoilState(modalState);

  const handleClose = () => {
    setModal(false);
  };

  return (
    <div className={styles.qr_modal_body} onClick={handleClose}>
      <div className={styles.qr_code}>
        <div className={styles.qr_body}>
          <Image
            width={1000}
            height={1000}
            src="/app/common/QRcode.png"
            alt="QRcode"
            objectFit="contain"
          />
        </div>
        <div className={styles.qr_value}>
          <QRCode
            value={azure_path ? azure_path : product_place}
            style={{ width: "64vw" }}
          />
        </div>
        <div className={styles.modal_cancel}>
          <Image width={40} height={40} src="/app/common/modal_cancel.svg" />
        </div>
      </div>
    </div>
  );
};

const DeleteCheck = ({ setCheckDelete, product_ID }: CheckDelete) => {
  const router = useRouter();
  const [modal, setModal] = useRecoilState(modalState);

  const deleteCancel = () => {
    setModal(false);
    setCheckDelete(false);
  };
  const productDelete = async () => {
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
      <p>商品は完全に削除され、元に戻すことはできません。</p>
      <button onClick={productDelete} style={{ color: "#F21938" }}>
        削除
      </button>
      <button onClick={deleteCancel} style={{ color: "#000",borderRadius:"15px" }}>キャンセル</button>
    </div>
  );
};

const ProductMenu = () => {
  const { product_ID } = useRecoilValue(productState);
  const [modal, setModal] = useRecoilState(modalState);
  const [product, setProduct] = useRecoilState(productState);
  const [checkDelete, setCheckDelete] = useState(false);

  const router = useRouter();

  const MenuButton = ({ label, onClick, style, src }: MenuButton) => {
    return (
      <button onClick={onClick} className={styles.menu_btn} style={style}>
        <div style={{ margin: "0 20px" }}>
          <Image width={30} height={30} alt={"アイコン"} src={src} />
        </div>
        {label}
      </button>
    );
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
      <div className={styles.modal_body}>
        <div className={styles.my_product_modal_cancel}>
          <Image
            src={"/image/cancel.svg"}
            width={30}
            height={30}
            onClick={handleClickCancel}
          />
        </div>
        <MenuButton
          label={
            product.product_situation
              ? "デザインを非公開にする"
              : "デザインを公開にする"
          }
          onClick={handleClickSituation}
          style={{
            borderRadius: "12px 12px 0 0",
            borderBottom: "0.5px solid #CCCCCC",
          }}
          src="/app/product_detail/open.svg"
        />
        <MenuButton
          label="編集"
          onClick={handleClickEditProduct}
          style={{ borderRadius: "0 0 12px 12px" }}
          src="/app/product_detail/edit.svg"
        />
        <MenuButton
          label="削除"
          onClick={handleClickDeleteProduct}
          style={{ margin: "5vh 0 0 0", color: "#F21938" }}
          src="/app/product_detail/delete.svg"
        />
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
    product_liked,
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

  useEffect(() => {
    console.log(product_liked);
  }, []);

  return (
    <div className={styles.container}>
      <App_header label="ケース" />
      <App_product_view />
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

const ProductInfo = ({
  name,
  category,
  price,
  setModalBody,
  product_liked,
}: Product) => {
  const { user_id } = useRecoilValue(profileState);
  const { product_user_id } = useRecoilValue(productState);
  const [modal, setModal] = useRecoilState(modalState);

  const handleClickMenu = () => {
    setModal(true);
    setModalBody("ProductMenu");
  };

  return (
    <div className={styles.product_info}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <p className={styles.case_name}>{name}</p>
        {user_id === product_user_id && (
          <button className={styles.menu_open_btn} onClick={handleClickMenu}>
            ...
          </button>
        )}
      </div>
      <p className={styles.case_category}>{category}</p>
      <p className={styles.case_price}>
        ￥{price.toLocaleString()}
        <span>税込</span>
      </p>
      <div className={styles.favorite}><Image src="/goodBtn/goodBefo.png" width={40} height={40}/></div>
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
  return (
    <div className={styles.button_area}>
      <Button
        label="QRコードを表示"
        onClick={handleQRcode}
        style={{ background: "#23ABDD" }}
      />
    </div>
  );
};
export default app_product_detail;
