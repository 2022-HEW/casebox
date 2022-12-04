import React, { useEffect, useState } from 'react'
import styles from "../styles/app_search.module.css"
import Image from 'next/image'
import App_nav from '../components/common/App_nav'
import useSWR from 'swr'

const app_search = () => {

    return (
        <div className={styles.container}>
            <SearchHeader />
            <App_nav/>
            <SearchResult/>
        </div>
    )
}


type Header={
    label:string
}
const SearchHeader = () =>{
    return(
        <header className={styles.header}>
            <Image width={10} height={10} src={"/image/search.svg"}/>
            <input type="text" name="search" value="" placeholder="探す" />
        </header>
    )
}

type Product ={
    product_ID:number,
    product_name:string,
    product_liked:number,
    product_place:string,
    m_product_category:string,
    m_product_price:number
  }
const SearchResult = () =>{

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
    },[data])

        // 取得するまで
    //   if(!data) return (<Box><Nav><></></Nav></Box>)
    return(
        <>
            <div className={styles.result_header}>
                <p>人気順</p>
                <Image width={10} height={10} src={"/image/filter.svg"}/>
            </div>
            <div className={styles.result_box}>
                <div className={styles.result_line}>
                    {product.map((product:Product,index:number) => (
                    <ProductBox product_place={product.product_place}
                                product_name={product.product_name}
                                m_product_category={product.m_product_category}
                                m_product_price={product.m_product_price}
                                product_liked={product.product_liked}
                                key={product.product_ID}
                                product_ID={index}
                                //   setProduct_ID={setProduct_ID}
                    />
                    ))}
                </div>
            </div>
        </>
    )
}

    const ProductBox = ({product_place,product_name,m_product_category,m_product_price,product_ID,product_liked}:Product)=> {
        return(
            <div>
                <p className={styles.like}>❤{product_liked}</p>
                <Image src={"/product_image/" + product_place} alt="商品の画像" width={200} height={200} id={styles.product_image}/>
                <p className={styles.case_name}>{product_name}</p>
                <p className={styles.case_category}>{m_product_category}</p>
                <p className={styles.case_price}>￥{m_product_price.toLocaleString()}(税込)</p>
            </div>
        )
    }
export default app_search 