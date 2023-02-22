import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import styles from "../../styles/app_search.module.css"
import Image from 'next/image'
import App_nav from '../../components/common/App_nav'
import useSWR from 'swr'
import { NextRouter, useRouter } from 'next/router'
import { useRecoilState } from "recoil";
import { productState } from '../../atoms/app_atoms';
import { NextPage } from 'next'
import { App_productBox } from '../../components/common/App_product_box'
import { App_product_filter } from '../../components/common/App_product_filter'
import { Product } from '../../types'
import { fetcher } from '../../utils'

const app_search:NextPage = () => {    
    const [text,setText] = useState("")
    return (
        <div className={styles.searchContainer}>
            <SearchHeader setText={setText} text={text}/>
            <App_nav/>
            <SearchResult text={text}/>
        </div>
    )
}


type Props={
    text:string
    setText?:Dispatch<SetStateAction<string>>
}
const SearchHeader = ({text,setText}:Props) =>{
    return(
        <header className={styles.header}>
            <div className={styles.search}>
             <Image width={15} height={10} src={"/image/search.svg"}/>
             <input type="text" name="search" value={text} placeholder="探す" onChange={(e)=>{setText && setText(e.target.value)}}/>
            </div>
        </header>
    )
}


const SearchResult = ({text}:Props) =>{

    const [product, setProduct] = useState([])
    

    const { data } = useSWR<any>(`/api/app_sql?sql=filter&&filter=p.product_liked desc`,fetcher) 
    
    useEffect(()=>{
        if(data){
            setProduct(data)
        }
        console.log(data);
    },[data])


        // 取得するまで
    //   if(!data) return (<Box><Nav><></></Nav></Box>)
    return(
        <>
            <App_product_filter product={product} setProduct={setProduct}/>
            <div className={styles.result_box}>
                <div className={styles.result_line}>
                    {product.map((product:Product,index:number) => (
                        product.product_name.includes(text) &&
                            <App_productBox 
                                        product_place={product.product_place}
                                        product_name={product.product_name}
                                        m_product_category={product.m_product_category}
                                        m_product_price={product.m_product_price}
                                        key={product.product_ID}
                                        product_ID={product.product_ID}
                                        product_user_id={product.user_id}
                                        user_name={product.user_name}
                                        product_situation={product.product_situation}
                                        //   setProduct_ID={setProduct_ID}
                            />
                    ))}
                </div>
            </div>
        </>
    )
}

    
export default app_search 