import styles from '../styles/device_select.module.css';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useRouter } from'next/router'
import { useRecoilValue } from "recoil";
import { productState } from '../atomes/atoms';
import Image from "next/image"


type Props = {
    model_names:string[]
    model_colors:{
        [props:string]:any
    }
    type_index:number
    select_device:string
   
};

const Case_view = ({model_names,select_device,type_index,model_colors}:Props) =>{
    const router = useRouter()
    const product_info = useRecoilValue(productState)
    const [color_index,setColor] = useState(model_colors[model_names[type_index] + "(1)"])
    console.log(model_colors);
    


    useEffect(()=>{
        setColor(model_colors[model_names[type_index] + "(1)"])
        console.log(model_names);
    },[])
   

        // console.log(product_info);
        // console.log(iPhone_colors);
        // console.log(types);
        
        
    return(
        //  ケース表示のエリア 
        <div id={styles.case_view}>
            {/* <Image src={select_device == "iPhone" ? `/iPhone/${iPhones[type_index]}/${iPhone_colors[color_index]}.png`  : `/Android/${Androids[0]}.png`} alt="スマホ" width={500} height={579} objectFit='contain'/> */}
            <Image src={`/${select_device}/${model_names[type_index]}/${color_index}.png`} alt="スマホ" width={500} height={579} objectFit='contain'/>
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