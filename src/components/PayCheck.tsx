import React from 'react'
import { useRecoilValue,useRecoilState } from "recoil";
import { productState,modalState } from '../atoms/atoms';
import styles from "../styles/pay.module.css"

type Props={
    children:Array<JSX.Element>
    pay:string
}
const PayCheck = ({children,pay}:Props) => {
    const {m_product_price} = useRecoilValue(productState)
    console.log(pay);
    
    return (
        <>
            <div className={styles.modal_price_box}>
                <p className={styles.modal_write}>支払額</p>
                <p className={styles.modal_money}>{m_product_price}</p>
                <p className={styles.en}>円</p>
            </div>
            <div className={styles.modal_category}>
                {children}
            </div>
            <div className={styles.modal_alert}>
                {
                    pay === "ID"||  
                    pay === "QuicPay" ||
                    pay === "Edy" ?     
                        <p>タッチ音が鳴るまで電子マネーをタッチしてください。</p>
                        :
                        <p>お支払い方法を選択してください。</p>
                }
            </div>
        </>
    )
}
export default PayCheck
