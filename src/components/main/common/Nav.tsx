import styles from "../../../styles/nav.module.css";
import { useRouter } from "next/router";
import Link from "next/link";
import { ReactNode, useState, useMemo, useRef, Dispatch } from "react";
import { SetterOrUpdater, useRecoilState, useRecoilValue } from "recoil";
import {
  productState,
  tabState,
  stepState,
  modalState,
  designState,
  imageState,
} from "../../../atoms/atoms";
import { useEffect } from "react";
import { log } from "console";
import React from "react";
import { Button } from "../../common/Button";

type Props = {
  children: ReactNode;
};

type Tab_type = {
  site_link: string;
  site_name: string;
  setModal: SetterOrUpdater<boolean>;
};

const Nav = ({ children }: Props) => {
  const router = useRouter();
  const [tab, setTab] = useRecoilState(tabState);
  const [product, setProduct] = useRecoilState(productState);
  const [step, setStep] = useRecoilState(stepState);
  const [modal, setModal] = useRecoilState(modalState);
  const [design, setDesign] = useRecoilState(designState);
  const [image, setImage] = useRecoilState(imageState);

  //オリジナル情報をリセット
  if (image && tab !== "オリジナル") {
    setDesign([]);
    setImage("");
  }

  /**
   * 色は反映されたまま
   */
  const back = () => {
    // modalの戻る
    if (modal) {
      setModal(false);
      return;
    }

    // typeの戻る
    if (router.pathname == "/device_select" && step > 1) {
      setStep(step - 1);
    } else {
      router.back();
    }
  };
  //
  useEffect(() => {
    switch (router.pathname) {
      case "/main/service_select":
        setTab("トップ");
        break;
      case "/main/template_select":
        setTab("テンプレ");
        break;
      case "/main/scan":
        setTab("オリジナル");
        break;
      case "/main/device_select":
        // designが空のとき
        if (product.product_name === "") {
          setTab("手書き");
        }
        break;
      case "/main/site":
        setTab("公式サイト");
        break;
      case "/main/help":
        setTab("ヘルプ");
        break;
      case "/pay":
        break;
      case "/main/originalEdit":
        setTab("オリジナル");
        break;
      default:
        console.log("error");
    }
  }, []);

  // const back = ()=>{

  // }
  // const [tab,setTab] = useState("トップ");

  return (
    <div id={styles.container}>
      <div id={styles.wrapper}>
        {/* <div id={styles.back}>
            <p onClick={back}>戻る</p>
        </div> */}
        <div id={styles.display_box}>
          {/* <img src="./Nav/disp.svg"/> */}
          <div id={styles.disp}>{children}</div>
          <div id={styles.service_select}>
            <Tab
              site_link={"/main/service_select"}
              site_name={"トップ"}
              setModal={setModal}
            />
            <Tab
              site_link={"/main/template_select"}
              site_name={"テンプレ"}
              setModal={setModal}
            />
            <Tab
              site_link={"/main/scan"}
              site_name={"オリジナル"}
              setModal={setModal}
            />
            <Tab
              site_link={"/main/device_select"}
              site_name={"手書き"}
              setModal={setModal}
            />
            <Tab
              site_link={"/main/site"}
              site_name={"公式サイト"}
              setModal={setModal}
            />
            <Tab
              site_link={"/main/help"}
              site_name={"ヘルプ"}
              setModal={setModal}
            />
          </div>
          {/* <div id={styles.back} onClick={back}>もどる</div> */}
          <Button label="もどる" situ_name={"nav"} onClick={back} />
        </div>
      </div>
    </div>
  );
};

const Tab = React.memo(function Memotab({
  site_link,
  site_name,
  setModal,
}: Tab_type) {
  const [tab, setTab] = useRecoilState(tabState);

  return (
    <Link href={site_link} as={site_link} passHref>
      <div
        id={styles.btn}
        className={`${tab === site_name && styles.select}`}
        onClick={() => {
          setTab(site_name);
          setModal(false);
        }}
      >
        {site_name}
      </div>
    </Link>
  );
});

export default Nav;
