import styles from '../styles/device_select.module.css';
import Image from 'next/image';
import React, { SetStateAction, useEffect, useState } from 'react';
import { useRouter } from'next/router'
import { useRecoilValue } from "recoil";
import { productState } from '../pages/atoms';


type Props = {
    select_device:string
    iPhones:never[]
    Androids:never[]
    type_index:number
};

const Case_view = ({select_device,iPhones,Androids,type_index}:Props) =>{
    const router = useRouter()
    const product_info = useRecoilValue(productState)
   

        console.log(product_info);
        
    return(
        //  ケース表示のエリア 
        <div id={styles.case_view}>
            <Image src={select_device == "iPhone" ? `/iPhone/${iPhones[type_index]}.svg`  : `/Android/${Androids[0]}.png`} alt="スマホ" width={500} height={579} objectFit='contain'/>
            {/* デザインが選ばれているとき */}
            {product_info.product_place !== "" &&
                <div className={styles.design}>
                    <Image src={`/design/${product_info.product_place}`} alt="スマホ" layout='fill' objectFit='contain'/>
                </div>
            }
        </div>        
    )
}
export default React.memo(Case_view);