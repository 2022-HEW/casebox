import { type } from 'os'
import React from 'react'
import styles from "../../styles/app_header.module.css"
import Image from "next/image"
import { useRouter } from 'next/router'
type Props ={
    label?:string
}

const App_header = ({label}:Props) => {
    const router = useRouter()
  return (
    <div className={styles.header}>
        <div className={styles.back} onClick={()=>{router.back()}}>
            <Image src={"/image/back.svg"} width={20} height={20}/>
        </div>
        <p>{label}</p>
    </div>
  )
}
export default  App_header