import { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { text } from 'stream/consumers'
import useSWR from 'swr'
import { App_productBox } from '../components/common/App_product_box'
import Image from 'next/image'
import styles from "../styles/app_search.module.css"
import App_header from '../components/common/App_header'
import App_nav from '../components/common/App_nav'

 const App_template:NextPage = () => {
  
type Product ={
    product_ID:number,
    product_name:string,
    product_liked:number,
    product_place:string,
    m_product_category:string,
    m_product_price:number,
  }

    const [product, setProduct] = useState([])
    
    async function fetcher(url: string): Promise<boolean | null > {
        const response = await fetch(url);
        return response.json();
    }

    const { data } = useSWR<any>(`/api/app_sql?sql=template`,fetcher) 
    
    useEffect(()=>{
        if(data){
            setProduct(data)
        }
        // console.log(data);
    },[data])

    // 降順sort
    const Rank = () =>{
        product.sort((el1:Product,el2:Product)=>{
            if(el1.product_liked < el2.product_liked){
                return 1;
            }
            if (el1.product_liked > el2.product_liked) {
                return -1;
            }
            return 0
        }) ;
        // console.log(newList);
    }
    Rank()


        // 取得するまで
    //   if(!data) return (<Box><Nav><></></Nav></Box>)
    return(
        <div className={styles.container}>
            <App_header label='テンプレート'/>
            <div className={styles.result_header}>
                <p>人気順</p>
                <Image width={10} height={10} src={"/image/filter.svg"}/>
            </div>
            <div className={styles.result_box}>
                <div className={styles.result_line}>
                    {product.map((product:Product,index:number) => (
                            <App_productBox 
                                        product_place={product.product_place}
                                        product_name={product.product_name}
                                        m_product_category={product.m_product_category}
                                        m_product_price={product.m_product_price}
                                        product_liked={product.product_liked}
                                        key={product.product_ID}
                                        product_ID={product.product_ID}
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
