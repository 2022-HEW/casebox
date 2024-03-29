import styles from "../../../styles/app_modal.module.css"
import { ReactNode,useState } from "react"
import { log } from "console"
import { useRecoilState } from "recoil";
import { modalState } from '../../../atoms/atoms';

type Props ={
    children?:ReactNode,
    // modal_flg:boolean,
    // setModal:React.Dispatch<React.SetStateAction<boolean>>
}

// const Modal =({modal_flg,setModal,children}:Props)=>{
    const Modal =({children}:Props)=>{
        const[modal,setModal] = useRecoilState(modalState) 
    
    return(
        modal ?
        (
            <>
                <div className={styles.overlay} onClick={()=>setModal(!modal)}></div>
                    {children}
            </>
            )
        :
        (
            <></>
        )
        
    )
}
export default Modal