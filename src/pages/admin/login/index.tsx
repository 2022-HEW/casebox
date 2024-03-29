import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import Image from "next/image";
import { Button, Grid, TextField } from "@mui/material";
import { NextPage } from "next";
import useSWR from "swr";
import { fetcher, InsertDB } from "../../../utils";
import useEffectCustom from "../../../Hooks/common/useEffectCustom";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { productState } from "../../../atoms/admin_atoms";

type UserInfo = {
  user_id: string;
  password: string;
};

const getUserInfo = async (
  inputEmail: string,
  setState: Dispatch<SetStateAction<UserInfo>>
) => {
  await fetch(`/api/admin_sql?situ=getUserInfo&email=${inputEmail}`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      // console.log(data);

      setState(data[0]);
    });
};

const addLoginUser = async (userID: string) => {
  const body = {
    situ: "addLogin",
    user_id: userID,
  };
  InsertDB(body);
};

const handleChangeInput = (
  state: string,
  setState: Dispatch<SetStateAction<string>>
) => {
  setState(state);
};

const login: NextPage = () => {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    user_id: "",
    password: "",
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [isError, setIsError] = useState(false);
  const [user, setUser] = useRecoilState(productState);

  const handleClickLogin = () => {
    getUserInfo(email, setUserInfo);
  };

  // バリデーション
  useEffectCustom(() => {
    // console.log(userInfo);

    if (userInfo) {
      if (password === userInfo.password) {
        addLoginUser(userInfo.user_id);
        setUser({ userID: userInfo.user_id });
        router.push({ pathname: "/admin/product/" });
      } else {
        setIsError(true);
      }
    } else {
      console.log("error");
      setIsError(true);
      // console.log(userInfo.password);
    }
  }, [userInfo]);

  return (
    <Grid
      container
      justifyContent={"center"}
      alignItems={"center"}
      direction={"column"}
      width={"100vw"}
      height={"100vh"}
      spacing={2}
    >
      <Grid item>
        <Image src="/image/logo.svg" alt="logo" width={100} height={100} />
        <h2>Sign　in</h2>
      </Grid>
      <Grid item width={"30vw"}>
        <TextField
          id="outlined-basic"
          label="E-mail address"
          variant="outlined"
          fullWidth
          onChange={(e) => handleChangeInput(e.currentTarget.value, setEmail)}
          value={email}
          error={isError}
          helperText={isError && "メールアドレスかパスワードが間違っています。"}
        />
      </Grid>
      <Grid item width={"30vw"} xs={2}>
        <TextField
          id="outlined-basic"
          label="password"
          variant="outlined"
          type="password"
          fullWidth
          onChange={(e) =>
            handleChangeInput(e.currentTarget.value, setPassword)
          }
          value={password}
          error={isError}
          helperText={isError && "メールアドレスかパスワードが間違っています。"}
        />
      </Grid>
      <Grid>{/* <Link href=""/> */}</Grid>
      <Grid item width={"30vw"}>
        <Button
          variant="contained"
          fullWidth
          style={{ borderRadius: "20px" }}
          onClick={handleClickLogin}
        >
          Sign in
        </Button>
      </Grid>
    </Grid>
  );
};

export default login;
