import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Stage, Layer, Line, Group } from "react-konva";
import useImage from "use-image";
import Image from "next/image";
import { Button } from "../common/Button";
import { designState, imageState, productState } from "../../../atoms/atoms";
import { useRecoilState, useRecoilValue } from "recoil";
import { fetcher } from "../../../utils";
import useSWR from "swr";
import useEffectCustom from "../../../Hooks/common/useEffectCustom";
import styles from "../../../styles/device_select.module.css";
import { motion } from "framer-motion";
import { getThumbnailAzure } from "../../../utils";

const OriginalCheck = () => {
  // console.log(qrCodeData);

  const router = useRouter();
  const query = router.query;
  // const [designPath,setDesignPath] = useState<any>([])
  // const [designImage,setDesignImage] = useState("")
  const [designImage, setDesignImage] = useRecoilState(imageState);
  const [modelName, setModelName] = useState(
    "/iPhone/iPhone7/(PRODUCT)RED.png"
  );
  const [product, setProduct] = useRecoilState(productState);
  const [phone] = useImage(modelName);
  const camera_image_path = modelName.replace(/\.[^/.]+$/, "");
  const [camera] = useImage(camera_image_path + "_camera.png");
  const [design] = useImage(designImage);
  const [quant, setQuant] = useState(1);

  const getProductID = () => {
    const { data, error } = useSWR(
      query.productID && `/api/Sql?sql=getProductID&&place=${query.productID}`,
      fetcher
    );
    return {
      productID: data,
    };
  };

  const getModelID = () => {
    const { data, error } = useSWR(
      query.productID &&
        `/api/Sql?sql=getModelID&&name=${modelName.split("/")[2]}`,
      fetcher
    );
    return {
      model: data,
    };
  };
  const { productID } = getProductID();
  const { model } = getModelID();

  useEffectCustom(() => {
    // console.log(productID);
    // console.log(model);
    if (productID && model) {
      setProduct((prevState) => ({
        ...prevState,
        product_ID: productID[0]["product_ID"],
        model_id: model[0]["model_id"],
      }));
    }
  }, [productID, model]);
  // 読み取れたら
  useEffect(() => {
    if (router.isReady) {
      // console.log(query.productID);
      // console.log(query.json);
      getThumbnailAzure(query.productID, setDesignImage);
    }
  }, [query, router]);

  // useEffect(() => {
  //   if (m_product_category === "user") {
  //     getThumbnailAzure();
  //   }
  //   console.log(product_situation);

  // }, []);

  const ProductView = () => {
    return (
      <>
        {designImage && (
          <Image
            src={designImage}
            width={150}
            height={300}
            objectFit={"cover"}
          />
        )}
      </>
    );
  };

  const ProductInfo = () => {
    const goEdit = () => {
      setProduct((prevState) => ({ ...prevState, quant: quant }));
      router.push({
        pathname: "/main/pay",
      });
    };

    return (
      <div className={styles.product_info}>
        <div className={styles.productDesc}>
          <h2 className={styles.productName}>{modelName.split("/")[2]}</h2>
          <p className={styles.productColor}>
            {modelName.split("/")[3].split(".")[0]}
          </p>
        </div>

        <h2 className={styles.price}>&yen;{product.m_product_price}円(税込)</h2>
        <div className={styles.choseQuantity}>
          <motion.span
            className={styles.count}
            onClick={() => {
              quant > 1 && setQuant(quant - 1);
            }}
            whileTap={{ scale: 0.9 }}
          >
            －
          </motion.span>
          <div className={styles.quantity}>
            <p className={styles.quantity_text}>
              {quant}
              <span>こ</span>
            </p>
          </div>
          <motion.span
            className={styles.count}
            onClick={() => {
              quant < 6 && setQuant(quant + 1);
            }}
            whileTap={{ scale: 0.9 }}
          >
            ＋
          </motion.span>
        </div>
        <motion.div
          style={{ position: "relative", left: "50%", top: "30px" }}
          whileTap={{ scale: 0.9 }}
        >
          <Button label={"購入へ"} situ_name={"screen"} onClick={goEdit} />
        </motion.div>
      </div>
    );
  };

  return (
    <div
      className={styles.wrapper}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
      }}
    >
      <ProductView />
      <ProductInfo />
    </div>
  );
};

export default OriginalCheck;
