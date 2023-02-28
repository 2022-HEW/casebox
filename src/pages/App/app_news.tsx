import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import App_header from "../../components/app/common/App_header";
import styles from "../../styles/app/app_news.module.css";
import NEWS from "../../themes/app/news.json";

const app_news: NextPage = () => {
  const router = useRouter();
  const theNEWS = NEWS[Number(router.query.id)];

  return (
    <div className={styles.container}>
      <App_header label="お知らせ" />
      <div className={styles.news_container}>
      <div className={styles.title}>{theNEWS.title}</div>
      <div className={styles.date}>{theNEWS.date}</div>
      <div style={{ whiteSpace: 'pre-wrap' }} className={styles.value}>{theNEWS.value}</div>
      </div>
    </div>
  );
};
export default app_news;
