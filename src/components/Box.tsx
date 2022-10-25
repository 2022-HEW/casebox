import styles from "../styles/box.module.css"
import { ReactNode } from 'react';



const Box = ({children }:{ children?: ReactNode;}) =>{
    return(
        <div id={styles.box}>
            <img src="./Box/screen.svg" id={styles.screen} />
            <div id={styles.screen_on}>
                {children}
            </div>
        </div>
    )
}

export default Box;