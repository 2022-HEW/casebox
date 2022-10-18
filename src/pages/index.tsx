import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import mysql from "serverless-mysql"
import { log } from 'console'
import Nav from '../components/nav'


const a = async() =>{
   const d:Object  = await(await fetch("api/test")).json() 
   console.log(d);
   return d
} 


const Home: NextPage = () => {
  
<<<<<<< HEAD
//  const b:any = a()
//  console.log(b);

=======
 const b:any = a()
 console.log(b);
 
>>>>>>> 10279d78b841a2ba5de84c232146961b94d76140
  return (

    <div className={styles.container}>
      {/* {Object.keys(b).map((c:any)=>{
        console.log(c);
        return c.odh_No
      })} */}
      <Nav/>
      
    </div>
  )
}

export default Home
