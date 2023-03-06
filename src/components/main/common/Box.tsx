import styles from "../../../styles/box.module.css";
import { ReactNode, RefObject, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { downloadState, modalState } from "../../../atoms/atoms";
import Image from "next/image";

type Box = {
  children: ReactNode;
  pay?: string;
  handleEnded?: (videoRef: RefObject<HTMLVideoElement>) => void;
};

const Box = ({ children, pay, handleEnded }: Box) => {
  // 開きっぱなしのモーダルを閉じる
  const [modal, setModal] = useRecoilState(modalState);
  const videoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();
  const handleTap = () => {
    const audio = new Audio("/audio/tap.mp3");
    audio.play();
    // audio.currentTime = 50 // 経過時間を50秒にする
  };

  const TIMEOUT = 900000; // 5秒後にページを遷移する

  const timeoutRef = useRef<NodeJS.Timeout>();

  const handleResetTimeout = () => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      router.push("/"); // ページを遷移する
    }, TIMEOUT);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (pay === "現金") {
        videoRef.current?.play();
      }
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, [pay]);

  useEffect(() => {
    if (modal) {
      setModal(false);
    }

    const eventListener = () => {
      handleResetTimeout();
    };

    window.addEventListener("click", eventListener); // ここでは、クリックイベントを監視する例としていますが、他のイベントでも構いません

    // コンポーネントがアンマウントされるときに、イベントリスナーを解除する
    return () => {
      window.removeEventListener("click", eventListener);
      clearTimeout(timeoutRef.current);
    };
  }, []);

  useEffect(() => {
    handleResetTimeout();
  }, []); // このuseEffectはマウント時に実行され、初期化に必要な処理を実行します

  return (
    <>
      <div id={styles.box} onTouchEnd={handleTap}>
        <div id={styles.screen_on}>{children}</div>
        <div id={styles.side}>
          {pay === "現金" && handleEnded ? (
            <video
              src={"/movie/buy.mp4"}
              width={268}
              height={1000}
              ref={videoRef}
              onEnded={() => handleEnded(videoRef)}
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
    </>
  );
};

export default Box;
