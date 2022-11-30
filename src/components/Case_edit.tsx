import styles from '../styles/device_select.module.css';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { tabState } from '../atoms/atoms';
import { useRecoilState,useRecoilValue } from "recoil";
import { 
        productState,modalState,stepState, 
        toolState,sizeState,colorState,downloadState
        } from '../atoms/atoms';
import React from 'react';
import { useRouter } from 'next/router';
import  {Button}  from "./common/Button"
import Image from 'next/image';

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
    const [colorPallet,setColorPallet] = useState(false); 
    const reset = {
        m_product_category:"",
        m_product_price:1500,
        product_ID:0,
        product_liked:0,
        product_name:"",
        product_place:"",
        user_name:"",
    }
    // 機種を入れる
    useEffect(()=>{
        setProduct((before)=>({...before,model_id:model_colors[model_names[type_index] + "_id"]}));  
        console.log(model_colors);
              
    },[model_names[type_index]])
    /**
     * step1
     * @returns 
     */
    console.log(product.model_id);
    
    
    const Device = () =>{
        //戻るボタンの耐対策 
        // if(type_index){
        //     setType(0)
        //     console.log("type_index" +  type_index);   
        // }
        return(
                <div>
                    <p >デバイスをお選びください</p>
                    <div style={{display:"flex",justifyContent: "space-evenly"}}>                    
                        <label htmlFor="Android" className={styles.type}>
                            <Image src={"/image/android.svg"} width={150} height={150}/>
                            <span className={styles.type_name}>Android</span>
                        </label>
                        <input type="radio" value="Android" name='device' id='Android' onChange={(e)=>setDevice(e.target.value)}/>                    
                        <label htmlFor="iPhone" className={styles.type}>
                            <Image src={"/image/android.svg"} width={150} height={150}/>
                            <span className={styles.type_name}>iPhone</span>
                        </label>
                        <input type="radio" value="iPhone" name='device' id='iPhone' onChange={(e)=>setDevice(e.target.value)} />
                    </div>
                    <div className={styles.button}>
                        <Button onClick={()=>setStep(2)} label="次へ" situ_name="screen"/>
                    </div>
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
                            <div key={index} className={styles.list}>    
                                <label htmlFor={value}>{value}</label>
                                <input type="radio" value={index} name={value} id={value} 
                                onChange={(e)=>setType(Number(e.target.value))} />  
                            </div>
                        )
                    })}
                    <div className={styles.button}>
                        <Button onClick={()=>setStep(3)} label="次へ" situ_name="screen"/>
                    </div>
            </>
        )
    }

    /**
     * step3
     * @returns 
     */
    const Color =()=>{
        return(
                <>
                    <p>カラーをお選びください</p>
                    <div style={{display:"flex",flexWrap: "wrap",justifyContent: "space-evenly"}}>
                    {Object.keys(model_colors).map((value:any,index)=>{
                        // console.log(value);
                        
                        // console.log(product);                        
                        // console.log(model_colors);
                        // console.log();
                        
                        if(value.includes(`${model_names[type_index]}(`) && !value.includes("_code")){   
                            return(
                                <>
                                <div key={value} className={styles.color_select}>    
                                    <label htmlFor={value} >{model_colors[value]}</label>
                                    <input type="radio" value={model_colors[value]} name={value} id={value} onChange={(e)=>setColor(e.target.value)}/>
                                    <div className={styles.color_view} style={{background:`${value.color_code}`}}></div>
                                </div>
                                {/* 改行 */}
                                    {index % 2 === 0 && index!=0 &&
                                        <div style={{width:"100%"}} id={`${index}`}></div>
                                    }
                                </>
                            )
                        }
                        })
                    }
                    </div>
                
                    
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

            const ToolDetail = ()=>{

                return(
                <>
                </>)
            }
            
            
            return(
            <div className={styles.draw_edit_box}>    
                <div className={styles.tool_box}>
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
                    <div style={{display:"flex"}} onClick={()=>{setColorPallet(!colorPallet)}}>
                        <div className={styles.color_trigger}></div> 
                        <p className={styles.serv_guide}>カラー</p>
                    </div>
                    <div style={{display:"flex"}}>
                        <input type="radio"  id="small" name="weight" className={styles.weight} value={10} onChange={(e) => {setSize(Number(e.target.value));}} /> 
                        <label htmlFor='small' className={styles.label}>◯</label>
                        <input type="radio"  id="normal" name="weight" className={styles.weight} value={20} onChange={(e) => {setSize(Number(e.target.value));}} /> 
                        <label htmlFor='normal' className={styles.label}>◯</label>
                        <input type="radio"  id="bold" name="weight" className={styles.weight} value={30} onChange={(e) => {setSize(Number(e.target.value));}} /> 
                        <label htmlFor='bold' className={styles.label}>◯</label>
                        <p className={styles.serv_guide}>太さ</p>
                    </div>

                    <div onClick={()=>{
                        setTool("pen");
                    }}>
                        <p className={styles.serv_guide}>えんぴつ</p>
                    </div>
                    <div onClick={()=>{
                        setTool("eraser");
                    }}>
                        <p className={styles.serv_guide}>消しゴム</p>
                    </div>
                </div>
                    <ColorPallet/>
                    <div className={styles.nextbutton}>
                        <Button onClick={()=>setDownload(true)} label="次へ" situ_name="screen"/>
                    </div>
                </div>
            )
        }
    
    
const ColorPallet = ()=>{
    const colors = ["#000","#FF7C7C","#FFCA7A","#FCFF7D","#F1FF9A",
                    "#FFCA7A","#FCFF7D","#F1FF9A","#A1FF81","#95FFF9",
                    "#52B576","#8BC7FF","#B479FF","#FC7BFF","#FFBEED",
                    "#F9F0C5","#999999","#EBEBEB"]

    return(
    <div className={styles.color_pallet}>
        {colors.map((value:string,index:number)=>{
            return (
                <div key={index} >
                    <label style={{background:`${value}`}} className={styles.color_category}>
                        　
                        <input type="radio" name='color' value={value} id={`${index}`} onChange={(e)=>setDrawcolor(e.target.value)}/>
                    {index === 8 && <br/>}
                    </label>
                </div>
            )
        }
        )}
    </div>)
}

    return(
        //  デバイスを選択するエリア(コンポーネントに分ける) 
        <div id={styles.case_edit}>
            <h1>商品</h1>
            <div className={styles.tryangle}>
                <Image src={"/image/tryangle.svg"}width={50} height={50}/>
            </div>
            
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


export default React.memo(Case_edit)