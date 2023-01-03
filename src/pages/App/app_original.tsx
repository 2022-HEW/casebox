import { NextPage } from "next";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import App_header from "../../components/common/App_header";
import styles from "../../styles/app_original.module.css";
const App_image_edit = dynamic(
  () => import("../../components/App_image_edit"),
  { ssr: false }
);

const app_original: NextPage = () => {
  const [save, setSave] = useState(false);

  const Tool_box = () => {
    return (
      <div className={styles.tool_box}>
        <button onClick={() => setSave(true)}>保存</button>
      </div>
    );
  };

  return (
    <>
      <App_header label="オリジナル" />
      <div className={styles.app_original}>
        <App_image_edit save={save} />
        <Tool_box />
      </div>
    </>
  );
};

export default app_original;
