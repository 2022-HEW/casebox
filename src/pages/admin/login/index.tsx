import React from "react";
import Image from "next/image";
import { Button, Grid, TextField } from "@mui/material";
import { NextPage } from "next";
import useSWR from "swr";
import { fetcher } from "../../../utils";
const handleClickLogin=()=>{
    
} 

const getUserInfo=()=>{
  const {data,error} = useSWR("",)
}

const loginUser=()=>{
  
}

const login: NextPage = () => {
  return (
    <Grid container justifyContent={"center"} alignItems={"center"} direction={"column"} width={"100vw"} height={"100vh"} spacing={2}>
      <Grid item>
        <Image src="/image/logo.svg" alt="logo" width={100} height={100} />
        <h2>Sign　in</h2>
      </Grid>
      <Grid item width={"30vw"}>
        <TextField id="outlined-basic" label="E-mail address" variant="outlined" fullWidth/>
      </Grid>
      <Grid item width={"30vw"} xs={2}>
        <TextField id="outlined-basic" label="password" variant="outlined" type="password" fullWidth/>
      </Grid>
      <Grid>
        {/* <Link href=""/> */}
      </Grid>
      <Grid item width={"30vw"}>
        <Button variant="contained" fullWidth style={{borderRadius:"20px"}}>
          Sign in
        </Button>
      </Grid>
    </Grid>
  );
};

export default login;
