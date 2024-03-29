import Nav from "../../components/main/common/Nav";
import Box from "../../components/main/common/Box";
import styles from "../../styles/pay.module.css";
import Image from "next/image";
import Cash from "/public/image/money.svg";
import trafic from "/public/image/t_money.svg";
import electric from "/public/image/e_money.svg";
import other from "/public/image/other_money.svg";
import ID from "/public/image/ID.svg";
import QuicPay from "/public/image/QuicPay.svg";
import Edy from "/public/image/Edy.svg";
import { useRecoilValue, useRecoilState } from "recoil";
import { productState, modalState, downloadState } from "../../atoms/atoms";
import { RefObject, useEffect, useState } from "react";
import React from "react";
import Modal from "../../components/main/common/Modal";
import Other from "../../components/main/pay/Other";
import Touch from "../../components/main/pay/Touch";
import { useRouter } from "next/router";
import { NextPage } from "next";
import { handleSpeech } from "../../utils";
import { Button } from "../../components/main/common/Button";

const pay: NextPage = () => {
  // 今までの情報をリセット

  interface btn_props {
    imgPath: string;
    name: string;
  }
  const [pay, setPay] = useState("");
  const [modal, setModal] = useRecoilState(modalState);
  const { m_product_price, } = useRecoilValue(productState);
  const [coins, setCoins] = useState(0);
  const router = useRouter();
  const [download, setDownload] = useRecoilState(downloadState);
  const [loopCount, setLoopCount] = useState(0);

  const handlePay = (name: string) => {
    setPay(name);
    if (name !== "現金") {
      setModal(true);
    }
  };

  const handleClickPay=()=>{
    router.push({
      pathname:"./thankyou"
    })
  } 

  const handleEnded = (videoRef:RefObject<HTMLVideoElement>) => {
    
    const count = m_product_price/1000 -1
    setCoins(coins+1000);
    if (loopCount < count) {
      videoRef.current?.play();
      setLoopCount(loopCount + 1);
    }
  };


  // useEffect(() => {
  //   if (!download) {
  //     router.push({
  //       pathname: "./service_select",
  //     });
  //   }
  //   setDownload(false);
  // }, []);

  useEffect(() => {
    if (!modal) {
      setPay("");
    }
  }, [modal]);
  // 時間経過で遷移
  useEffect(() => {
    setCoins(0)
    setLoopCount(0)
    switch (pay) {
      case "現金":
        handleSpeech("お金を投入してください");
        // const timer = setTimeout(() => {
        //   router.push({ pathname: "./thankyou" });
        // }, 12000);
        return () => {
          // clearTimeout(timer);
        };
      case "クレジットカード":
        handleSpeech("音がなるまでタッチしてください");
        const creditAudio = new Audio("/audio/credit.mp3");
        const creditTimer = setTimeout(() => {
          creditAudio.play();
          creditAudio.addEventListener("ended", () => {
            clearTimeout(creditTimer);
            router.push({ pathname: "./thankyou" });
          });
        }, 5000);
        return () => {
          clearTimeout(creditTimer);
        };

      case "交通系電子マネー":
        handleSpeech("音がなるまでタッチしてください");
        const TransportationAudio = new Audio("/audio/Transportation.mp3");
        const TransportationTimer = setTimeout(() => {
          TransportationAudio.play();
          TransportationAudio.addEventListener("ended", () => {
            clearTimeout(TransportationTimer);
            router.push({ pathname: "./thankyou" });
          });
        }, 5000);
        return () => {
          clearTimeout(TransportationTimer);
        };
      case "QuicPay":
        handleSpeech("音がなるまでタッチしてください");
        const QuicPayAudio = new Audio("/audio/QUICPay.mp3");
        const QuicPayTimer = setTimeout(() => {
          QuicPayAudio.play();
          QuicPayAudio.addEventListener("ended", () => {
            clearTimeout(QuicPayTimer);
            router.push({ pathname: "./thankyou" });
          });
        }, 5000);
        return () => {
          clearTimeout(QuicPayTimer);
        };
      case "ID":
        handleSpeech("音がなるまでタッチしてください");
        const IDAudio = new Audio("/audio/ID.mp3");
        const IDTimer = setTimeout(() => {
          IDAudio.play();
          IDAudio.addEventListener("ended", () => {
            clearTimeout(IDTimer);
            router.push({ pathname: "./thankyou" });
          });
        }, 5000);
        return () => {
          clearTimeout(IDTimer);
        };
      case "Edy":
        handleSpeech("音がなるまでタッチしてください");
        const EdyAudio = new Audio("/audio/edy.mp3");
        const EdyTimer = setTimeout(() => {
          EdyAudio.play();
          EdyAudio.addEventListener("ended", () => {
            clearTimeout(EdyTimer);
            router.push({ pathname: "./thankyou" });
          });
        }, 5000);
        return () => {
          clearTimeout(EdyTimer);
        };
      default:
        break;
    }
  }, [pay]);

  const Buttons = ({ imgPath, name }: btn_props) => {
    return (
      <div
        className={pay === name ? styles.payType_a : styles.payType}
        onClick={() => handlePay(name)}
      >
        <div className={styles.btnContent}>
          <Image src={imgPath} alt={name} id={styles.image} />
          <p id={styles.btnname}>{name}</p>
        </div>
      </div>
    );
  };

  return (
    <Box pay={pay} handleEnded={handleEnded}>
      <Nav>
        <div id={styles.wrap}>
          <Price_result
            id={styles.price}
            write="支払額"
            price={m_product_price}
          />
          <Price_result id={styles.payed} write="投入額" price={coins} />
          <Price_result id={styles.back} write="おつり" price={coins - m_product_price>0?coins - m_product_price:0} />
          <div className={styles.calculate}>
            {coins -m_product_price >=0 &&
            <Button label="支払確定" situ_name="" style={{width:"200px"}} onClick={handleClickPay}/>
            }
          </div>
          <div className={styles.buttons}>
            <Buttons imgPath={Cash} name="現金" />
            <Buttons imgPath={trafic} name="クレジットカード" />
            <Buttons imgPath={electric} name="交通系電子マネー" />
            <Buttons imgPath={other} name="その他" />
          </div>
        </div>
        <Modal>
          {pay === "その他" ||
          pay === "ID" ||
          pay == "QuicPay" ||
          pay == "Edy" ? (
            <Other pay={pay}>
              <Buttons imgPath={ID} name="ID" />
              <Buttons imgPath={QuicPay} name="QuicPay" />
              <Buttons imgPath={Edy} name="Edy" />
            </Other>
          ) : (
            <Touch pay={pay} />
          )}
        </Modal>
      </Nav>
    </Box>
  );
};

interface pay_props {
  write: string;
  id: string;
  price: number;
}
const Price_result = ({ write, id, price }: pay_props) => {
  return (
    <div className={styles.block2} id={id}>
      <p className={styles.write}>{write}</p>
      <p className={styles.money}>{price}</p>
      <p className={styles.en}>円</p>
    </div>
  );
};

export default pay;
