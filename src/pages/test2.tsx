import dynamic from "next/dynamic";
import { useState } from "react";
import styles from "../styles/test.module.css"
const a = ()=>{

    const [hover,setHover]=useState(false)

    

    return(
        <>
            <div className={styles.up}></div>
            <img src="./image/test.svg" className={styles.b}></img>
            <img src = "./image/test2.svg" className={styles.a}/>
        </>
    )
}

export default a