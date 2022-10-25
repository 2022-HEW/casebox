import { ReactNode } from 'react'
import Link from 'next/link'
import styles from "../styles/wait.module.css"
const Wait=()=>{
    return(
    <Link href={"./service_select"}>
        <div className={styles.movie}>

        </div>
        
    </Link>)
}
export default Wait 