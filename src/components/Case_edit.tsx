import styles from '../styles/device_select.module.css';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { tabState } from '../atoms/atoms';
import { useRecoilState,useRecoilValue } from "recoil";
import { productState,modalState } from '../atoms/atoms';
import { Color } from 'textalive-app-api';
import React from 'react';
import Modal from './common/Modal';
// import { useRouter } from'next/router'


type Props = {
    setDevice:Dispatch<SetStateAction<string>>
    setType:Dispatch<SetStateAction<number>>
    model_names:Array<string>
    model_colors:{
        [props:string]:any
    }
    type_index:number
    select_device:string
    setColor:Dispatch<SetStateAction<string>>
}


const Case_edit =({setDevice,setType,model_names,model_colors,type_index,select_device,setColor}:Props) =>{
    // const router = useRouter()
    const [step,setStep]  = useState("デバイス")
    const tab = useRecoilValue(tabState);
    const [product,setProduct] = useRecoilState(productState);
    const [modal,setModal] = useRecoilState(modalState);
    const reset = {
        m_product_category:"",
        m_product_price:1500,
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
        // console.log(select_device);
        return(
            <>
                <p>機種をお選びください</p>
                    {model_names.map((value,index)=>{
                        return(
                            <div key={index}>    
                                <label htmlFor={`${select_device}`}>{value}</label>
                                <input type="radio" value={index} name={`${select_device}`} id={`${select_device}`} onChange={(e)=>setType(Number(e.target.value))} />  
                            </div>
                        )
                    })}
                    <p onClick={()=>setStep("色")}>次へ</p>
            </>
        )
    }
    
    const Color =()=>{
            console.log(model_names[type_index]);
            
        return(
                <>
                    <p>カラーをお選びください</p>
                    
                    {Object.keys(model_colors).map((value)=>{
                        if(value.includes(`${model_names[type_index]}(`)){   
                            return(
                                <div key={value}>    
                                    <label htmlFor={`${value}`}>{model_colors[value]}</label>
                                    <input type="radio" value={model_colors[value]} name={`${value}`} id={`${value}`} onChange={(e)=>setColor(e.target.value)} />  
                                </div>
                            )
                        }
                        })
                    }
                
                    
                    <p onClick={()=>setModal(true)}>次へ</p>
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
                <Color/>
            }
                    
        </div>
    )
}

export default Case_edit