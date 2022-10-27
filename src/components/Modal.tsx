import styles from "../styles/modal.module.css"
import { ReactNode,useState } from "react"
import { log } from "console"

type Props ={
    children?:ReactNode,
    modal_flg:boolean,
    setModal:React.Dispatch<React.SetStateAction<boolean>>
}

const Modal =(props:Props)=>{
    
    return(
        props.modal_flg ?
        (
            <>
                <div className={styles.overlay} onClick={()=>props.setModal(!props.modal_flg)}></div>
                <div className={styles.modal_box}>
                    {props.children}
                </div>
            </>
            )
        :
        (
            <></>
        )
        
    )
}
export default Modal