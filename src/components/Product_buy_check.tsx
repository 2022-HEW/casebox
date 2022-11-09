import { type } from 'os'
import React from 'react'
import  Image from "next/image"
import styles from '../styles/device_select.module.css';
import { Button } from './common/Button';
import { useRouter } from 'next/router';

type Props=  {
    image_path:string
    design_path:string
    type_name:string
    color_name:string
    product_price:number
}


 const Product_buy_check = ({image_path,design_path,type_name,color_name,product_price}:Props) => {
    const router = useRouter()
    

    const go_pay_select=()=>{
            router.push({
                pathname:"pay"
            })
    }

  return (
    <>
        <Image src={image_path} alt="スマホ" width={300} height={430} objectFit='contain'/>
                    
        {design_path !=="/design/" &&
        <div className={styles.design}>
            <Image src={design_path} alt="スマホ" width={250} height={400}/>
        </div>
        }
        <div className={styles.product_info}>
            <p>{type_name}</p>
            <p>{color_name}</p>
            <p>{product_price}</p>
            <div>
                <span>-</span>
                <span>1</span>
                <span>+</span>
            </div>
            <Button situ_name="screen" label="購入へ" onClick={go_pay_select}/>
        </div>
    </>

  )
}


export default  Product_buy_check
