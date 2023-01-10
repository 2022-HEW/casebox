import React,{Dispatch, SetStateAction, useEffect, useLayoutEffect, useReducer, useState} from 'react'
import styles from "../../styles/app_search.module.css"
import Image from 'next/image'
import Modal from './App_modal'
import { useRecoilState } from 'recoil'
import { modalState } from '../../atoms/app_atoms'
import { log } from 'console'
import useSWR from 'swr'
import useEffectCustom from './useEffectCustom'


type Product ={
    product_ID:number,
    product_name:string,
    product_liked:number,
    product_place:string,
    m_product_category:string,
    m_product_price:number,
}
type Props={
    product:never[]
    setProduct:Dispatch<SetStateAction<never[]>>
}

export const App_product_filter = ({product,setProduct}:Props) => {
    // const a = [...product]
    
    const [filter,setFilter] = useState("");
    const [modal,setModal] = useRecoilState(modalState)
    // console.log(filter);
    

    const useRank  = async() => {
        await fetch(`/api/app_sql?sql=filter&&filter=p.product_liked desc`)
        .then(res=>{return res.json()})
        .then((data)=>{setProduct(data)})
    }
    const useNew  = async() => {
        await fetch(`/api/app_sql?sql=filter&&filter=p.product_change_time desc`)
        .then(res=>{return res.json()})
        .then((data)=>{setProduct(data)})
    }
    const useExpensive  = async() => {
        await fetch(`/api/app_sql?sql=filter&&filter=mp.m_product_price desc`)
        .then(res=>{return res.json()})
        .then((data)=>{setProduct(data)})
    }
    const useCheap  = async() => {
        await fetch(`/api/app_sql?sql=filter&&filter=mp.m_product_price `)
        .then(res=>{return res.json()})
        .then((data)=>{setProduct(data)})
    }
    

    
    useEffectCustom(()=>{
        switch (filter){
            case "人気順":
                useRank()
            break;

            case "新着順":
                useNew()
            break;
            
            case "価格が安い順":
                useCheap()
            break;
            
            case "価格が高い順":
                useExpensive()
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
    const [modal,setModal] = useRecoilState(modalState)
    
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
            <p className={styles.title}><h2>並び替え</h2>
            <Image width={20} height={20} src="/image/cancel.svg" onClick={()=>setModal(false)}/>
            </p>
            <div className={styles.option}>
                <Select label="人気順"/>
                <Select label="新着順"/>
                <Select label="価格が安い順"/>
                <Select label="価格が高い順"/>
            </div>
        </div>
    )
}