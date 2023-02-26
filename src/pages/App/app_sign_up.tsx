import { color } from "@mui/system";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { type } from "os";
import React, { useEffect, useRef, useState } from "react";
import useSWR from "swr";
import { Button } from "../../components/app/common/App_button";
import App_header from "../../components/app/common/App_header";
import useEffectCustom from "../../Hooks/common/useEffectCustom";
import styles from "../../styles/app_login.module.scss";

type Data = {
  [key: string]: string;
};
const app_sign_up: NextPage = () => {
  return (
    <div className={styles.Container}>
      <App_header label={"会員登録"} />
      <SignupBox />
      <Form />
      <p>
        会員登録には、
        <Link href={"./app_terms"}>
          <a className={styles.underLine}>利用規約</a>
        </Link>
        および
        <Link href={"./app_privacy_policy"}>
          <a className={styles.underLine}>プライバシーポリシー</a>
        </Link>
        への同意が必要です。
      </p>
    </div>
  );
};

const SignupBox = () => {
  return (
    <div className={styles.subTitle}>
      <h1>CASEBOXをはじめる</h1>
    </div>
  );
};

const Form = () => {
  const InputRef = useRef<HTMLInputElement>(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const sha1 = require("js-sha1");
  const router = useRouter();

  // 会員登録処理
  const insertDB = async (UserID: string, email: string) => {
    console.log("aaaa");

    await fetch(
      `/api/app_sql?sql=signup&&user_id=${UserID}&&user_email=${email}&&user_password=${sha1(
        password
      )}`
    )
      .then((res) => {
        return res.json();
      })
      .then(
        (data) =>
          data &&
          router.push({
            pathname: "/App/app_login",
          })
      );
  };

  const handleClickSignUp = async () => {
    const email = InputRef.current?.value;
    await fetch(`/api/app_sql?sql=signup_check&email=${email?.trim()}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data[0]) {
          setError("メールアドレスが重複しています");
        } else {
          handleValidation(data, email!);
        }
      });
  };

  const SignupHandler = (data: Data[], email: string) => {
    const SELECT =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const N = 9;

    // ランダム９桁
    const createUserID = (): string => {
      const new_user_id = Array.from(Array(N))
        .map(() => SELECT[Math.floor(Math.random() * SELECT.length)])
        .join("");
      return new_user_id;
    };

    const new_user_id = createUserID();
    insertDB(new_user_id, email);
  };

  // validation
  const handleValidation = (data: Data[], email: string) => {
    // 正しい書式かどうか
    if (
      !email.match(
        /[a-zA-Z0-9]+[a-zA-Z0-9\._-]*@[a-zA-Z0-9_-]+[a-zA-Z0-9\._-]+/
      )
    ) {
      setError("メールアドレスの書式が間違っています");
      return;
    }
    if (!password.match(/^(?=.*?[a-z])(?=.*?\d)[a-z\d]{8,100}$/i)) {
      setError("パスワードは半角英数字8桁以上です。");
      return;
    }
    if (error === "") {
      console.log(error);
      SignupHandler(data, email);
    } else {
      console.log(error);
    }
  };

  // console.log(email);

  // console.log(loginflg);

  return (
    <div className={styles.loginFormContainer}>
      {error !== "" && <p>{error}</p>}
      <input
        className={styles.mailForm}
        placeholder="メールアドレス"
        ref={InputRef}
        onChange={() => setError("")}
      />
      <input
        className={styles.passwordForm}
        placeholder="パスワード"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <Button
        label="同意して会員登録"
        onClick={() => {
          handleClickSignUp();
        }}
      />

      {/*<input className={styles.mailForm} placeholder='メールアドレス' value={email} onChange={(e)=>{setEmail(e.target.value)}} style={(duplication || EmailRegex && email!=="") ?{background:"red"}:{background:"white"}} />*/}
      {/* <input className={styles.passwordForm} placeholder='パスワード' value={password} onChange={(e)=>{setPassword(e.target.value)}} style={(PassRegex &&password!=="") ?{background:"red"}:{background:"white"}}/> */}
    </div>
  );
};

export default app_sign_up;
