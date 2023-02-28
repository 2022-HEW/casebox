import styles from "../../../styles/box.module.css";
import { ReactNode, useEffect } from "react";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { modalState } from "../../../atoms/atoms";
import Image from "next/image";

type Box = {
  children: ReactNode;
  pay?: string;
};

const Box = ({ children, pay }: Box) => {
  // 開きっぱなしのモーダルを閉じる
  const [modal, setModal] = useRecoilState(modalState);
  const handleTap = () => {
    const audio = new Audio("/audio/tap.mp3");
    audio.play();
    // audio.currentTime = 50 // 経過時間を50秒にする
  };
  useEffect(() => {
    if (modal) {
      setModal(false);
    }
  }, []);

  return (
      <div id={styles.box} onTouchEnd={handleTap}>
        <div id={styles.screen_on}>{children}</div>
        <div id={styles.side}>
          {pay === "現金" ? (
            <Image
              src={"/Box/Box.gif"}
              width={100}
              height={1000}
              alt={"side"}
            />
          ) : (
            <Image
              src={"/Box/side.png"}
              width={100}
              height={1000}
              alt={"side"}
              objectFit="cover"
            />
          )}
        </div>
      </div>
  );
};

export default Box;
