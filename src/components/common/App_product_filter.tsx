import React,{Dispatch, SetStateAction, useEffect, useReducer, useState} from 'react'
import styles from "../../styles/app_search.module.css"
import Image from 'next/image'
import Modal from './App_modal'
import { useRecoilState } from 'recoil'
import { modalState } from '../../atoms/app_atoms'


type Product ={
    product_ID:number,
    product_name:string,
    product_liked:number,
    product_place:string,
    m_product_category:string,
    m_product_price:number,
}

export const App_product_filter = ({product}:{product:never[]}) => {
    
    const [filter,setFilter] = useState("人気順");
    const [modal,setModal] = useRecoilState(modalState)
    // console.log(filter);


    // 降順sort
    
    const Rank = () =>{
        product.sort((el1:Product,el2:Product)=>{
            if(el1.product_liked < el2.product_liked){
                return 1;
            }
            if (el1.product_liked > el2.product_liked) {
                return -1;
            }
            return 0
        }) ;
        console.log("a");
    }

    useEffect(()=>{
        switch (filter){
            case "人気順":
                Rank()
                console.log("a");
            break;

            
            default:
                console.log("error");
        }
    },[filter])
  return (
    <>
        <div className={styles.result_header}>
            <p>人気順</p>
            <Image width={15} height={15} src={"/image/filter.svg"} onClick={()=>setModal(true)}/>
        </div>
        <Modal>
            <FilterBox setFilter={setFilter}/>
        </Modal>
    </>
  )
}
type Filter ={
    setFilter:Dispatch<SetStateAction<string>>
}
const FilterBox=({setFilter}:Filter)=>{
    type Props={
        label:string
    }
    
    const Select = ({label}:Props) =>{
        return(
            <div>
                <div>
                    <label>
                        {label}
                        {/* <input value="" type="checkbox" style={{display:"none"}}/> */}
                        <input value={label} type="radio" name='filter' onChange={(e)=>{setFilter(e.target.value)}}/>
                    </label>
                </div>
            </div>
        )
    } 

    return(
        <div className={styles.modal}>
            <p>並び替え</p>
            <Image width={10} height={10} src="/image/cancel.svg"/>
            <div>
                <Select label="人気順"/>
                <Select label="新着順"/>
                <Select label="価格が安い順"/>
                <Select label="価格が高い順"/>
            </div>
        </div>
    )
}