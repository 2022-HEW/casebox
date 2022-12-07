import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import styles from "../styles/app_search.module.css"
import Image from 'next/image'
import App_nav from '../components/common/App_nav'
import useSWR from 'swr'
import { NextRouter, useRouter } from 'next/router'
import { useRecoilState } from "recoil";
import { productState } from '../atoms/app_atoms';



const app_search = () => {    
    const [text,setText] = useState("")
    return (
        <div className={styles.container}>
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
            <Image width={10} height={10} src={"/image/search.svg"}/>
            <input type="text" name="search" value={text} placeholder="探す" onChange={(e)=>{setText && setText(e.target.value)}}/>
        </header>
    )
}

type Product ={
    product_ID:number,
    product_name:string,
    product_liked:number,
    product_place:string,
    m_product_category:string,
    m_product_price:number,
  }
const SearchResult = ({text}:Props) =>{

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
        <>
            <div className={styles.result_header}>
                <p>人気順</p>
                <Image width={10} height={10} src={"/image/filter.svg"}/>
            </div>
            <div className={styles.result_box}>
                <div className={styles.result_line}>
                    {product.map((product:Product,index:number) => (
                        product.product_name.includes(text) &&
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
export default app_search 