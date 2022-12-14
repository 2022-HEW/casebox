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
    
    const [filter,setFilter] = useState("人気順");
    const [modal,setModal] = useRecoilState(modalState)
    // console.log(filter);
    
    async function fetcher(url: string): Promise<boolean | null > {
        const response = await fetch(url);
        return response.json();
    }

    const useRank  = () => {
        const { data, error } = useSWR<any>(`/api/app_sql?sql=filter&&filter=p.product_liked desc`, fetcher)
        return {
            rank: data,
            isLoading: !error && !data,
            isError: error
        }
    }
    const useNew  = () => {
        const { data, error } = useSWR<any>(`/api/app_sql?sql=filter&&filter=p.product_change_time desc`, fetcher)
        return {
            new_time: data,
            isLoading: !error && !data,
            isError: error
        }
    }
    const {rank} = useRank()
    const {new_time} = useNew()
    
    useEffectCustom(()=>{
        switch (filter){
            case "人気順":
                setProduct(rank)
            break;

            case "新着順":
                setProduct(new_time)
                console.log(filter);
                
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
            <p>並び替え</p>
            <Image width={10} height={10} src="/image/cancel.svg" onClick={()=>setModal(false)}/>
            <div>
                <Select label="人気順"/>
                <Select label="新着順"/>
                <Select label="価格が安い順"/>
                <Select label="価格が高い順"/>
            </div>
        </div>
    )
}