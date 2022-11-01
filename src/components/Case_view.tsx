import styles from '../styles/device_select.module.css';
import Image from 'next/image';
import React, { useEffect } from 'react';
import { useRouter } from'next/router'
import { useRecoilValue } from "recoil";
import { productState } from '../pages/atoms';


type Props = {
    device:string
}



const iPhons ={
    iPhonX:"/iPhoneX.svg"
}

const Androids = {
    Galaxy_S22:"/Galaxy_S22.png",
    Galaxy_M23:"/Galaxy_M23.png"
}



const Case_view = ({device}:Props) =>{
    const router = useRouter()
    const product_info = useRecoilValue(productState)
        
    return(
        //  ケース表示のエリア 
        <div id={styles.case_view}>
            <Image src={device == "iPhone" ? "/iPhone" + iPhons.iPhonX : "/Android" + Androids.Galaxy_M23} alt="スマホ" width={500} height={579} objectFit='contain'/>
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