import styles from '../styles/device_select.module.css';
import Image from 'next/image';
import React, { SetStateAction, useEffect, useState } from 'react';
import { useRouter } from'next/router'
import { useRecoilValue } from "recoil";
import { productState } from '../pages/atoms';


type Props = {
    select_device:string
}

const Case_view = ({select_device}:Props) =>{
    const router = useRouter()
    const product_info = useRecoilValue(productState)
    const [product_types, setProduct] = useState([])
    const [sql_flg, setSql]= useState("device");
    const [iPhones,setiPhones] = useState([]);
    const [Androids,setAndroids] = useState([]);

    const iPhones_get:any=[]
    const Androids_get:any = []

     // DBから取得
     useEffect(() => {
        const fetchProduct = async () => {
            const response = await fetch(`/api/Sql?sql=${sql_flg}`)
            const data = await response.json()
                // setProduct(data)
                for(let value of data){
                    if(value.model_name.match("iPhone")){
                        iPhones_get.push(value.model_name)
                    }else{
                        Androids_get.push(value.model_name)
                    }
                    // console.log(value.model_name);
                }
                setiPhones(iPhones_get)
                setAndroids(Androids_get)
            // console.log(iPhones_get);
            // console.log(Androids_get);
            // console.log(product_types);
        }        
        fetchProduct()
    },[])
        
    return(
        //  ケース表示のエリア 
        <div id={styles.case_view}>
            <Image src={select_device == "iPhone" ? `/iPhone/${iPhones[0]}.svg`  : `/Android/${Androids[0]}.png`} alt="スマホ" width={500} height={579} objectFit='contain'/>
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