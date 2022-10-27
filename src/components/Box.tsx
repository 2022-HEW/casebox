import styles from "../styles/box.module.css"
import { ReactNode } from 'react';

const Box = ({ children}:{children:ReactNode}) =>{
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