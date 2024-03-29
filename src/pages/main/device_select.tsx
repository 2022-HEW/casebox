import styles from '../../styles/device_select.module.css';
import Box from '../../components/main/common/Box';
import Nav from '../../components/main/common/Nav';
import { SetStateAction, useEffect, useRef, useState } from 'react';
import Case_view from '../../components/main/device_select/Case_view';
import Case_edit from '../../components/main/device_select/Case_edit';
import useSWR from 'swr';
import { useRecoilState,useRecoilValue } from "recoil";
import { productState,stepState,tabState,stockState} from '../../atoms/atoms';
import React from 'react';
import { NextPage } from 'next';
import { fetcher } from '../../utils';
import { modalState } from '../../atoms/atoms';
import { downloadState } from '../../atoms/atoms';



const DeviceSelect:NextPage = () => {
    interface Color{
        [props:string]:any
    }
    
   
    const [select_device, setDevice] = useState("iPhone")  
    const [color_index,setColor] = useState("");
    const [type_index,setType] = useState(0);
    const [step,setStep]  = useRecoilState(stepState)
    const tab = useRecoilValue(tabState);
    const [product,setProduct] = useRecoilState(productState);
    const [stock,setStock] = useRecoilState(stockState)
    const [modal,setModal] =useRecoilState(modalState)
    
    useEffect(()=>{
        // console.log(iPhone_model_colors);
        console.log(color_data);
        
    })
    // タブを移動した際リセット
    useEffect(()=>{
        if(tab === "手書き"){
            setProduct((before)=>({
                ...before,
                m_product_price:2000,
                product_ID:null,
                product_name:"",
                product_place:"",
            }))
            setDevice("iPhone")
            setType(0)
        }
            setStep(1)
            setModal(false)
    },[tab])

    function getDB (query:string) {
        const { data, error } = useSWR(`/api/Sql?sql=${query}`, fetcher)
      
        return {
          data: data,
          isLoading: !error && !data,
          isError: error
        }
      }

    const stock_data:any = getDB("stock_data")

    if(stock_data){
        setStock(stock_data.data)
        // console.log(stock);
    } 
    
    /**
     * DBから取得
     * @returns iPhone_model_names,Android_model_names,
     * iPhone_model_colors,Android_model_colors
     */
    // const { data } = useSWR<any>(`/api/Sql?sql=color`,fetcher) 
    const color_data:any = getDB("color").data
    // console.log(color_data);
    
    if(!color_data) return (<Box><Nav><></></Nav></Box>)

    const getProduct =()=>{
        const iPhone_model_names:Array<string> = []
        const Android_model_names:Array<string> = []
        const iPhone_model_ids:Array<number> = []
        const Android_model_ids:Array<number> = []

        const iPhone_model_colors:Color = new Object 
        const Android_model_colors:Color = new Object 
        let i:number = 1 

        if(color_data){
            for(let value of color_data){
                // console.log(value);
                
                // 重複の判定
                // していないとき
                
                if(!iPhone_model_ids.includes(value.model_id) && !Android_model_ids.includes(value.model_id)){
                    i=1;               
                    console.log(iPhone_model_ids);
                    console.log(value.model_id);
                         
                    if(value.model_name.includes("iPhone")){
                        iPhone_model_names.push(value.model_name)
                        iPhone_model_ids.push(value.model_id)
                        iPhone_model_colors[value.model_name+ `(${i})`] = value.color_name
                        iPhone_model_colors[value.model_name + "_id"] = value.model_id
                        iPhone_model_colors[value.model_name + `(${i})_code`] = value.color_code
                    }else{
                        Android_model_names.push(value.model_name)
                        Android_model_ids.push(value.model_ids)
                        Android_model_colors[value.model_name+ `(${i})`] = value.color_name
                        Android_model_colors[value.model_name + "_id"] = value.model_id
                        Android_model_colors[value.model_name + `(${i})_code`] = value.color_code

                    }
                }else{
                    i++;
                    if(value.model_name.includes("iPhone")){
                        iPhone_model_colors[value.model_name + `(${i})`] = value.color_name
                        iPhone_model_colors[value.model_name + `(${i})_code`] = value.color_code
                    }else{
                        Android_model_colors[value.model_name + `(${i})`] = value.color_name
                        Android_model_colors[value.model_name + `(${i})_code`] = value.color_code
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


    // console.log(Android_model_names);
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