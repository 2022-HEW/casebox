import styles from "../../../styles/device_select.module.css";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { tabState } from "../../../atoms/atoms";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  productState,
  modalState,
  stepState,
  toolState,
  sizeState,
  colorState,
  downloadState,
} from "../../../atoms/atoms";
import React from "react";
import { useRouter } from "next/router";
import { Button } from "../common/Button";
import Image from "next/image";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import { bound, caseEdit, slideLeft } from "../../../themes/animation/indicate";

// import { useRouter } from'next/router'

type Props = {
  setDevice: Dispatch<SetStateAction<string>>;
  setType: Dispatch<SetStateAction<number>>;
  model_names: Array<string>;
  model_colors: {
    [props: string]: any;
  };
  type_index: number;
  select_device: string;
  color_index: string;
  setColor: Dispatch<SetStateAction<string>>;
};

const Case_edit = ({
  setDevice,
  setType,
  model_names,
  model_colors,
  type_index,
  select_device,
  setColor,
  color_index,
}: Props) => {
  // const router = useRouter()
  const [step, setStep] = useRecoilState(stepState);
  const [product, setProduct] = useRecoilState(productState);
  const [modal, setModal] = useRecoilState(modalState);
  const [tool, setTool] = useRecoilState(toolState);
  const [size, setSize] = useRecoilState(sizeState);
  const [drawcolor, setDrawcolor] = useRecoilState(colorState);
  const [download, setDownload] = useRecoilState(downloadState);
  const [colorPallet, setColorPallet] = useState(false);
  const pencil = useAnimation();
  const eraser = useAnimation();

  // 機種を入れる
  useEffect(() => {
    setProduct((before) => ({
      ...before,
      model_id: model_colors[model_names[type_index] + "_id"],
    }));
  }, [model_names[type_index]]);

  // 鉛筆と消しゴムが切り替わったとき
  useEffect(() => {
    if (tool === "eraser") {
      eraser.start({ x: 20 });
      pencil.start({ x: -20 });
    } else {
      eraser.start({ x: -20 });
    }
  });

  /**
   * step1
   * @returns
   */

  const Device = () => {
    //戻るボタンの耐対策
    // if(type_index){
    //     setType(0)
    //     console.log("type_index" +  type_index);
    // }
    return (
      <>
        <h1>商品</h1>
        <div className={styles.tryangle}>
          <Image src={"/image/tryangle.svg"} width={50} height={50} />
        </div>
        <p>デバイスをお選びください</p>
        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          <motion.label
            htmlFor="Android"
            className={styles.type}
            whileTap={{ scale: 0.9 }}
          >
            <Image src={"/image/android.svg"} width={150} height={150} />
            <span className={styles.type_name}>Android</span>
          </motion.label>
          <input
            type="radio"
            value="Android"
            name="device"
            id="Android"
            onChange={(e) => setDevice(e.target.value)}
          />
          <motion.label
            htmlFor="iPhone"
            className={styles.type}
            whileTap={{ scale: 0.9 }}
          >
            <Image src={"/image/android.svg"} width={150} height={150} />
            <span className={styles.type_name}>iPhone</span>
          </motion.label>
          <input
            type="radio"
            value="iPhone"
            name="device"
            id="iPhone"
            onChange={(e) => setDevice(e.target.value)}
          />
        </div>
        <div className={styles.button}>
          <Button
            onClick={() => {
              setStep(2);
            }}
            label="次へ"
            situ_name="screen"
          />
        </div>
      </>
    );
  };

  /**
   * step2
   * @returns
   */
  const Type = () => {
    // console.log(select_device);
    return (
      <>
        <h1>商品</h1>
        <div className={styles.tryangle}>
          <Image src={"/image/tryangle.svg"} width={50} height={50} />
        </div>
        <p>機種をお選びください</p>
        <div className={styles.type_list}>
        {model_names.map((value, index) => {
          return (
            <div key={index} className={styles.list}>
              <motion.label
                htmlFor={value}
                whileTap={{
                  // backgroundColor: ['hsl(0, 100, 50)', 'hsl(-120, 100, 50)']
                  color: "hsl(255, 0, 255)",
                }}
              >
                {value}
              </motion.label>
              <input
                type="radio"
                value={index}
                name={value}
                id={value}
                onChange={(e) => setType(Number(e.target.value))}
              />
            </div>
          );
        })}
        </div>
        <div className={styles.button}>
          <Button onClick={() => setStep(3)} label="次へ" situ_name="screen" />
        </div>
      </>
    );
  };

  /**
   * step3
   * @returns
   */
  const Color = () => {
    return (
      <>
        <h1>商品</h1>
        <div className={styles.tryangle}>
          <Image src={"/image/tryangle.svg"} width={50} height={50} />
        </div>
        <p>カラーをお選びください</p>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            padding:"0 11.15%"
          }}
        >
          
          {Object.keys(model_colors).map((value: any, index) => {
            // console.log(value);

            // console.log(product);
            // console.log(model_colors);
            // console.log();

            if (
              value.includes(`${model_names[type_index]}(`) &&
              !value.includes("_code")
            ) {
              return (
                <div key={value}>
                  <motion.div
                    className={styles.color_select}
                    whileTap={{ scale: 0.9 }}
                  >
                    <label
                      htmlFor={value}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <div
                        className={styles.color_view}
                        style={{
                          background: `${model_colors[value + "_code"]}`,
                        }}
                      ></div>
                      {model_colors[value]}
                    </label>
                    <input
                      type="radio"
                      value={model_colors[value]}
                      name={value}
                      id={value}
                      onChange={(e) => setColor(e.target.value)}
                    />
                  </motion.div>
                 
                </div>
              );
            }
          })}
        </div>
        <div className={styles.button}>
          <Button
            onClick={() => {
              product.product_place === "" ? setStep(4) : setDownload(true);
            }}
            label="次へ"
            situ_name="screen"
          />
        </div>
      </>
    );
  };
  /**
   * step4
   */
  const Draw_edit = () => {
    return (
      <>
        <h1>商品</h1>
        <div className={styles.tryangle}>
          <Image src={"/image/tryangle.svg"} width={50} height={50} />
        </div>
        <div className={styles.draw_edit_box}>
          <div className={styles.tool_box}>
            <div
              className={styles.color_frame}
              style={{ display: "flex" }}
              onClick={() => {
                setColorPallet(!colorPallet);
              }}
            >
              <div
                className={styles.color_trigger}
                style={{ background: drawcolor }}
              ></div>
              <p className={styles.serv_guide}>カラー</p>
            </div>
            <div className={styles.color_frame} style={{ display: "flex" }}>
              <label
                className={styles.label1}
                style={size === 10 ? { background: "#777" } : {}}
              >
                <input
                  type="radio"
                  id="small"
                  name="weight"
                  className={styles.weight}
                  value={10}
                  onChange={(e) => {
                    setSize(Number(e.target.value));
                  }}
                />
              </label>
              <label
                className={styles.label2}
                style={size === 20 ? { background: "#777" } : {}}
              >
                <input
                  type="radio"
                  id="normal"
                  name="weight"
                  className={styles.weight}
                  value={20}
                  onChange={(e) => {
                    setSize(Number(e.target.value));
                  }}
                />
              </label>
              <label
                className={styles.label3}
                style={size === 30 ? { background: "#777" } : {}}
              >
                <input
                  type="radio"
                  id="bold"
                  name="weight"
                  className={styles.weight}
                  value={30}
                  onChange={(e) => {
                    setSize(Number(e.target.value));
                  }}
                />
              </label>
              <p className={styles.serv_guide}>太さ</p>
            </div>
            <div className={styles.line}></div>

            <div
              onClick={() => {
                setTool("pen");
              }}
              className={styles.color_frame}
              style={{ display: "flex" }}
            >
              <motion.img
                src="/material_provision/pencil_select.png"
                alt="鉛筆"
                className={styles.pencil_select_img}
                animate={pencil}
              />
              <p className={styles.serv_guide}>えんぴつ</p>
            </div>
            <div
              onClick={() => {
                setTool("eraser");
              }}
              className={styles.color_frame}
              style={{ display: "flex" }}
            >
              <motion.img
                src="/material_provision/eraser.png"
                alt="消しゴム"
                className={styles.eraser_select_img}
                animate={eraser}
              />
              <p className={styles.serv_guide}>消しゴム</p>
            </div>
          </div>
          <ColorPallet />
          <div className={styles.button}>
            <Button
              onClick={() => setDownload(true)}
              label="次へ"
              situ_name="screen"
            />
          </div>
        </div>
      </>
    );
  };

  const ColorPallet = () => {
    const colors = [
      "#000",
      "#FF7C7C",
      "#FFCA7A",
      "#FCFF7D",
      "#F1FF9A",
      "#FFCA7A",
      "#FCFF7D",
      "#F1FF9A",
      "#A1FF81",
      "#95FFF9",
      "#52B576",
      "#8BC7FF",
      "#B479FF",
      "#FC7BFF",
      "#FFBEED",
      "#F9F0C5",
      "#999999",
      "#EBEBEB",
    ];

    return (
      <div className={styles.color_pallet}>
        {colors.map((value: string, index: number) => {
          return (
            <div key={index}>
              <label
                style={{ background: `${value}` }}
                className={styles.color_category}
              >
                　
                <input
                  type="radio"
                  name="color"
                  value={value}
                  id={`${index}`}
                  onChange={(e) => setDrawcolor(e.target.value)}
                />
                {index === 8 && <br />}
              </label>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    //  デバイスを選択するエリア(コンポーネントに分ける)
    <AnimatePresence mode="wait">
      {step === 1 ? (
        <motion.div key="device" {...caseEdit} id={styles.case_edit}>
          <Device />
        </motion.div>
      ) : step === 2 ? (
        <motion.div key="type" {...caseEdit} id={styles.case_edit}>
          <Type />
        </motion.div>
      ) : step === 3 ? (
        <motion.div key="color" {...caseEdit} id={styles.case_edit}>
          <Color />
        </motion.div>
      ) : (
        <motion.div key="draw" {...caseEdit} id={styles.case_edit}>
          <Draw_edit />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default React.memo(Case_edit);
