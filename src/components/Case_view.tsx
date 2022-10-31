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
    Xperia:""
}



const Case_view = ({device}:Props) =>{
    const router = useRouter()
    const product_info = useRecoilValue(productState)
        
    return(
        //  ケース表示のエリア 
        <div id={styles.case_view}>
            {/* デザインが選ばれていないとき */}
            {product_info.product_place === "" ?
                <Image src={device == "iPhone" ? "/iPhone" + iPhons.iPhonX : Androids.Xperia} alt="スマホ" width={500} height={579}/>
                :
                <Image src={  
                            device === "iPhone" ?  product_info.product_place + iPhons.iPhonX :  product_info.product_place + Androids.Xperia
                        } alt="スマホ" width={500} height={579}
                />
            }
        </div>        
    )
}
export default React.memo(Case_view);