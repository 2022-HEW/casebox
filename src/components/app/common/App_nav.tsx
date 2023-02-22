import React from "react";
import styles from "../../../styles/app_nav.module.css";
import Link from "next/link";
import Image from "next/image";

type nav={
  pageName?:string
}
const App_nav = ({pageName}:nav) => {

  return (
    <nav className={styles.nav}>
      {/* navの色を変える処理が必要 */}
      <Link href="./app_service_select">
        <div>
          <Image src={pageName==="home"?"/app/nav/selected_home.png":"/app/nav/home.png"} width={30} height={30} objectFit="contain"/>
          <p style={pageName==="home"? {fontWeight:"bold"}:{}}>ホーム</p>
        </div>
      </Link>
      <Link href="./app_search">
        <div>
          <Image src={pageName==="search"?"/app/nav/selected_search.png":"/app/nav/search.png"} width={30} height={30} objectFit="contain"/>
          <p style={pageName==="search"? {fontWeight:"bold"}:{}}>検索</p>
        </div>
      </Link>
      <Link href="./app_category">
        <div>
          <Image src={pageName==="category"?"/app/nav/selected_category.png":"/app/nav/category.png"} width={30} height={30} objectFit="contain"/>
          <p style={pageName==="category"? {fontWeight:"bold"}:{}}>カテゴリ</p>
        </div>
      </Link>
      <Link href="./app_profile">
        <div>
          <Image src={pageName==="mypage"?"/app/nav/selected_mypage.png":"/app/nav/mypage.png"} width={30} height={30} objectFit="contain"/>
          <p style={pageName==="mypage"? {fontWeight:"bold"}:{}}>マイページ</p>
        </div>
      </Link>
    </nav>
  );
};

export default App_nav;
