import { NextPage } from 'next'
import React, { useEffect, useReducer, useState } from 'react'
import { text } from 'stream/consumers'
import useSWR from 'swr'
import { App_productBox } from '../components/common/App_product_box'
import Image from 'next/image'
import styles from "../styles/app_search.module.css"
import App_header from '../components/common/App_header'
import App_nav from '../components/common/App_nav'
import { App_product_filter } from '../components/common/App_product_filter'

const App_template:NextPage = () => {
  
    type Product ={
        product_ID:number,
        product_name:string,
        product_liked:number,
        product_place:string,
        m_product_category:string,
        m_product_price:number,
        user_id:string,
    }

    const [product, setProduct] = useState([])
    async function fetcher(url: string): Promise<boolean | null > {
        const response = await fetch(url);
        return response.json();
    }

    const { data } = useSWR<any>(`/api/app_sql?sql=filter&&filter=p.product_liked desc`,fetcher) 
    
    useEffect(()=>{
        if(data){
            setProduct(data)
        }
        // console.log(data);
    },[data])

        // 取得するまで
    //   if(!data) return (<Box><Nav><></></Nav></Box>)
    return(
        <div className={styles.container}>
            <App_header label='テンプレート'/>
            <App_product_filter product={product} setProduct={setProduct}/>
            <div className={styles.result_box}>
                <div className={styles.result_line}>
                    {product.map((product:Product,index:number) => (
                            <App_productBox 
                                        product_place={product.product_place}
                                        product_name={product.product_name}
                                        m_product_category={product.m_product_category}
                                        m_product_price={product.m_product_price}
                                        key={product.product_ID}
                                        product_ID={product.product_ID}
                                        product_user_id={product.user_id}
                                        //   setProduct_ID={setProduct_ID}
                            />
                    ))}
                </div>
            </div>
            <App_nav/>
        </div>
    )
}
export default App_template
