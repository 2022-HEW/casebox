import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import mysql from "serverless-mysql"
import { log } from 'console'
import Nav from '../components/common/Nav'
import Box from '../components/common/Box'
import Wait from '../components/Wait'


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

export default Home
