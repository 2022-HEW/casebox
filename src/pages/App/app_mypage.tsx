import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button } from "../../components/app/common/App_button";
import App_nav from "../../components/app/common/App_nav";
import Image from "next/image";
import Link from "next/link";
import { useRecoilValue } from "recoil";
import { profileState, productState } from "../../atoms/app_atoms";
import { NextPage } from "next";
import { App_productBox } from "../../components/app/common/App_product_box";
import useSWR from "swr";
import useEffectCustom from "../../Hooks/common/useEffectCustom";
import { useRouter } from "next/router";
import { Product } from "../../types";
import { fetcher } from "../../utils";
import App_header from "../../components/app/common/App_header";
import styles from "../../styles/app/app_mypage.module.css";

const app_profile: NextPage = () => {
  // console.log(user_id);
  const router = useRouter();
  const { user_id } = useRecoilValue(profileState);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    if (!user_id) {
      router.back();
    }
  }, []);
  return mounted ? (
    <div className={styles.container}>
      <App_nav pageName="mypage" />
      <App_header label="マイページ" />
      {/* <Link href={"./app_profile_edit"}>
            <div>プロフィール編集</div>
          </Link> */}
      <ProfileHeader />
    </div>
  ) : (
    <></>
  );
};
const ProfileHeader = () => {
  const [product, setProduct] = useState([]);
  const { user_id } = useRecoilValue(profileState);

  // const { data } = useSWR<any>(`/api/app_sql?sql=template&&where=p.user_id="${user_id}"`,fetcher)
  const [select, setSelect] = useState("my");
  // ユーザーが作った商品を取得
  const useCreated = () => {
    const { data } = useSWR<any>(
      `/api/app_sql?sql=template&&where=p.user_id="${user_id}"`,
      fetcher
    );
    return {
      created: data,
    };
  };

  // ユーザーがいいねした商品を取得
  const useFavorite = () => {
    const { data } = useSWR<any>(
      `/api/app_sql?sql=favorite&&user_id=${user_id}`,
      fetcher
    );
    return {
      liked: data,
    };
  };

  const { created } = useCreated();
  const { liked } = useFavorite();
  // 初回
  useEffectCustom(() => {
    if (select === "my") {
      // console.log(created);
      setProduct(created);
    }
  }, [created]);
  useEffect(() => {
    if (select === "my") {
      if (created) {
        setProduct(created);
        // console.log(created);
      }
    } else {
      if (liked) {
        setProduct(liked);
        // console.log(liked);
      }
    }
    // console.log(data);
  }, [select]);

  return (
    <>
      <ProfileInfo />
      <ProfileButton select={select} setSelect={setSelect} />
      {product.map((product: Product, index: number) => (
          <App_productBox
            product_place={product.product_place}
            product_name={product.product_name}
            m_product_category={product.m_product_category}
            m_product_price={product.m_product_price}
            key={product.product_ID}
            product_ID={product.product_ID}
            product_user_id={product.user_id}
            product_situation={product.product_situation}
            user_name={product.user_name}
            product_liked={product.product_liked}
          />
      ))}
    </>
  );
};

const ProfileInfo = () => {
  const { user_image, user_name, user_comment } = useRecoilValue(profileState);
  return (
    <div className={styles.info_container}>
      <Link href="./app_profile_edit">
        <div>
          <div className={styles.edit}>
            <Image
              src={"/app/mypage/edit.svg"}
              width={30}
              height={30}
              alt={"edit"}
            />
          </div>
          <div className={styles.icon}>
            <Image src={user_image} width={200} height={200} alt="icon" />
          </div>
        </div>
      </Link>
      <div className={styles.text_info}>
        <h2>{user_name}</h2>
        <p>{user_comment}</p>
      </div>
    </div>
  );
};
type ProfileButton = {
  select: string;
  setSelect: Dispatch<SetStateAction<string>>;
};
const ProfileButton = ({ select, setSelect }: ProfileButton) => {
  return (
    <div className={styles.btn_container}>
      <Button
        label="マイデザイン"
        onClick={(e) => setSelect(e.currentTarget.id)}
        id={"my"}
        style={
          select === "my"
            ? { width: "36vw", height: "5vh", padding: "0", fontSize: "0.9rem" }
            : {
                background: "#f1f1f1",
                color: "#444",
                width: "36vw",
                height: "5vh",
                padding: "0",
                fontSize: "0.9rem",
              }
        }
      />
      <div className={styles.spacer}></div>
      <Button
        label="いいね"
        onClick={(e) => setSelect(e.currentTarget.id)}
        id={"like"}
        style={
          select === "like"
            ? { width: "36vw", height: "5vh", padding: "0", fontSize: "0.9rem" }
            : {
                background: "#f1f1f1",
                color: "#444",
                width: "36vw",
                height: "5vh",
                padding: "0",
                fontSize: "0.9rem",
              }
        }
      />
    </div>
  );
};
export default app_profile;
