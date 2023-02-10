import { color } from '@mui/system';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { type } from 'os';
import React, { useEffect, useState } from 'react'
import useSWR from 'swr';
import { Button } from '../../components/common/App_button'
import App_header from '../../components/common/App_header'
import styles from '../../styles/app_login.module.scss'



async function fetcher(url: string): Promise<boolean | null > {
    const response = await fetch(url);
    return response.json();
}

const app_sign_up:NextPage = () => {
    return (
        <div className={styles.Container}>
            <App_header label={"会員登録"}/>
            <SignupBox/>
            <Form/>
            <p>
                会員登録には、<Link href={"/"}><a className={styles.underLine}>利用規約</a></Link>および<Link href={"/"}><a className={styles.underLine}>プライバシーポリシー</a></Link>への同意が必要です。
            </p>
        </div>
    )
}

const SignupBox = () =>{
    return(
        <div className={styles.subTitle}>
            <h1>CASEBOXをはじめる</h1>
        </div>
    )
}


const Form = ()=>{
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [duplication,setDuplication] = useState(false)
    const [EmailRegex,setEmailRegex] = useState(true)
    const [PassRegex,setPassRegex] = useState(true)
    const [UserID,setUserID] = useState("")
    const sha1 = require('js-sha1');
    const router = useRouter()

    

    const { data,error } = useSWR<any>(email!=="" && `/api/app_sql?sql=signup_check`,fetcher)
    
    const SignupHandler= ()  =>{
        const SELECT = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        const N=9

        // ランダム９桁
        const createUserID=():string=>{
            const new_user_id = Array.from(Array(N)).map(()=>SELECT[Math.floor(Math.random()*SELECT.length)]).join('')
            return new_user_id
        }

        const new_user_id = createUserID()
        // console.log(new_user_id);
        // 重複チェック
        data.map((value:Profile)=>{
            if(value.user_id === new_user_id){
                console.log("同じ")
                SignupHandler()
            }else{
                setUserID(new_user_id)
            }
        })
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
            setEmailRegex(false)
        }
    },[email, data])

    useEffect(()=>{
        if(password.match(/^(?=.*?[a-z])(?=.*?\d)[a-z\d]{8,100}$/i)){
            setPassRegex(false)
        }
    },[password])

    // 会員登録処理
    useEffect(()=>{
        const insertDB = async(UserID:string) =>{
            await fetch(`/api/app_sql?sql=signup&&user_id=${UserID}&&user_email=${email}&&user_password=${sha1(password)}`)
            .then(res=>{return res.json()})
            // .then((data)=> console.log(data))
        }
        if(UserID!==""){
            insertDB(UserID)
            router.push({
                pathname:"/app_login"
            })
        }
    },[UserID])
    

    
    // console.log(email);
    
    // console.log(loginflg);
    
    return(
        <div className={styles.loginFormContainer}>
            <input className={styles.mailForm} placeholder='メールアドレス' value={email} onChange={(e)=>{setEmail(e.target.value)}} />
            <input className={styles.passwordForm} placeholder='パスワード' value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
            <Button label='同意して会員登録' onClick={SignupHandler} disabled={(duplication || EmailRegex ||PassRegex) && true}/>

            {/*<input className={styles.mailForm} placeholder='メールアドレス' value={email} onChange={(e)=>{setEmail(e.target.value)}} style={(duplication || EmailRegex && email!=="") ?{background:"red"}:{background:"white"}} />*/}
            {/* <input className={styles.passwordForm} placeholder='パスワード' value={password} onChange={(e)=>{setPassword(e.target.value)}} style={(PassRegex &&password!=="") ?{background:"red"}:{background:"white"}}/> */}
        </div>
    )
}


export default app_sign_up