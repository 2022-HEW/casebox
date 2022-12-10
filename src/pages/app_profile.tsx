import React, { useEffect, useState } from 'react'
import { Button } from '../components/common/App_button'
import App_nav from '../components/common/App_nav'
import Image from 'next/image'
import Link from 'next/link'
import { useRecoilValue } from 'recoil'
import { profileState } from '../atoms/app_atoms'
import { NextPage } from 'next'
import { App_productBox } from '../components/common/App_product_box'
import useSWR from 'swr'

 const app_profile:NextPage = () => {
    // console.log(user_id);
    const {user_id}=useRecoilValue(profileState)
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
                <ProfileHeader/>
            </>

        }
    </>
  )
}
const ProfileHeader=()=>{
    type Product ={
        product_ID:number,
        product_name:string,
        product_liked:number,
        product_place:string,
        m_product_category:string,
        m_product_price:number,
      }
    const [product, setProduct] = useState([])
    const {user_id}=useRecoilValue(profileState)
    async function fetcher(url: string): Promise<boolean | null > {
        const response = await fetch(url);
        return response.json();
    }
    const { data } = useSWR<any>(`/api/app_sql?sql=template&&where=mp.m_product_category="${user_id}"`,fetcher) 
    useEffect(()=>{
        if(data){
            setProduct(data)
        }
        console.log(data);
    },[data])
    return(
    <>
        <ProfileInfo/>
        <ProfileButton/>
        
        {product.map((product:Product,index:number) => (
        <App_productBox product_place={product.product_place}
                                        product_name={product.product_name}
                                        m_product_category={product.m_product_category}
                                        m_product_price={product.m_product_price}
                                        product_liked={product.product_liked}
                                        key={product.product_ID}
                                        product_ID={index}
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

const ProfileButton=()=>{
    const[select,setSelect] = useState("my")
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
