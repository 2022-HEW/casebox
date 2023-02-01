import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useRecoilState } from "recoil";
import useSWR from "swr";
import { profileState } from "../../atoms/app_atoms";
import { Button } from "../../components/common/App_button";
import App_header from "../../components/common/App_header";
import styles from "../../styles/app_login.module.css";
import { fetcher } from "../../utils";


const app_login: NextPage = () => {
  return (
    <>
      <App_header label="ログイン" />
      <LoginBox />
    </>
  );
};

const LoginBox = ({}) => {
  return (
    <div className={styles.Container}>
      <div className={styles.subTitle}>
        <h1>CASEBOX</h1>
      </div>
      <Form />

        <Link href="./app_sign_up">
          <div className={styles.signUp}>
            <p>新規会員登録</p>
          </div>
        </Link>
    </div>
  );
};

const Form = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginflg, setLoginflg] = useState(false);
  const { data, error } = useSWR<any>(
    loginflg && `/api/app_sql?sql=login&&login=${email}`,
    fetcher
  );
  
  const [profile, setProfile] = useRecoilState(profileState);
  const [LoginError, setLoginError] = useState(false);
  const router = useRouter();
  if (error) {
    console.log(error);
  }

  const insertLoginDB=async(user_id:string)=>{
    await fetch(`/api/app_sql?sql=insertLogin&&user_id=${user_id}`)
  }

  // ログインチェック
  useEffect(() => {
    if (loginflg) {
      setLoginError(true);
    }
    if (data) {
      console.log(data);
      const sha1 = require("js-sha1");
      // console.log(sha1(password));

      if (data[0]?.user_password === sha1(password)) {
        setProfile(data[0]);
        setLoginError(false);
        insertLoginDB(data[0]?.user_id);
        router.push({ pathname: "./app_profile" });
      }
      //emailが違う
    }
    // 取得をリセット
    setLoginflg(false);
  }, [data]);

  // セットされたら
  useEffect(() => {
    if (profile.user_id !== "") {
      console.log(profile);
    }
  }, [profile]);

  // console.log(email);

  // console.log(loginflg);

  return (
    <>
    <div className={styles.loginFormContainer}>
      {LoginError && <p>メールアドレス、またはパスワードが違います。</p>}
      <input
        className={styles.mailForm}
        placeholder="メールアドレス"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <input
        className={styles.passwordForm}
        type={"password"}
        placeholder="パスワード"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />

      <Link href="./app_password_reset">
        <a className={styles.passwordForget}>パスワードを忘れた方</a>
      </Link>

      <Button label="ログイン" onClick={() => setLoginflg(true)} />
      </div>
    </>
  );
};

export default app_login;
