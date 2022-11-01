import styles from '../styles/device_select.module.css';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { tabState } from '../pages/atoms';
import { useRecoilState,useRecoilValue } from "recoil";
import { productState } from '../pages/atoms';
// import { useRouter } from'next/router'


type Props = {
    setDevice:Dispatch<SetStateAction<string>>
}

const Case_edit =({setDevice}:Props) =>{
    // const router = useRouter()
    const [step,setStep]  = useState("デバイス")
    const tab = useRecoilValue(tabState);
    const [product,setProduct] = useRecoilState(productState);
    const reset = {
        m_product_category:"",
        m_product_price:0,
        product_ID:0,
        product_liked:0,
        product_name:"",
        product_place:"",
        user_name:"",
    }
    const iPhones = {}
    const Androids = {}

// 商品情報をリセット
    useEffect(()=>{
        if(tab === "手書き" && step === "デバイス"){
            setProduct(reset)
        }
    },[tab])

    return(
        //  デバイスを選択するエリア(コンポーネントに分ける) 
        <div id={styles.case_edit}>
            <h1>商品</h1>
            
            <p>デバイスをお選びください</p>
            {step === "デバイス" ?
                <div>
                    <label htmlFor="iPhone">iPhone</label>
                    <input type="radio" value="iPhone" name='device' id='iPhone' onChange={(e)=>setDevice(e.target.value)}/>
                    <label htmlFor="Android">Android</label>
                    <input type="radio" value="Android" name='device' id='Android' onChange={(e)=>setDevice(e.target.value)}/>
                    <p onClick={()=>setStep("機種")}>次へ</p>
                </div>
            : step === "機種" ?
                <div>
                    <label htmlFor="iPhone">iPhone</label>
                    <input type="radio" value="iPhone" name='device' id='iPhone' onChange={(e)=>setDevice(e.target.value)}/>
                    <label htmlFor="Android">Android</label>
                    <input type="radio" value="Android" name='device' id='Android' onChange={(e)=>setDevice(e.target.value)}/>
                    <p onClick={()=>setStep("色")}>次へ</p>
                </div>
                // 色
            : 
                <div>

                </div>
            }
                    
        </div>
    )
}

export default Case_edit