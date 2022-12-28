import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Button } from '../components/common/App_button'
import App_nav from '../components/common/App_nav'
import Image from 'next/image'
import Link from 'next/link'
import { useRecoilValue } from 'recoil'
import { profileState,productState } from '../atoms/app_atoms'
import { NextPage } from 'next'
import { App_productBox } from '../components/common/App_product_box'
import useSWR from 'swr'
import useEffectCustom from '../components/common/useEffectCustom'
import { useRouter } from 'next/router'
import { Product } from '../types'

 const app_profile = () => {
    // console.log(user_id);
    const router = useRouter()
    const {user_id}=useRecoilValue(profileState)
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true)
    }, [])
  return mounted &&(
    <>
    <App_nav/>
    {user_id ===""?
        <>
            <LoginBox/>
            <News/>
        </> 
        :
        <>
            <Link href={"/app_profile_edit"}>
                <div>プロフィール編集</div>
            </Link>
            <ProfileHeader/>
        </>

    }
</>
  )
}
const ProfileHeader=()=>{
   
    const [product, setProduct] = useState([])
    const {user_id}=useRecoilValue(profileState)
    async function fetcher(url: string): Promise<boolean | null > {
        const response = await fetch(url);
        return response.json();
    }
    // const { data } = useSWR<any>(`/api/app_sql?sql=template&&where=p.user_id="${user_id}"`,fetcher) 
    const[select,setSelect] = useState("my")
    // ユーザーが作った商品を取得
    const useCreated = ()=>{
        const { data } = useSWR<any>(`/api/app_sql?sql=template&&where=p.user_id="${user_id}"`,fetcher)
        return{
            created:data
        }
    }

    // ユーザーがいいねした商品を取得
    const useFavorite = ()=>{
        const { data } = useSWR<any>(`/api/app_sql?sql=favorite&&user_id=${user_id}`,fetcher)
        return{
            liked:data
        }
    }

    const {created} = useCreated()
    const {liked} = useFavorite()
    // 初回
    useEffectCustom(()=>{
        if(select === "my"){
            // console.log(created);
            setProduct(created)
        }
    },[created])
    useEffect(()=>{
        if(select === "my"){
            if(created){
                setProduct(created)
                // console.log(created);
            }
        }else{
            if(liked){
                setProduct(liked)
                // console.log(liked);
            }
        }
        // console.log(data);
    },[select])

    
    


    return(
    <>
        <ProfileInfo/>
        <ProfileButton select={select} setSelect={setSelect}/>
        {product.map((product:Product,index:number) => (
            
            <App_productBox product_place={product.product_place}
                                            product_name={product.product_name}
                                            m_product_category={product.m_product_category}
                                            m_product_price={product.m_product_price}
                                            key={product.product_ID}
                                            product_ID={product.product_ID}
                                            product_user_id={product.user_id}
                                            product_situation={product.product_situation}

                                            //   setProduct_ID={setProduct_ID}
            />
        ))}
    </>)
}

const ProfileInfo=()=>{
    const {user_image,user_name,user_comment}=useRecoilValue(profileState)
    return(
        <div>
            <Image src={user_image} width={100} height={100}/>
            <h2>{user_name}</h2>
            <p>{user_comment}</p>
        </div>
    )
}
type ProfileButton={
    select:string,
    setSelect:Dispatch<SetStateAction<string>>
}
const ProfileButton=({select,setSelect}:ProfileButton)=>{
    return(
    <div>
        <Button 
            label='マイデザイン' 
            onClick={(e)=>setSelect(e.currentTarget.id)} 
            id={"my"} 
            style={select==="my"?{}:{background:"#F1F1F1",color:"#000"}}
        />
        <Button 
            label='いいね' 
            onClick={(e)=>setSelect(e.currentTarget.id)} 
            id={"like"}
            style={select==="like"?{}:{background:"#F1F1F1",color:"#000"}}
            />
    </div>
    )
}

// 非ログイン時
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
