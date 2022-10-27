import styles from "../styles/box.module.css"
import { ReactNode } from 'react';
import Link from "next/link";
type Props ={
    index:boolean;
    children?:ReactNode;
}

const Box = ({ index,children}:Props) =>{
    return (
        <>
        {/* indexのみ画面タップで遷移する */}
        {index ?
            <div id={styles.box} >
                <Link href="./service_select">
                    <div id={styles.screen_on}>
                        {children}
                    </div>
                </Link>
            </div>
        :
        <div id={styles.box} >
            <div id={styles.screen_on}>
                {children}
            </div>
        </div>
        
        }
        </>
    )
}

export default Box;