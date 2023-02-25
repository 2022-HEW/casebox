import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import App_nav from "../../components/app/common/App_nav";
import styles from "../../styles/app/app_category.module.css"

type Card = {
  href: string;
  imagePath: string;
  title: string;
  text: string;
};

const app_category: NextPage = () => {
  return (
    <div className={styles.container}>
      <App_nav pageName="category"/>
      <Card
        imagePath={"/common/template_select.png"}
        title={"テンプレートケース"}
        text={"デザインが既に完成しているケースです。"}
        href={"./app_template"}
      />
      <Card
        imagePath={"/common/original.png"}
        title={"オリジナルケース"}
        text={"写真を自由に入れ、オリジナルのケースを作ることができます。"}
        href={"./app_select_type"}
      />
      <Card
        imagePath={"/common/illust.png"}
        title={"手書きケース"}
        text={"自販機で自分が書いたイラストをケースにすることができます。"}
        href={"./app_tutorial"}
      />
    </div>
  );
};

const Card = ({ href, imagePath, title, text }: Card) => {
  return (
    <Link href={href}>
      <div className={styles.card}>
        <Image width={"400px"} height={"130px"} alt={title} src={imagePath} objectFit="cover" />
        <div>
          <h3>{title}</h3>
          <p>{text}</p>
        </div>
      </div>
    </Link>
  );
};
export default app_category;
