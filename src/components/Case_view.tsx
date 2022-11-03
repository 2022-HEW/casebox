import styles from '../styles/device_select.module.css';
import React, { SetStateAction, useEffect, useState } from 'react';
import { useRouter } from'next/router'
import { useRecoilValue } from "recoil";
import { productState } from '../atomes/atoms';


type Props = {
    select_device:string
    iPhones:never[]
    iPhone_colors:never[]
    Android_colors:never[]
    Androids:never[]
    type_index:number
    color_index:number
    types:never[]
};

const Case_view = ({select_device,iPhones,Androids,type_index,iPhone_colors,Android_colors,color_index,types}:Props) =>{
    const router = useRouter()
    const product_info = useRecoilValue(productState)
   

        // console.log(product_info);
        // console.log(iPhone_colors);
        // console.log(types);
        
        
    return(
        //  ケース表示のエリア 
        <div id={styles.case_view}>
            {/* <Image src={select_device == "iPhone" ? `/iPhone/${iPhones[type_index]}/${iPhone_colors[color_index]}.png`  : `/Android/${Androids[0]}.png`} alt="スマホ" width={500} height={579} objectFit='contain'/> */}
            <img src={`/${select_device}/${types[type_index]}/${iPhone_colors[color_index]}.png`} alt="スマホ" width={500} height={579} />
            {/* デザインが選ばれているとき */}
            {product_info.product_place !== "" &&
                <div className={styles.design}>
                    <img src={`/design/${product_info.product_place}`} alt="スマホ"  />
                </div>
            }
        </div>        
    )
}
export default React.memo(Case_view);