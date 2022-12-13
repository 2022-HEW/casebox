import React,{useReducer} from 'react'
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
    
    const reducer = (state:any, action:any) => {
        switch(action.type) {
            case "ACTION_TYPE":
              return action.content
            case "ACTION_TYPE_NUMBER" :
              return action.content
            default:
              state
          }
    };
    const [state,dispatch] = useReducer(reducer,"初期値");
    const [modal,setModal] = useRecoilState(modalState)

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
  return (
    <>
        <div className={styles.result_header}>
                    <p>人気順</p>
                    <Image width={15} height={15} src={"/image/filter.svg"} onClick={()=>setModal(true)}/>
        </div>
        <Modal>

        </Modal>
    </>
  )
}
