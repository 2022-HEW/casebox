import React from 'react'
import { useRecoilValue,useRecoilState } from "recoil";
import { productState,modalState } from '../atoms/atoms';
import styles from "../styles/pay.module.css"
import Image from "next/image"

type Props ={ 
    pay:string
}
const Touch = ({pay}:Props) => {
    const {m_product_price} = useRecoilValue(productState)
    // console.log(pay);
    return (
        <>
            <div className={styles.touch_price_box}>
                <span className={styles.modal_write}>支払額</span>
                <span className={styles.touch_money}>{m_product_price}</span>
                <span className={styles.en}>円</span>
            </div>
            <div className={styles.touch_info_box}>
                <Image width={300} height={140} src="/image/touch.svg"/>
                <p style={{fontWeight: "bold",fontSize: "20px",margin: "30px 0 0 0"}}>カードをタッチしてください</p>
                <p  style={{fontSize: "12px",lineHeight:"5px"}}>以下のタッチ決済のみご利用いただけます</p>
                <Image width={250} height={100} src={pay === "クレジットカード" ? "/image/card.svg":"/image/card.svg"}/>
            </div>
        </>
    )
}
export default Touch