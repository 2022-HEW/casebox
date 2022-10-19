import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import mysql from "serverless-mysql"
import { log } from 'console'
import Nav from '../components/Nav'
import Box from '../components/Box'


const a = async() =>{
   const d:Object  = await(await fetch("api/test")).json() 
   console.log(d);
   return d
} 


const Home: NextPage = () => {
  

//  const b:any = a()
//  console.log(b);

  return (

    <div className={styles.container}>
      {/* {Object.keys(b).map((c:any)=>{
        console.log(c);
        return c.odh_No
      })} */}
      <Box/>
      <Nav />
      
    </div>
  )
}

export default Home
