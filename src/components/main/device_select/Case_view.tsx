import styles from "../../../styles/device_select.module.css";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { productState, stepState, downloadState } from "../../../atoms/atoms";
import Image from "next/image";
import Modal from "../common/Modal";
import Product_buy_check from "../common/Product_buy_check";
import dynamic from "next/dynamic";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import { transition } from "../../../themes/animation/indicate";
// CSRに変更
const Draw = dynamic(() => import("./Draw"), { ssr: false });

type Props = {
  model_names: string[];
  model_colors: {
    [props: string]: any;
  };
  type_index: number;
  select_device: string;
  color_index: string;
  setColor: Dispatch<SetStateAction<string>>;
};

const Case_view = ({
  model_names,
  select_device,
  type_index,
  model_colors,
  color_index,
  setColor,
}: Props) => {
  const router = useRouter();
  //値段だけでいいかも
  const product_info = useRecoilValue(productState);
  const step = useRecoilValue(stepState);
  const download = useRecoilValue(downloadState);
  const [downloadPath, setDownloadPath] = useState("");
  const control = useAnimation()

  useEffect(() => {
    setColor(model_colors[model_names[type_index] + "(1)"]);
    // console.log(model_colors);
    // console.log(model_names);
  }, [type_index, select_device]);
  // console.log(product_info);
  // console.log(iPhone_colors);
  // console.log(types);
  useEffect(()=>{
    control.start({width:"36.6vw"})
  },[step])

  return (
    //  ケース表示のエリア
    <div id={styles.case_view}>
          {/* 手書きかどうか */}
          {step === 4 ? (
            <Draw
              setDownloadPath={setDownloadPath}
              image_path={`/${select_device}/${model_names[type_index]}/${color_index}.png`}
            />
          ) : (
            <motion.div animate={control} key={"view"}>
            <Image
              src={`/${select_device}/${model_names[type_index]}/${color_index}.png`}
              alt="スマホ"
              width={500}
              height={579}
              objectFit="contain"
              key={step}
            />
          </motion.div>
          )}
          {/* デザインが選ばれているとき */}
          {product_info.product_place && (
            <div className={styles.design}>
              <Image
                src={`/design/${product_info.product_place}`}
                alt="スマホ"
                width={500}
                height={579}
              />
            </div>
          )}
      <Modal>
        <Product_buy_check
          image_path={
            download
              ? downloadPath
              : `/${select_device}/${model_names[type_index]}/${color_index}.png`
          }
          design_path={`/design/${product_info.product_place}`}
          type_name={model_names[type_index]}
          color_name={color_index}
          product_price={product_info.m_product_price}
        />
      </Modal>
    </div>
  );
};
export default React.memo(Case_view);
