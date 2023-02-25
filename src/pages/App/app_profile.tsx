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
import NEWS from "../../themes/app/news.json";

type NewsRecord = {
  date: string;
  category: string;
  title: string;
  href: number;
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
      {user_id && (
        <div className={styles.logoutbutton}>
          <Button label="ログアウト" onClick={handleClickLogout} />
        </div>
      )}
      <App_nav pageName="mypage" />
    </div>
  ) : (
    <></>
  );
};

const LoginBox = () => {
  const { user_id, user_name } = useRecoilValue(profileState);
  const router = useRouter();

  const handleClickButton = () => {
    if (user_id) {
      router.push({
        pathname: "./app_mypage",
      });
    } else {
      router.push({
        pathname: "./app_login",
      });
    }
  };
  return (
    <div className={styles.login_box}>
      <h2 className={styles.name}>
        {user_id ? user_name : "ゲスト"}
        <span className={styles.sama}>様</span>
      </h2>
      <div className={styles.loginbutton}>
        <Button
          label={user_id ? "プロフィールを見る" : "ログイン・会員登録"}
          style={
            user_id
              ? { background: "#23ABDD", fontSize: "1.05rem", height: "53px" }
              : { background: "#666", fontSize: "1.05rem", height: "53px" }
          }
          onClick={handleClickButton}
        />
      </div>
    </div>
  );
};

const News = () => {
  return (
    <div>
      <h3 className={styles.guide}>お知らせ</h3>
      {NEWS.map((value, index) => (
        <div className={styles.guidelink} key={index}>
          <NewsRecord
            date={value.date}
            category={value.category}
            title={value.title}
            href={index}
          />
        </div>
      ))}
    </div>
  );
};

const Support = () => {
  return (
    <div>
      <h3 className={styles.guide}>サポート</h3>
      <div className={styles.support_records}>
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

const NewsRecord = ({ date, category, title, href }: NewsRecord) => {
  return (
    <Link href={`/App/app_news?id=${href}`}>
      <div>
        <li className={styles.date}>{date}</li>
        <li className={styles.category}>{category}</li>
        <li className={styles.title}>
          <span className={styles.notice_detail}>{title}</span>
          <span className={styles.right} id={styles.news}>
            <Image
              src={"/common/right.png"}
              width={15}
              height={15}
              objectFit="contain"
            />
          </span>
        </li>
      </div>
    </Link>
  );
};

const SupportRecord = ({ title, href }: SupportRecord) => {
  return (
    <Link href={href}>
      <div className={styles.SupportTitle}>
        <>
          <span className={styles.notice_detail}>{title}</span>
          <span className={styles.right}>
            <Image
              src={"/common/right.png"}
              width={15}
              height={15}
              objectFit="contain"
            />
          </span>
        </>
      </div>
    </Link>
  );
};
export default app_profile;
