import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button } from "../../components/common/App_button";
import App_nav from "../../components/common/App_nav";
import Image from "next/image";
import Link from "next/link";
import { useRecoilState, useRecoilValue } from "recoil";
import { profileState, productState } from "../../atoms/app_atoms";
import { NextPage } from "next";
import { App_productBox } from "../../components/common/App_product_box";
import useSWR from "swr";
import useEffectCustom from "../../components/common/useEffectCustom";
import { useRouter } from "next/router";
import { Product } from "../../types";
import { fetcher } from "../../utils";
import App_header from "../../components/common/App_header";
type NewsRecord = {
  date: string;
  category: string;
  title: string;
};

type SupportRecord = {
  title: string;
  href: string;
};

const app_profile = () => {
  // console.log(user_id);
  const router = useRouter();
  const { user_id } = useRecoilValue(profileState);
  const [profile, setProfile] = useRecoilState(profileState);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const { data, error } = useSWR<any>(
    `/api/app_sql?sql=logintime&&user_id=${profile.user_id}`,
    fetcher
  );
  useEffect(() => {
    if(data){
        console.log(data);
        console.log(data[0]["MAX(loginID)"]);
    }
  }, [data]);
  if (!data) return <></>;
 
  const handleClickLogout = async () => {
    setProfile({});
    await fetch(`/api/app_sql?sql=logout&&loginID=${data[0]["MAX(loginID)"]}`);
  };
  return (
    mounted && (
      <>
        <LoginBox />
        <News />
        <Support />
        {user_id && <Button label="ログアウト" onClick={handleClickLogout} />}
        <App_nav />
      </>
    )
  );
};

// 非ログイン時
const LoginBox = () => {
  const { user_id, user_name } = useRecoilValue(profileState);
  return (
    <div>
      <h2>
        {user_id ? user_name : "ゲスト"}
        <span>様</span>
      </h2>
      <Link href={user_id ? "./app_mypage" : "./app_login"}>
        <Button label={user_id ? "プロフィールを見る" : "ログイン・会員登録"} />
      </Link>
    </div>
  );
};

const News = () => {
  return (
    <div>
      <h3>お知らせ</h3>
      <div>
        <NewsRecord
          date={"2002.11.11"}
          category={"カテゴリ"}
          title={"タイトル"}
        />
      </div>
    </div>
  );
};

const Support = () => {
  return (
    <div>
      <h3>サポート</h3>
      <div>
        <SupportRecord title={"ヘルプ・よくある質問"} href={""} />
        <SupportRecord title={"利用規約"} href={""} />
        <SupportRecord title={"プライバシーポリシー"} href={""} />
      </div>
    </div>
  );
};

const NewsRecord = ({ date, category, title }: NewsRecord) => {
  return (
    <div>
      <p>{date}</p>
      <p>{category}</p>
      <p>{title}</p>
      <Image src={""} width={10} height={10} />
    </div>
  );
};

const SupportRecord = ({ title, href }: SupportRecord) => {
  return (
    <div>
      <Link href={href}>
        <p>{title}</p>
      </Link>
    </div>
  );
};
export default app_profile;
