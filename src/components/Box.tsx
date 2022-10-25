import styles from "../styles/box.module.css"
import { ReactNode } from 'react';
import Link from "next/link";

const Box = (props: { index: boolean;children?: ReactNode}) =>{
    return (
        <>
        {/* indexのみ画面タップで遷移する */}
        {props.index ?
            <div id={styles.box} >
                <Link href="./service_select">
                    <div id={styles.screen_on}>
                        {props.children}
                    </div>
                </Link>
            </div>
        :
        <div id={styles.box} >
            <div id={styles.screen_on}>
                {props.children}
            </div>
        </div>
        
        }
        </>
    )
}

export default Box;