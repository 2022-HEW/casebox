import React from 'react'
import { Button } from '../components/common/App_button'
import App_nav from '../components/common/App_nav'
import Image from 'next/image'
import Link from 'next/link'
import { useRecoilValue } from 'recoil'
import { profileState } from '../atoms/app_atoms'
import { NextPage } from 'next'

 const app_profile:NextPage = () => {
    const {user_id}=useRecoilValue(profileState)
    console.log(user_id);
    
  return (
    <>
        <App_nav/>
        {user_id ===""?
            <>
                <LoginBox/>
                <News/>
            </> 
            :
            <>
                <div>あ</div>
            </>

        }
    </>
  )
}

const LoginBox=()=>{
    return(
        <div>
            <h2>ゲスト<span>様</span></h2>
            <Link href={"/app_login"}>
                <Button label={"ログイン・会員登録"}/>
            </Link>
        </div>
    )
}

const News = () =>{
    return(
        <div>
            <h3>お知らせ</h3>
            <div>
                <Record date={"2002.11.11"} category={"カテゴリ"} title={"タイトル"}/>
            </div>
        </div>
        
    )
}
type Record ={
    date:string,
    category:string,
    title:string
}
const Record =({date,category,title}:Record)=>{
    return(
        <div>
            <p>{date}</p>
            <p>{category}</p>
            <p>{title}</p>
            <Image src={""} width={10} height={10}/>
        </div>
    )
}
export default app_profile
