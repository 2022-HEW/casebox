import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import App_nav from "../../components/common/App_nav";

type Card = {
  href: string;
  imagePath: string;
  title: string;
  text: string;
};

const app_category: NextPage = () => {
  return (
    <div>
      <App_nav />
      <Card
        imagePath={"/service_select/template_select.png"}
        title={"テンプレートケース"}
        text={"デザインが既に完成しているケースです。"}
        href={"./app_template"}
      />
      <Card
        imagePath={"/service_select/template_select.png"}
        title={"オリジナルケース"}
        text={"写真を自由に入れ、オリジナルのケースを作ることができます"}
        href={"./app_select_type"}
      />
      <Card
        imagePath={"/service_select/template_select.png"}
        title={"手書きケース"}
        text={"自販機で自分が書いたイラストをケースにすることができます。"}
        href={"./app_draw"}
      />
    </div>
  );
};

const Card = ({ href, imagePath, title, text }: Card) => {
  return (
    <Link href={href}>
      <div>
        <Image width={"100px"} height={"100px"} alt={title} src={imagePath} />
        <div>
          <h3>{title}</h3>
          <p>{text}</p>
        </div>
      </div>
    </Link>
  );
};
export default app_category;
