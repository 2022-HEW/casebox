import { useRecoilValue } from "recoil";
import { productState } from "../../../atoms/app_atoms";
import React, { useEffect, useState } from "react";
import { abort } from "process";
import { Layer, Stage,Image } from "react-konva";
import useImage from "use-image";

const App_product_view = () => {
  const { product_place } = useRecoilValue(productState);
  const [camera_image_path] = useImage(product_place.replace(".png", "_camera.png"));
  const [image] = useImage(product_place);
  const [imageSize,setImageSize] = useState({width:0,height:0})
  useEffect(() => {
    const img = new window.Image();
    img.src = product_place;
    img.onload = () => {
      setImageSize({
        width: window.innerWidth/2.25,
        height: window.innerWidth/2.25*img.height/img.width
      });
    };
  }, [product_place]);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "23px 0",
        background: "#fafafa",
      }}
    >
      {product_place && (
          <Stage width={imageSize.width}height={imageSize.height}  x={-(imageSize.height/2 - imageSize.width / 2)}
                y={0}>
            <Layer>
              <Image image={image} width={imageSize.width}height={imageSize.height}  x={imageSize.height/2 - imageSize.width / 2}/>
              <Image image={camera_image_path} width={imageSize.width}height={imageSize.height} x={imageSize.height/2 - imageSize.width / 2}/>
            </Layer>
          </Stage>
      )}
    </div>
  );
};

export default App_product_view