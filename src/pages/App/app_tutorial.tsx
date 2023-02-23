import { width } from "@mui/system";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import App_header from "../../components/app/common/App_header";
import styles from"../../styles/app/app_tutorial.module.css"

const tutorial: NextPage = () => {
  const router = useRouter()

  return (
    <div className={styles.container}>
      <App_header label="手書きチュートリアル"/>
      <div className={styles.video}>
        <video src={`/app/video/${router.query}.mp3`} autoPlay/>
      </div>
    </div>
  );
};
export default tutorial;
