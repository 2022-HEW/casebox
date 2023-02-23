import { NextPage } from "next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { productState } from "../../atoms/app_atoms";
import App_header from "../../components/app/common/App_header";
import styles from "../../styles/app_original.module.css";
const App_image_edit = dynamic(
  () => import("../../components/app/App_image_edit"),
  { ssr: false }
);

const app_original: NextPage = () => {
  const [save, setSave] = useState(false);
  const router = useRouter()
  const {product_place}=useRecoilValue(productState)
  useLayoutEffect(()=>{
    if(product_place.includes("data:")){
      router.push({
        pathname:"./app_select_type"
      })
    }
  },[])

  return (
    <>
      <App_header label="オリジナル" />
      <div className={styles.app_original}>
        <App_image_edit />
      </div>
    </>
  );
};

export default app_original;
