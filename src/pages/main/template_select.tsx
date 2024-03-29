import styles from "../../styles/template_select.module.css";
import Nav from "../../components/main/common/Nav";
import Box from "../../components/main/common/Box";
import React, { useEffect, useState, useRef } from "react";
import Modal from "../../components/main/common/Modal";
// import { forwardRef } from "react";
import Product_check from "../../components/main/common/Product_check";
import { useRecoilState } from "recoil";
import { modalState } from "../../atoms/atoms";
import useSWR from "swr";
import Image from "next/image";
import { NextPage } from "next";
import { fetcher } from "../../utils";
import { motion } from "framer-motion";
import { slideLeft, slideRight } from "../../themes/animation/indicate";

/**
 * 商品情報を表示する
 * @returns
 */
type Product = {
  id: number;
  image_path: string;
  case_name: string;
  case_category: string;
  case_price: number;
  // modal_flg:boolean,
  // setModal:React.Dispatch<React.SetStateAction<boolean>>
  setProduct_ID: React.Dispatch<React.SetStateAction<number>>;
};

// 商品一個あたり
const Product_box = ({
  id,
  image_path,
  case_name,
  case_category,
  case_price,
  setProduct_ID,
}: Product) => {
  const [modal, setModal] = useRecoilState(modalState);
  const [originalPlace, setOriginalPlace] = useState("");


  // モーダルを動かして、商品IDを送る
  const Modal_toggle = () => {
    setModal(!modal);
    setProduct_ID(id);
  };

  return (
    // <div className={styles.product_box} ref={ref} >
    <div className={styles.product_box} onClick={Modal_toggle}>
      <Image
        src={
          case_category === "user"
            ? originalPlace
            : "/product_image/" + image_path
        }
        alt="商品の画像"
        width={200}
        height={200}
        id={styles.product_image}
      />
      <p className={styles.case_name}>{case_name}</p>
      <p className={styles.case_category}>{case_category}</p>
      <p className={styles.case_price}>￥{case_price.toLocaleString()}(税込)</p>
    </div>
    // "../../public/product_image/bts_butter.png"
  );
};

// メイン
const Template: NextPage = () => {
  type Product = {
    product_ID: number;
    product_name: string;
    product_liked: number;
    product_place: string;
    m_product_category: string;
    m_product_price: number;
  };
  const [product, setProduct] = useState([]);
  const [product_ID, setProduct_ID] = useState(-1);

  const { data } = useSWR<any>(`/api/Sql?sql=template`, fetcher);

  // DBから取得
  useEffect(() => {
    if (data) {
      setProduct(data);
    }
  }, [data]);
  // 取得するまで
  if (!data)
    return (
      <Box>
        <Nav>
          <></>
        </Nav>
      </Box>
    );

  //   console.log(data[0].product_ID);

  return (
    <>
      <Box>
        <Nav>
          <Modal>
            <Product_check product={product[product_ID]} />
          </Modal>

          <div className={styles.top_line}>
            {product.map(
              (product: Product, index: number) =>
                index % 2 === 0 && (
                  <motion.div
                    {...slideLeft}
                    whileTap={{ scale: 0.6 }}
                    key={product.product_ID}
                  >
                    <Product_box
                      image_path={product.product_place}
                      case_name={product.product_name}
                      case_category={product.m_product_category}
                      case_price={product.m_product_price}
                      id={index}
                      setProduct_ID={setProduct_ID}
                    />
                  </motion.div>
                )
            )}
          </div>

          <div className={styles.bottom_line}>
            {product.map(
              (product: Product, index: number) =>
                index % 2 === 1 && (
                  <motion.div
                    {...slideRight}
                    whileTap={{ scale: 0.6 }}
                    key={product.product_ID}
                  >
                    <Product_box
                      image_path={product.product_place}
                      case_name={product.product_name}
                      case_category={product.m_product_category}
                      case_price={product.m_product_price}
                      id={index}
                      setProduct_ID={setProduct_ID}
                    />
                  </motion.div>
                )
            )}
          </div>
        </Nav>
      </Box>
    </>
  );
};

// });

export default React.memo(Template);
