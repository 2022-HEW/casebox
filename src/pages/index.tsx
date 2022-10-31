import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/wait.module.css'
import mysql from "serverless-mysql"
import { log } from 'console'
import Nav from '../components/common/Nav'
import Box from '../components/common/Box'
import Link from 'next/link'

const a = async() =>{
   const d:Object  = await(await fetch("api/test")).json() 
   console.log(d);
   return d
} 


const Home: NextPage = () => {
  
//  const b:any = a()
//  console.log(b);


  return (
      <Box >
        <Wait/>
      </Box>          
  )
}

const Wait=()=>{
    
  return(
      <Link href={"/service_select"}>
          <div className={styles.movie_area}>
          </div>
      </Link>

  )
}
export default Home
