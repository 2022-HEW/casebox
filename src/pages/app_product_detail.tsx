import React from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { modalState, productState } from '../atoms/app_atoms'
import App_header from '../components/common/App_header'
import Image from 'next/image'
import styles from '../styles/app_product_detail.module.css'
import App_nav from '../components/common/App_nav'
import Modal from '../components/common/App_modal'
import { Button } from '../components/common/App_button'
import { NextPage } from 'next'
const app_product_detail:NextPage = () => {
    const {product_place,product_name,m_product_category,m_product_price} =useRecoilValue(productState)
    return (
        <>
            <App_header/>
            <ImageView path={product_place}/>
            <ProductInfo name={product_name} category={m_product_category} price={m_product_price}/>
            <QRButton />
            <App_nav/>
            <Modal></Modal>
        </>
    )
}

const ImageView = ({path}:{path:string}) =>{
    return(
        <div className={styles.product_view}>
            <Image width={300} height={300} src={"/product_image/" + path}/>
        </div>
    )
}
type Product={
    name:string,
    category:string,
    price:number
}
const ProductInfo = ({name,category,price}:Product) =>{
    return(
        <div className={styles.product_info}>
            <p className={styles.case_name}>{name}</p>
            <p className={styles.case_category}>{category}</p>
            <p className={styles.case_price}>￥{price.toLocaleString()}(税込)</p>
        </div>
    )
}
type QRButton={
    // label:string
}
const QRButton=()=>{
    const [modal,setModal] = useRecoilState(modalState)
    const handleQRcode=()=>{
        setModal(true)
    }
    return(
        <Button label="QRコードを表示" onClick={handleQRcode}/>
    )
}
export default app_product_detail 
