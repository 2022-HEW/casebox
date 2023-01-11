import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Stage, Layer, Line, Group } from "react-konva";
import useImage from "use-image";
import { Image } from "react-konva";
import { Button } from "./common/Button";
import { designState, imageState } from "../atoms/atoms";
import { useRecoilState, useRecoilValue } from "recoil";

const OriginalCheck = () => {
  // console.log(qrCodeData);

  const router = useRouter();
  const query = router.query;
  // const [designPath,setDesignPath] = useState<any>([])
  // const [designImage,setDesignImage] = useState("")
  const [designPath, setDesignPath] = useRecoilState<any>(designState);
  const [designImage, setDesignImage] = useRecoilState(imageState);
  const [phone] = useImage("./iPhone/iPhone7/(PRODUCT)RED.png");
  const [camera] = useImage("./iPhone/iPhone7/(PRODUCT)RED_camera.png");
  const [design] = useImage(designImage);

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
          // console.log(typeof data);
          console.log(data[1]);
          console.log(designPath);
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
                width={designPath.children[0].children[1].children[0].attrs.width}
                height={designPath.children[0].children[1].children[0].attrs.height}
                scaleX={designPath.children[0].children[1].children[0].attrs.scaleX}
                scaleY={designPath.children[0].children[1].children[0].attrs.scaleY}
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
      router.push({
        pathname: "/originalEdit",
      });
    };

    return (
      <div>
        <div>アボカドケース</div>
        <div>CASEBOXオリジナル</div>
        <div>￥1,500(税込み)</div>
        <Button label={"編集へ"} situ_name={"screen"} onClick={goEdit} />
      </div>
    );
  };

  return (
    <div style={{ display: "flex" }}>
      <ProductView />
      <ProductInfo />
    </div>
  );
};

export default OriginalCheck;
