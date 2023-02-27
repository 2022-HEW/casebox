import styles from "../../../styles/box.module.css";
import { ReactNode, useEffect } from "react";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { modalState } from "../../../atoms/atoms";
import Image from "next/image";

const Box = ({ children }: { children: ReactNode }) => {
  // 開きっぱなしのモーダルを閉じる
  const [modal, setModal] = useRecoilState(modalState);
  const handleTap=()=>{
    const audio = new Audio("/audio/tap.mp3")
    audio.play()
    // audio.currentTime = 50 // 経過時間を50秒にする
  }
  useEffect(() => {
    if (modal) {
      setModal(false);
    }
  }, []);

  return (
    <>
      <div id={styles.box} onTouchStart={handleTap}>
        <div id={styles.screen_on}>{children}</div>
        <div id={styles.side}>
          <Image
            width={180}
            height={153}
            alt="sideButton"
            src="/Box/touch.svg"
          />
          <div style={{display:"flex",justifyContent:"center",flexDirection:"column",gap:"10px"}}>
            <Image
              width={145}
              height={23}
              alt="sideButton"
              src="/Box/price.svg"
            />
            <Image
              width={180}
              height={55}
              alt="sideButton"
              src="/Box/paperin.svg"
            />
          </div>
          <div id={styles.coin}>
            <Image
              width={90}
              height={60}
              alt="sideButton"
              src="/Box/coindial.svg"
            />
            <Image
              width={90}
              height={60}
              alt="sideButton"
              src="/Box/coinin.svg"
            />
          </div>
          <div id={styles.coin} className={styles.coin_info}>
            <Image
              width={90}
              height={50}
              alt="sideButton"
              src="/Box/dialinfo.svg"
            />
            <Image
              width={90}
              height={50}
              alt="sideButton"
              src="/Box/coininfo.svg"
            />
          </div>
          <Image
            width={180}
            height={200}
            alt="sideButton"
            src="/Box/productout.svg"
          />
        </div>
      </div>
    </>
  );
};

export default Box;
