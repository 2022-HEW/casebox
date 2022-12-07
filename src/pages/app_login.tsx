import Link from 'next/link'
import React, { useCallback, useState } from 'react'
import useSWR from 'swr'
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
            <Link href="/app_password_reset">
                <p>新規会員登録</p>
            </Link>
        </div>
    )
}


const Form = ()=>{
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [loginflg,setLoginflg] = useState(false)
    const { data } = useSWR<any>(loginflg && `/api/app_sql?sql=login&&email=${email}`,fetcher)
    console.log(data);
    console.log(email);
    
    // console.log(loginflg);
    
    return(
        <>
            <input placeholder='メールアドレス' value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
            <input placeholder='パスワード' value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
            <Button label='ログイン' onClick={()=>LoginCheck(email,password,setLoginflg)}/>
        </>
    )
}

const LoginCheck=(email:string,password:string,setLoginflg:any)=>{
   setLoginflg(true)   
}

export default app_login
