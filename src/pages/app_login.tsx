import Link from 'next/link'
import React, { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import useSWR from 'swr'
import { profileState } from '../atoms/app_atoms'
import { Button } from '../components/common/App_button'
import App_header from '../components/common/App_header'
import styles from '../styles/app_login.module.css'

async function fetcher(url: string): Promise<boolean | null > {
    const response = await fetch(url);
    return response.json();
}


 const app_login = () => {
  return (
    <>
        <App_header label='ログイン'/>
        <LoginBox />
    </>
  )
}

const LoginBox= ({}) =>{
    return(
        <div className={styles.container}>
            <h1>CASEBOX</h1>
            <Form/>
            <Link href="/app_password_reset">
                <p>パスワードを忘れた方</p>
            </Link>
            <Link href="/app_sign_up">
                <p>新規会員登録</p>
            </Link>
        </div>
    )
}


const Form = ()=>{
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [loginflg,setLoginflg] = useState(false)
    const { data,error } = useSWR<any>(loginflg && `/api/app_sql?sql=login&&login=${email}`,fetcher)
    const [profile,setProfile] = useRecoilState(profileState)
    if(error){
        console.log(error);
    }

    // ログインチェック
    useEffect(() => {
    if(data){
        // console.log(data);
        const sha1 = require('js-sha1');
        console.log(sha1(password));
        
        if(data[0].user_password === password){
            setProfile(data[0])
        }else{
            console.log("password:miss");
            setLoginflg(false)
            // console.log(password);
            // console.log(data.user_password);
        }
    }
    }, [data])

    // セットされたら
    useEffect(()=>{
        if(profile.user_id!==0){
            console.log(profile);
        }
    },[profile])
    
 
    
    // console.log(email);
    
    // console.log(loginflg);
    
    return(
        <>
            <input placeholder='メールアドレス' value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
            <input placeholder='パスワード' value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
            <Button label='ログイン' onClick={()=>setLoginflg(true)}/>
        </>
    )
}

export default app_login
