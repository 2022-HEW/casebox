import { type } from "os";
import React, { useState } from "react";
import Image from "next/image";
import styles from "../../../styles/device_select.module.css";
import { Button } from "./Button";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { productState } from "../../../atoms/atoms";
import { motion } from "framer-motion";
import { bound } from "../../../themes/animation/indicate";

type Props = {
  image_path: string;
  design_path: string;
  type_name: string;
  color_name: string;
  product_price: number;
};

const Product_buy_check = ({
  image_path,
  design_path,
  type_name,
  color_name,
  product_price,
}: Props) => {
  const router = useRouter();
  const [count, setCount] = useState(1);
  const [product, setProduct] = useRecoilState(productState);

  const go_pay_select = () => {
    setProduct((before) => ({ ...before, m_product_price: count*before.m_product_price }));
    router.push({
      pathname: "/main/pay",
    });
  };

  return (
    <>
      <div className={styles.wrapper}>
        <Image
          className={styles.bgImage}
          src={image_path}
          alt="スマホ"
          width={300}
          height={430}
          objectFit="contain"
        />

        <div className={styles.product_info}>
          <div className={styles.productDesc}>
            <h2 className={styles.productName}>{type_name}</h2>
            <p className={styles.productColor}>{color_name}</p>
          </div>

          <h2 className={styles.price}>&yen;{product_price}(税込)</h2>
          <div className={styles.choseQuantity}>
            <motion.div
              className={styles.count}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                count > 1 && setCount(count - 1);
              }}
            >
              －
            </motion.div>
            <div className={styles.quantity}>
              <p className={styles.quantity_text}>
                {count}
                <span>こ</span>
              </p>
            </div>
            <motion.div
              className={styles.count}
              onClick={() => {
                count < 6 && setCount(count + 1);
              }}
              whileTap={{ scale: 0.9 }}
            >
              ＋
            </motion.div>
          </div>
          <div className={styles.go_pay}>
            <Button situ_name="screen" label="購入へ" onClick={go_pay_select} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Product_buy_check;
