import styles from "../../styles/box.module.css"
import { ReactNode, useEffect } from 'react';
import { useRouter } from "next/router";

const Box = ({ children}:{children:ReactNode}) =>{
    const router = useRouter()
    
    return (
        <>
        <div id={styles.box} >
            <div id={styles.screen_on}>
                {children}
            </div>
        </div>
        </>
    )
}

export default Box;