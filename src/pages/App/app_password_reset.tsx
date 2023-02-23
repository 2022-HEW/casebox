import { NextPage } from 'next'
import React, { useState } from 'react'
import { Button } from '../../components/app/common/App_button'
import App_header from '../../components/app/common/App_header'
import styles from '../../styles/app_login.module.scss';

const app_password_reset:NextPage = () => {


    return (
        <div className={styles.Container}>
            <App_header label='パスワードリセット'/>
            <Reset_box/>
        </div>
    )
}

const Reset_box = ()=>{

    return(
        <div className={styles.subTitle}>
            <h1>パスワード再設定</h1>
            <p>CASEBOXに登録したメールアドレスを入力してください。</p>
            <p>パスワード再設定用のリンクを送信します。</p>
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
        <div className={styles.passwordResetContainer}>
            <input className={styles.passwordReset} type={"text"} placeholder="メールアドレス" value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <Button label='送信する' onClick={Sendmail}/>
        </div>
    )
}
export default app_password_reset
