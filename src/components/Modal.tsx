import styles from "../styles/modal.module.css"
import { ReactNode,useState } from "react"
import { log } from "console"

type Props ={
    children?:ReactNode,
    modal_flg:boolean,
    setModal:React.Dispatch<React.SetStateAction<boolean>>
}

const Modal =({modal_flg,setModal,children}:Props)=>{
    
    return(
        modal_flg ?
        (
            <>
                <div className={styles.overlay} onClick={()=>setModal(!modal_flg)}></div>
                <div className={styles.modal_box}>
                    {children}
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