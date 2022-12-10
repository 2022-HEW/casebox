import Nav from "../components/common/Nav";
import Box from "../components/common/Box";
import styles from "../styles/pay.module.css";
import Image from "next/image";
import Cash from "../../public/image/money.svg";
import trafic from "../../public/image/t_money.svg";
import electric from "../../public/image/e_money.svg";
import other from "../../public/image/other_money.svg";
import ID from "../../public/image/ID.svg";
import QuicPay from "../../public/image/QuicPay.svg";
import Edy from "../../public/image/Edy.svg";
import { useRecoilValue,useRecoilState } from "recoil";
import { productState,modalState } from '../atoms/atoms';
import { useEffect, useState } from "react";
import React from "react";
import Modal from "../components/common/Modal";
import Other from "../components/Other";
import Touch from "../components/Touch";
import { useRouter } from "next/router";
import { NextPage } from "next";


const pay:NextPage = () => {
    // 今までの情報をリセット

    interface btn_props {
        imgPath: string;
        name: string;
    }
    const [pay,setPay] = useState("現金");   
    const [modal,setModal] = useRecoilState(modalState)
    const { m_product_price,product_ID } = useRecoilValue(productState)
    const handlePay = (name:string) =>{
        setPay(name)
        if(name !== "現金"){
            setModal(true)
        }
    }

    const router = useRouter()
    // 時間経過で遷移
    useEffect(() => {
      const time = setInterval(()=>{
        if(pay!="その他"){
            // console.log("a");
            router.push({
                pathname:"/thankyou"
            })
        }
      },5000)

      return()=>{
        clearInterval(time)
      }      
    }, [pay])
    

    const Buttons = ({ imgPath, name}: btn_props) => {
        
        return (
            <div className={pay  === name? styles.payType_a : styles.payType} onClick={()=>handlePay(name)} >
                <div className={styles.btnContent}>
                    <Image src={imgPath} alt={name} id={styles.image}/>
                    <p id={styles.btnname}>{name}</p>
                </div>
            </div>
        )
    }
    

    return (
        <Box>
            <Nav >
                <div id={styles.wrap}>
                    <Price_result id={styles.price} write="支払額" price={m_product_price}/>
                    <Price_result id={styles.payed} write="投入額" price={m_product_price}/>
                    <Price_result id={styles.back} write="おつり" price={0}/>

                    <div className={styles.buttons}>
                        <Buttons imgPath={Cash} name="現金"  />
                        <Buttons imgPath={trafic} name="クレジットカード" />
                        <Buttons imgPath={electric} name="交通系電子マネー" />
                        <Buttons imgPath={other} name="その他" />
                    </div>
                </div>
                <Modal>
                    {pay ==="その他" || pay==="ID" || pay=="QuicPay" || pay=="Edy" ?
                        <Other pay={pay}>
                            <Buttons imgPath={ID} name="ID"/>
                            <Buttons imgPath={QuicPay} name="QuicPay"/>
                            <Buttons imgPath={Edy} name="Edy"/>
                        </Other>
                        :
                        <Touch pay={pay}/>
                    }
                </Modal>
            </Nav>
        </Box>
    )

}

interface pay_props {
    write: string;
    id: string;
    price:number;
}
const Price_result = ({ write, id ,price}: pay_props) => {
    
    return (
        <div className={styles.block2} id={id}>
            <p className={styles.write}>{write}</p>
            <p className={styles.money}>{price}</p>
            <p className={styles.en}>円</p>
        </div>
    )
}

export default pay