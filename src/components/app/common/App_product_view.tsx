import { useRecoilValue } from "recoil";
import { productState } from "../../../atoms/app_atoms";
import Image from "next/image";
import React from "react";

type Props = {
  width?: number;
  height?: number;
};

export const App_product_view = ({ width = 1000, height = 1000 }: Props) => {
  const { product_place } = useRecoilValue(productState);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "23px 0",
        background:"#fafafa"
      }}
    >
      {product_place && (
        <div style={{ width: "85vw" }}>
          <Image
            width={width}
            height={height}
            src={product_place}
            alt="商品画像"
            objectFit="contain"
          />
        </div>
      )}
    </div>
  );
};
