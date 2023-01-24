import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Stage, Layer, Line, Group } from "react-konva";
import useImage from "use-image";
import { Image } from "react-konva";
import { Button } from "./common/Button";
import { designState, imageState, productState } from "../atoms/atoms";
import { useRecoilState, useRecoilValue } from "recoil";
import { fetcher } from "../utils";
import useSWR from "swr";
import useEffectCustom from "./common/useEffectCustom";
import styles from "../styles/device_select.module.css";

const OriginalCheck = () => {
  // console.log(qrCodeData);

  const router = useRouter();
  const query = router.query;
  // const [designPath,setDesignPath] = useState<any>([])
  // const [designImage,setDesignImage] = useState("")
  const [designPath, setDesignPath] = useRecoilState<any>(designState);
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
      getDesign(query.productID);
    }
  }, [query, router]);

  const getDesign = async (userID: string | string[] | undefined) => {
    try {
      await fetch(`/api/blob_strage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          //  アップロード
          situ: "create",
          place: query.productID,
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          // Azureからbase64を取ってくる
          setDesignImage(data[0]);
          setDesignPath(JSON.parse(data[1]));
          // setModelName(data)
          // console.log(JSON.parse(data[1]));
          // console.log();
          setModelName(JSON.parse(data[1]).model_name);
          // console.log(designPath);
        });
    } catch (e) {
      console.error(e);
    }
  };

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
          <Stage
            width={designPath.attrs.width}
            height={designPath.attrs.height}
          >
            <Layer>
              <Image
                image={phone}
                width={designPath.children[0].children[0].attrs.width}
                height={designPath.children[0].children[0].attrs.height}
              />
              <Group draggable={true}>
                <Image
                  image={design}
                  width={
                    designPath.children[0].children[1].children[0].attrs.width
                  }
                  height={
                    designPath.children[0].children[1].children[0].attrs.height
                  }
                  scaleX={
                    designPath.children[0].children[1].children[0].attrs.scaleX
                  }
                  scaleY={
                    designPath.children[0].children[1].children[0].attrs.scaleY
                  }
                  x={designPath.children[0].children[1].children[0].attrs.x}
                  y={designPath.children[0].children[1].children[0].attrs.y}
                />
              </Group>

              <Image
                image={camera}
                width={designPath.children[0].children[2].attrs.width}
                height={designPath.children[0].children[2].attrs.height}
                x={designPath.children[0].children[2].attrs.x}
                y={designPath.children[0].children[2].attrs.y}
              />
            </Layer>
          </Stage>
        )}
      </>
    );
  };

  const ProductInfo = () => {
    const goEdit = () => {
      setProduct((prevState) => ({ ...prevState, quant: quant }));
      router.push({
        pathname: "/pay",
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
          <span
            className={styles.count}
            onClick={() => {
              quant > 1 && setQuant(quant - 1);
            }}
          >
            －
          </span>
          <div className={styles.quantity}>
            <p className={styles.quantity_text}>
              {quant}
              <span>こ</span>
            </p>
          </div>
          <span
            className={styles.count}
            onClick={() => {
              quant < 6 && setQuant(quant + 1);
            }}
          >
            ＋
          </span>
        </div>
        <Button label={"編集へ"} situ_name={"screen"} onClick={goEdit} />
      </div>
    );
  };

  return (
    <div
      className={styles.wrapper}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ProductView />
      <ProductInfo />
    </div>
  );
};

export default OriginalCheck;
