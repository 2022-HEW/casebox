import { NextPage } from "next";
import React, { useState } from "react";
import App_header from "../../components/common/App_header";
import styles from "../../styles/app/common/app_text.module.css";

const app_terms: NextPage = () => {
  return (
    <div className={styles.container}>
      <App_header label="利用規約" />
      <div className={styles.textBox}>
        <p>
          この利用規約（以下，「本規約」といいます。）は，CASEBOX（以下，「当社」といいます。）がこのウェブサイト上で提供するサービス（以下，「本サービス」といいます。）の利用条件を定めるものです。登録ユーザーの皆さま（以下，「ユーザー」といいます。）には，本規約に従って，本サービスをご利用いただきます。
        </p>
      </div>
    </div>
  );
};

export default app_terms;
