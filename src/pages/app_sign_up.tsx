import Link from 'next/link';
import { type } from 'os';
import React, { useEffect, useState } from 'react'
import useSWR from 'swr';
import { Button } from '../components/common/App_button'
import App_header from '../components/common/App_header'
import styles from '../styles/app_login.module.css'



async function fetcher(url: string): Promise<boolean | null > {
    const response = await fetch(url);
    return response.json();
}

const app_sign_up = () => {
  return (
    <>
        <App_header label={"会員登録"}/>
        <SignupBox/>
        <Form/>
        <p>
            会員登録には、<Link href={""}>利用規約</Link>および<Link href={""}>プライバシーポリシー</Link>への同意が必要です。
        </p>
    </>
  )
}

const SignupBox = () =>{
    return(
        <div>
            <h1>CASEBOXをはじめる</h1>
        </div>
    )
}


const Form = ()=>{
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [duplication,setDuplication] = useState(false)
    const [regex,setRegex] = useState(true)

    const { data,error } = useSWR<any>(email!=="" && `/api/app_sql?sql=signup_check`,fetcher)
    
    const addDB = async() =>{
        await fetch(`/api/app_sql?sql=signup`)
        .then(res=>{return res.json()})
        .then((data)=> console.log(data))
    }
    type Profile={
        [key:string]:string
    }

    if(error){
        console.log(error);
    }
    // validation
    useEffect(()=>{
        setDuplication(false)
        if(data){
            data.map((value:Profile)=>{
                // 重複時エラーを出す
                if(value.user_email === email){
                    setDuplication(true)                    
                }
            })   
        }
        // 正しい書式かどうか
        if(email.match(/[a-zA-Z0-9]+[a-zA-Z0-9\._-]*@[a-zA-Z0-9_-]+[a-zA-Z0-9\._-]+/)){
            setRegex(false)
        }
    },[email, data])
    

    
    // console.log(email);
    
    // console.log(loginflg);
    
    return(
        <>
            <input placeholder='メールアドレス' value={email} onChange={(e)=>{setEmail(e.target.value)}} style={duplication ?{background:"red"}:{background:"white"}}/>
            <input placeholder='パスワード' value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
            <Button label='同意して会員登録' onClick={addDB} disabled={(duplication || regex) && true} style={(duplication || regex) ?{opacity:"0.5"}:{opacity:"1.0"}}/>
        </>
    )
}


export default app_sign_up

