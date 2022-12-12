import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import Image from 'next/image'
import useSWR from 'swr'
import { NextRouter, useRouter } from 'next/router'
import { useRecoilState, useRecoilValue } from "recoil";
import { productState, profileState } from '../../atoms/app_atoms';
import { NextPage } from 'next'
import styles from "../../styles/app_search.module.css"
import useEffectCustom from "./useEffectCustom"; 


type Product ={
    product_ID:number,
    product_name:string,
    product_liked:number,
    product_place:string,
    m_product_category:string,
    m_product_price:number,
  }
// export const App_productBox = ({product_place,product_name,m_product_category,m_product_price,product_ID,product_liked}:Product)=> {
  export const App_productBox = ({product_place,product_name,m_product_category,m_product_price,product_ID,product_liked}:Product)=> {
    const [product,setProduct] = useRecoilState(productState)
    const {user_id} = useRecoilValue(profileState)
    const [liked,setLiked] = useState(false)
    const [newLiked,setNewLiked] = useState(product_liked)
    const router = useRouter()
    
    async function fetcher(url: string): Promise<boolean | null > {
        const response = await fetch(url);
        return response.json();
    }

    const useUserLike  = () =>{
      const { data, error } = useSWR<any>(`/api/app_sql?sql=likes&&user_id=${user_id}`, fetcher)
      return {
          user_like: data,
          isLoading: !error && !data,
          isError: error
        }
    }

    const { user_like } = useUserLike() 
    
    type Product={
      product_id:number
    }
    useEffect(()=>{
        if(user_like){
          user_like.map((value:Product)=>{
            if(value.product_id === product_ID){
              setLiked(true)
              // console.log(liked);
            }
          })
        }
        // console.log(data);
    },[user_like])

    const goDetail= () =>{
        setProduct((before)=>({...before,
            m_product_price:m_product_price,
            product_ID:product_ID,
            product_name:product_name,
            product_place:product_place,
            m_product_category:m_product_category,
        }))
        router.push({
            pathname:"/app_product_detail"
        })
    }
    
    const likehandler=async()=>{
      if(liked){
        setNewLiked(newLiked-1)
        // console.log(liked);
        
      } else{
        setNewLiked(newLiked+1)
      }
      setLiked(!liked)
    }
    // いいねDBを更新
    useEffectCustom(()=>{
      const UpdateLike=async()=>{
        
        await fetch(`/api/app_sql?sql=likechange&&like=${newLiked}&&productID=${product_ID}`)
        .then((res)=>{return res.json()})

        await fetch(`/api/app_sql?sql=${liked ?"create_relation":"remove_relation"}&&user_id=${user_id}&&productID=${product_ID}`)
        .then((res)=>{return res.json()})
      }
        UpdateLike()
    },[newLiked])

    return(
      <>
        <p className={liked ?styles.liked:styles.like} onClick={likehandler} >❤{newLiked}</p>
        <div onClick={goDetail}>
            <Image src={"/product_image/" + product_place} alt="商品の画像" width={200} height={200} id={styles.product_image}/>
            <p className={styles.case_name}>{product_name}</p>
            <p className={styles.case_category}>{m_product_category}</p>
            <p className={styles.case_price}>￥{m_product_price.toLocaleString()}(税込)</p>
        </div>
      </>
    )
}
