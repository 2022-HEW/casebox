import { ReactNode } from 'react'
import Link from 'next/link'
import styles from "../styles/wait.module.css"
import { useRef } from 'react'

const Wait=()=>{
    
    return(
        <Link href={"/service_select"}>
            <div className={styles.movie_area}>
            </div>
        </Link>

    )
}
export default Wait 