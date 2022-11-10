import styles from '../styles/device_select.module.css';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { tabState } from '../atoms/atoms';
import { useRecoilState,useRecoilValue } from "recoil";
import { 
        productState,modalState,stepState, 
        toolState,sizeState,colorState,downloadState
    } from '../atoms/atoms';
import { Color } from 'textalive-app-api';
import React from 'react';
import Modal from './common/Modal';
import { useRouter } from 'next/router';
import  {Button}  from "./common/Button"

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
    color_index:string
    setColor:Dispatch<SetStateAction<string>>
}


const Case_edit =({
    setDevice,setType,model_names,model_colors,
    type_index,select_device,setColor,color_index,
}:Props) =>{
    // const router = useRouter()
    const [step,setStep]  = useRecoilState(stepState)
    const tab = useRecoilValue(tabState);
    const [product,setProduct] = useRecoilState(productState);
    const [modal,setModal] = useRecoilState(modalState);
    const [tool,setTool] = useRecoilState(toolState)
    const [size,setSize] = useRecoilState(sizeState)
    const [drawcolor,setDrawcolor] = useRecoilState(colorState)
    const [download,setDownload] = useRecoilState(downloadState)
    const reset = {
        m_product_category:"",
        m_product_price:1500,
        product_ID:0,
        product_liked:0,
        product_name:"",
        product_place:"",
        user_name:"",
    }
    const router = useRouter()
// タブを移動した際商品情報をリセット
    useEffect(()=>{
        if(tab === "手書き"){
            setProduct(reset)
        }
            setStep(1)
    },[tab])

    /**
     * step1
     * @returns 
     */
    const Device = () =>{
        //戻るボタンの耐対策 
        if(type_index){
            setType(0)
            console.log("type_index" +  type_index);   
        }
        return(
                <div>
                    <p >デバイスをお選びください</p>
                    <label htmlFor="iPhone">iPhone</label>
                    <input type="radio" value="iPhone" name='device' id='iPhone' onChange={(e)=>setDevice(e.target.value)} />
                    <label htmlFor="Android">Android</label>
                    <input type="radio" value="Android" name='device' id='Android' onChange={(e)=>setDevice(e.target.value)}/>
                    <Button onClick={()=>setStep(2)} label="次へ" situ_name="screen"/>
                </div>
        )
    }

    /**
     * step2
     * @returns 
     */
    const Type = () =>{
        // console.log(select_device);
        if(color_index){
            console.log("color_index:" + color_index);
        }
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
                    <Button onClick={()=>setStep(3)} label="次へ" situ_name="screen"/>
            </>
        )
    }

    /**
     * step3
     * @returns 
     */
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
                
                    
                    <Button onClick={()=>{
                        product.product_place === "" ?
                        setStep(4)
                        :
                        setModal(true)
                    }}
                    label="次へ"
                    situ_name='screen'
                    />
                </>
                )}
        /**
         * step4
         */
        const Draw_edit =()=>{
            
            
            return(
            <div className={styles.draw_edit_box}>    
                <div className={styles.tool_box}>
                <select
                    value={size}
                    onChange={(e) => {
                    setSize(Number(e.target.value));
                    }}
                >
                    <option value="3">3</option>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                </select> 
               <button
                id="save"
                onClick={()=>{}}>
                Save as PNG
              </button>
              {/* <button
                onClick={() => {
                  let lastLine = lines[lines.length - 1];
                  setLines([
                      {position:lastLine}
                  ]);
                      }}
              >
                reset
              </button> */}
                    <div>
                        <p>カラー</p>
                    </div>
                    <div>
                        <p>太さ</p>
                    </div>
                    <div onClick={()=>{
                        setTool("pen");
                    }}>
                        <p>えんぴつ</p>
                    </div>
                    <div onClick={()=>{
                        setTool("eraser");
                    }}>
                        <p>消しゴム</p>
                    </div>

                </div>
                    <Button onClick={()=>setDownload(true)} label="次へ" situ_name="screen"/>
                </div>
            )
        }
            
    return(
        //  デバイスを選択するエリア(コンポーネントに分ける) 
        <div id={styles.case_edit}>
            <h1>商品</h1>
            
            {step === 1 ?
               <Device />
            : step === 2 ?
                <Type/>
            : step === 3 ?
                <Color/>
            :
                <Draw_edit/>
            }
                    
        </div>
    )
}

export default Case_edit