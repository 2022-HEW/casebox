import React from 'react'
import Box from '../../components/main/common/Box'
import Nav from '../../components/main/common/Nav'
import styles from "../../styles/help.module.css"
import Image from 'next/image'
import { NextPage } from 'next'
const Help:NextPage = () => {
    const answer:string[]=["CASEBOXチャットサポートです。どのようなことでお困りでしょうか"]
    return (
        <Box>
            <Nav>
                <Header/>
                <Answer answer={answer[0]}></Answer>
                <Questions/>
            </Nav>
        </Box>
    )
}


const Header = ()=>{
    return(
        <div className={styles.header}>
            <p>CASE BOX サポートチーム</p>
        </div>
    )
}

type Props={
    answer:string
}
const Answer = ({answer}:Props)=>{
    return(
        <div className={styles.answer}>
            <Image src={"/image/answer.svg"} width={70} height={70}/>
            <p>{answer}</p>
        </div>
    )
}

const Questions = ()=>{
    return(
        <div className={styles.question}>
            <span>CASE BOXについて</span>
        </div>
    )
}
export default Help 