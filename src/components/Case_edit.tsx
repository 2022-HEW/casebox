import styles from '../styles/device_select.module.css';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { tabState } from '../pages/atoms';
import { useRecoilState,useRecoilValue } from "recoil";
import { productState } from '../pages/atoms';
// import { useRouter } from'next/router'


type Props = {
    setDevice:Dispatch<SetStateAction<string>>
    setType:Dispatch<SetStateAction<number>>
    iPhones:never[]
    Androids:never[]
    select_device:string
}


const Case_edit =({setDevice,setType,iPhones,Androids,select_device}:Props) =>{
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
// 商品情報をリセット
    useEffect(()=>{
        if(tab === "手書き" && step === "デバイス"){
            setProduct(reset)
        }
    },[tab])

    const Device = () =>{
        return(
                <div>
                    <p>デバイスをお選びください</p>
                    <label htmlFor="iPhone">iPhone</label>
                    <input type="radio" value="iPhone" name='device' id='iPhone' onChange={(e)=>setDevice(e.target.value)} />
                    <label htmlFor="Android">Android</label>
                    <input type="radio" value="Android" name='device' id='Android' onChange={(e)=>setDevice(e.target.value)}/>
                    <p onClick={()=>setStep("機種")}>次へ</p>
                </div>
        )
    }
    const Type = () =>{
        console.log(select_device);
        console.log(iPhones);
        
        return(
            <>
                <p>機種をお選びください</p>
                {select_device === "iPhone" ?
                
                    iPhones.map((value,index)=>{
                        return(
                            <div>    
                                <label htmlFor="iPhone_type">{value}</label>
                                <input type="radio" value={index} name='iPhone_type' id='iPhone_type' onChange={(e)=>setType(Number(e.target.value))} />  
                            </div>
                        )
                    })
                :
                    Androids.map((value,index)=>{
                        return(
                            <div>
                                <label htmlFor="Android_type">{value}</label>
                                <input type="radio" value={index} name='Android_type' id='Android_type' onChange={(e)=>setType(Number(e.target.value))} />  
                            </div>
                        )
                    })
                }
                    <p onClick={()=>setStep("色")}>次へ</p>
            </>
        )}
    
    
    return(
        //  デバイスを選択するエリア(コンポーネントに分ける) 
        <div id={styles.case_edit}>
            <h1>商品</h1>
            
            {step === "デバイス" ?
               <Device />
            : step === "機種" ?
                <Type/>
            : 
                <div>

                </div>
            }
                    
        </div>
    )
}

export default Case_edit