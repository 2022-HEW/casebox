import { width } from "@mui/system";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import App_header from "../../components/app/common/App_header";
import styles from "../../styles/app/app_tutorial.module.css";

const tutorial: NextPage = () => {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <App_header label="手書きチュートリアル" />
      <div>
        <video
          className={styles.video}
          src={
            router.query.situ
              ? `/movie/${router.query.situ}.mp4`
              : `/movie/app_draw_tutorial.mp4`
          }
          controls
          style={{ width: "100%" }}
        />
      </div>
    </div>
  );
};
export default tutorial;
