import React from 'react'
import App_nav from '../../components/common/App_nav'
import Image from 'next/image'
import styles from "../../styles/app_service_select.module.css"
import Link from 'next/link'
import { NextPage } from 'next'

const app_service_select:NextPage = () => {

  return (

    <div className={styles.container}>
        <App_nav/>
        <div className={styles.event}>
            <Image src="/image/app_event.svg"  width={300}  height={300}/>
        </div>
        <Column title={"CASEBOXについて"} flg={"info"}/>
        <Footer/>
    </div>
  )
}

type Column = {
    title:string
    flg:"service" | "info"
}
type Card = {
    title:string,
    src:string,
    url:string
    flg:"service" | "info"
}
const Column = ({title,flg}:Column) =>{
    return(
        <div className={styles.box}>
            <h2>{title}</h2>       
                <div>
                    <Card title={"アプリについて"} src={""} url={"app_app_info"} flg={flg}/>
                    <Card title={"自販機について"} src={""} url={"app_casebox_info"} flg={flg}/>
                </div>
        </div>
    )
}

const Card =({title,src,url,flg}:Card)=>{
    return(
        <Link href={url}>
            <div className={flg=== "service" ?styles.service_card:styles.info_card}>
                <Image src={src}/>
                <p>{title}</p>
            </div>
        </Link>

    )
}

const Footer = () =>{
    return(
        <footer>
            <Link href={""}>利用規約</Link>
            <span>|</span>
            <Link href={""}>プライバシーポリシー</Link>
        </footer>
    )

}
export default app_service_select