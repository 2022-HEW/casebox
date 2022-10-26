import styles from "../styles/modal.module.css"
import { ReactNode } from "react"

const Modal =(props:{children?:ReactNode})=>{
    return(
        <>
        <div className={styles.overlay}></div>
        <div className={styles.modal_box}>
            {props.children}
        </div>
        </>
    )
}
export default Modal