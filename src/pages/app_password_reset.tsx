import { NextPage } from 'next'
import React, { useState } from 'react'
import { Button } from '../components/common/App_button'
import App_header from '../components/common/App_header'

const app_password_reset:NextPage = () => {


    return (
        <>
            <App_header label='会員登録'/>
            <Reset_box/>
        </>
    )
}

const Reset_box = ()=>{

    return(
        <div>
            <h1>パスワード再設定</h1>
            <p>CASEBOXに登録したメールアドレスを入力してください。パスワード再設定用のリンクを送信します。</p>
            <Form/>
        </div>
    )
}

const Form=()=>{
    const[email,setEmail] = useState("")
    const Sendmail=()=>{
        console.log("a");
    }
    return(
        <>
            <input type={"text"} value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <Button label='送信する' onClick={Sendmail}/>
        </>
    )
}
export default app_password_reset
