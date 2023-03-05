import { useRouter } from "next/router";
import React, { Suspense, useEffect, useState } from "react";
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

type ProductInfo = {
  name: string;
  sub: string;
  price: number;
  buttonLabel: string;
};
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
  const [nextURL, setNextURL] = useState("");

  useEffect(()=>{
    console.log(designImage);
  },)
  

  const getProductID = () => {
    const { data, error } = useSWR(
      !query.productID?.includes(".") &&
        `/api/Sql?sql=getProductID&&place=${query.productID}`,
      fetcher
    );
    return {
      productID: data,
    };
  };

  const getModelID = () => {
    const { data, error } = useSWR(
      !query.productID?.includes(".") &&
        `/api/Sql?sql=getModelID&&name=${modelName.split("/")[2]}`,
      fetcher
    );
    return {
      model: data,
    };
  };

  const getProductInfo = () => {
    const { data } = useSWR(
      query.productID?.includes(".") &&
        `/api/Sql?sql=getProductFromCamera&product_place=${query.productID}`,
      fetcher
    );
    return {
      productInfo: data,
    };
  };
  const { productID } = getProductID();
  const { model } = getModelID();
  const { productInfo } = getProductInfo();

  useEffectCustom(() => {
    if (productID && model) {
      setProduct((prevState) => ({
        ...prevState,
        product_ID: productID[0]["product_ID"],
        model_id: model[0]["model_id"],
      }));
      return;
    }
    if (productInfo) {
      setProduct((before) => ({
        ...before,
        product_ID: productInfo[0].product_ID,
        m_product_price: productInfo[0].m_product_price,
        product_place: query.productID as string,
        product_name: productInfo[0].product_name,
        m_product_category:productInfo[0].m_product_category
      }));
    }
  }, [productID, model, productInfo]);
  // 読み取れたら
  useEffect(() => {
      // console.log(query.productID);
      // console.log(query.json);
      // 公式
        if (query.productID?.includes(".")) {
          setDesignImage(`/product_image/${query.productID}`);
          setNextURL("/main/device_select");
          // オリジナル
        } else {
          getThumbnailAzure(query.productID, setDesignImage);
          setNextURL("/main/pay");
        }
        
  }, );

  useEffect(() => {
    // if (m_product_category === "user") {
    //   getThumbnailAzure();
    // }
    // console.log(product_situation);
    setDesignImage("");
  }, []);

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

  const ProductInfo = ({ buttonLabel, name, price, sub }: ProductInfo) => {
    const goEdit = () => {
      setProduct((prevState) => ({ ...prevState, quant: quant }));
      router.push({
        pathname: nextURL,
      });
    };

    return (
      <div className={styles.product_info}>
        <div className={styles.productDesc}>
          <h2 className={styles.productName}>{name}</h2>
          <p className={styles.productColor}>{sub}</p>
        </div>

        <h2 className={styles.price}>&yen;{price}円(税込)</h2>
        {query.productID?.includes(".") || (
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
        )}
        <motion.div
          style={{ position: "relative", left: "50%", top: "30px" }}
          whileTap={{ scale: 0.9 }}
        >
          <Button label={buttonLabel} situ_name={"screen"} onClick={goEdit} />
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
      {(productInfo || product) && (
        <ProductInfo
          name={
            query.productID?.includes(".")
              ? product.product_name
              : modelName.split("/")[2]
          }
          buttonLabel={query.productID?.includes(".") ? "機種選択へ" : "購入へ"}
          price={
             product.m_product_price
          }
          sub={
            query.productID?.includes(".")
              ? product.m_product_category
              : modelName.split("/")[3].split(".")[0]
          }
        />
      )}
    </div>
  );
};

export default OriginalCheck;
