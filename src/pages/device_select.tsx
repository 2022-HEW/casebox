import styles from '../styles/device_select.module.css';
import Box from '../components/common/Box';
import Nav from '../components/common/Nav';
import { SetStateAction, useEffect, useRef, useState } from 'react';
import Case_view from '../components/Case_view';
import Case_edit from '../components/Case_edit';
import useSWR from 'swr';
import { useRecoilState,useRecoilValue } from "recoil";
import { productState,stepState,tabState} from '../atoms/atoms';
import React from 'react';




const DeviceSelect = () => {
    interface Color{
        [props:string]:any
    }
    
    async function fetcher(url: string): Promise<boolean | null > {
        const response = await fetch(url);
        return response.json();
    }
    const [select_device, setDevice] = useState("iPhone")  
    const [color_index,setColor] = useState("");
    const [type_index,setType] = useState(0);
    const [step,setStep]  = useRecoilState(stepState)
    const tab = useRecoilValue(tabState);
    const [product,setProduct] = useRecoilState(productState);
    const reset = {
        m_product_price:1500,
        product_ID:null,
        product_name:"",
        product_place:"",
        // model_id:0
    }

    // タブを移動した際リセット
    useEffect(()=>{
        if(tab === "手書き"){
            setProduct((before)=>({...before,reset}))
            setDevice("iPhone")
            setType(0)
        }
            setStep(1)
    },[tab])

    
    /**
     * DBから取得
     * @returns iPhone_model_names,Android_model_names,
     * iPhone_model_colors,Android_model_colors
     */
    const { data } = useSWR<any>(`/api/Sql?sql=color`,fetcher) 
    if(!data) return (<Box><Nav><></></Nav></Box>)

    const getProduct =()=>{
        const iPhone_model_names:Array<string> = []
        const Android_model_names:Array<string> = []
        const iPhone_model_colors:Color = new Object 
        const Android_model_colors:Color = new Object 
        let i:number = 1 

        if(data){
            for(let value of data){
                // console.log(value);
                
                // 重複の判定
                // していないとき
                if(!iPhone_model_names.includes(value.model_name) && !Android_model_names.includes(value.model_name) ){
                    i=1;                    
                    if(value.model_name.includes("iPhone")){
                        iPhone_model_names.push(value.model_name)
                        iPhone_model_colors[value.model_name+ `(${i})`] = value.color_name
                        iPhone_model_colors[value.model_name + "_id"] = value.model_id
                    }else{
                        Android_model_names.push(value.model_name)
                        Android_model_colors[value.model_name+ `(${i})`] = value.color_name
                        Android_model_colors[value.model_name + "_id"] = value.model_id
                    }
                }else{
                    i++;
                    if(value.model_name.includes("iPhone")){
                        iPhone_model_colors[value.model_name + `(${i})`] = value.color_name
                    }else{
                        Android_model_colors[value.model_name + `(${i})`] = value.color_name
                    }
                }
            }
        }
        return{
            iPhone_model_names:iPhone_model_names,
            Android_model_names:Android_model_names,
            iPhone_model_colors:iPhone_model_colors,
            Android_model_colors:Android_model_colors,
        }        
    }

    const {iPhone_model_names,Android_model_names,iPhone_model_colors,Android_model_colors}= getProduct()   


    // console.log(iPhone_model_names);
    // console.log(Android_model_names);
    // console.log(iPhone_model_colors);
    // console.log(Android_model_colors);
    return(
        <Box>
            <Nav>
                <div id={styles.wrap}>
                    <Case_view  model_names={select_device === "iPhone" ? iPhone_model_names:Android_model_names} 
                    model_colors={select_device === "iPhone" ? iPhone_model_colors:Android_model_colors} 
                    select_device={select_device} type_index={type_index} color_index={color_index} setColor={setColor}
                    />

                    <Case_edit model_names={select_device === "iPhone" ? iPhone_model_names:Android_model_names} 
                    model_colors={select_device === "iPhone" ? iPhone_model_colors:Android_model_colors} 
                    select_device={select_device} type_index={type_index} color_index={color_index}setDevice={setDevice} setType={setType} 
                    setColor={setColor} />
                </div>
            </Nav>
        </Box>
    )
}

export default React.memo(DeviceSelect);