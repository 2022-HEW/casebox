import React from "react";
import App_nav from "../../components/app/common/App_nav";
import Image from "next/image";
import styles from "../../styles/app_service_select.module.css";
import Link from "next/link";
import { NextPage } from "next";

const app_service_select: NextPage = () => {
  return (
    <div className={styles.container}>
      <div style={{position:"relative",right:"20px"}}>
        <App_nav pageName="home"/>
      </div>
      <div className={styles.event}>
        <Image src="/app/service_select/event.svg" width={500} height={500} />
      </div>
      <Column title={"CASEBOXについて"} />
      <Footer />
    </div>
  );
};

type Column = {
  title: string;
};
type Card = {
  title: string;
  src: string;
  url: string;
};
const Column = ({ title }: Column) => {
  return (
    <div className={styles.box}>
      <h3>{title}</h3>
      <div className={styles.cards}>
        <Card
          title={"ヘルプ"}
          src={"/app/service_select/logo.png"}
          url={"./app_help"}
        />
        <Card
          title={"スキャン"}
          src={"/app/service_select/box.png"}
          url={"./app_tutorial?situ=box_tutorial"}
        />
      </div>
    </div>
  );
};

const Card = ({ title, src, url }: Card) => {
  return (
    <Link href={url}>
      <div className={styles.service_card}>
        <Image src={src} width={60} height={60} />
        <p>{title}</p>
      </div>
    </Link>
  );
};

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Link href={"/App/app_terms"}>利用規約</Link>
      <span>|</span>
      <Link href={"/App/app_privacy_policy"}>プライバシーポリシー</Link>
    </footer>
  );
};
export default app_service_select;
