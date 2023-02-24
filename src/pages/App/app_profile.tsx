import React, { useEffect, useState } from "react";
import { Button } from "../../components/app/common/App_button";
import App_nav from "../../components/app/common/App_nav";
import Image from "next/image";
import Link from "next/link";
import { useRecoilState, useRecoilValue } from "recoil";
import { profileState, productState } from "../../atoms/app_atoms";
import useSWR from "swr";
import { useRouter } from "next/router";
import { fetcher } from "../../utils";
import styles from "../../styles/app_profile.module.css";
import { NextPage } from "next";

type NewsRecord = {
  date: string;
  category: string;
  title: string;
};

type SupportRecord = {
  title: string;
  href: string;
};

const app_profile: NextPage = () => {
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
  if (!data) return <></>;

  const handleClickLogout = async () => {
    setProfile({});
    await fetch(`/api/app_sql?sql=logout&&loginID=${data[0]["MAX(loginID)"]}`);
  };
  return mounted ? (
    <div className={styles.container}>
      <LoginBox />
      <News />
      <Support />
      {user_id && <Button label="ログアウト" onClick={handleClickLogout} />}
      <App_nav pageName="mypage" />
    </div>
  ) : (
    <></>
  );
};

const LoginBox = () => {
  const { user_id, user_name } = useRecoilValue(profileState);
  return (
    <div className={styles.login_box}>
      <h2 className={styles.name}>
        {user_id ? user_name : "ゲスト"}
        <span className={styles.sama}>様</span>
      </h2>
      <div className={styles.loginbutton}>
        <Link href={user_id ? "./app_mypage" : "./app_login"}>
          <Button
            label={user_id ? "プロフィールを見る" : "ログイン・会員登録"}
            style={user_id ? { background: "#23ABDD" } : { background: "#666" }}
          />
        </Link>
      </div>
    </div>
  );
};

const News = () => {
  return (
    <div>
      <h3 className={styles.guide}>お知らせ</h3>
      <div className={styles.guidelink}>
        <NewsRecord
          date={"2023.02.23"}
          category={"カテゴリ"}
          title={"BTSコラボを開始しました。"}
        />
      </div>
      <div className={styles.guidelink}>
        <NewsRecord
          date={"2023.01.10"}
          category={"カテゴリ"}
          title={"不具合のお知らせ。"}
        />
      </div>
      <div className={styles.guidelink}>
        <NewsRecord
          date={"2022.12.30"}
          category={"カテゴリ"}
          title={"10%OFFキャンペーンについて。"}
        />
      </div>
      <div className={styles.guidelink}>
        <NewsRecord
          date={"2022.12.11"}
          category={"カテゴリ"}
          title={"CASEBOXがリリースされました！"}
        />
      </div>
    </div>
  );
};

const Support = () => {
  return (
    <div>
      <h3 className={styles.guide}>サポート</h3>
      <div>
        <SupportRecord title={"ヘルプ・よくある質問"} href={"./app_help"} />
        <SupportRecord title={"利用規約"} href={"./app_terms"} />
        <SupportRecord
          title={"プライバシーポリシー"}
          href={"./app_ privacy_policy"}
        />
      </div>
    </div>
  );
};

const NewsRecord = ({ date, category, title }: NewsRecord) => {
  return (
    <div>
      <li className={styles.date}>{date}</li>
      <li className={styles.category}>{category}</li>
      <li className={styles.title}>
        <span className={styles.notice_detail}>{title}</span>
      </li>
      <Image src={""} width={10} height={10} />
    </div>
  );
};

const SupportRecord = ({ title, href }: SupportRecord) => {
  return (
    <div className={styles.SupportTitle}>
      <Link href={href}>
        <p>{title}</p>
      </Link>
    </div>
  );
};
export default app_profile;
