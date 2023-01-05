import { type } from 'os'
import React from 'react'
import styles from "../../styles/app_header.module.css"
import Image from "next/image"
import { useRouter } from 'next/router'
type Props ={
    label?:string
    pathname?:string
}

const App_header = ({label,pathname}:Props) => {
    const router = useRouter()
    const handleClickBack=()=>{
      if(pathname){
        router.push({
          pathname:`${pathname}`
        })
      }else{
        router.back()
      }
    }
  return (
    <div className={styles.header}>
        <div className={styles.back} onClick={handleClickBack}>
            <Image src={"/image/back.svg"} width={20} height={20}/>
        </div>
        <p>{label}</p>
    </div>
  )
}
export default  App_header