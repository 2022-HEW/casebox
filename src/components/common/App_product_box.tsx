import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import Image from 'next/image'
import useSWR from 'swr'
import { NextRouter, useRouter } from 'next/router'
import { useRecoilState } from "recoil";
import { productState } from '../../atoms/app_atoms';
import { NextPage } from 'next'
import styles from "../../styles/app_search.module.css"



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
    const router = useRouter()

    const goDetail= () =>{
        setProduct((before)=>({...before,
            m_product_price:m_product_price,
            product_ID:product_ID,
            product_name:product_name,
            product_place:product_place,
            m_product_category:m_product_category
        }))
        router.push({
            pathname:"/app_product_detail"
        })
    }
    return(
        <div onClick={()=>{goDetail()}}>
            <p className={styles.like}>❤{product_liked}</p>
            <Image src={"/product_image/" + product_place} alt="商品の画像" width={200} height={200} id={styles.product_image}/>
            <p className={styles.case_name}>{product_name}</p>
            <p className={styles.case_category}>{m_product_category}</p>
            <p className={styles.case_price}>￥{m_product_price.toLocaleString()}(税込)</p>
        </div>
    )
}
