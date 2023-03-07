import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/wait.module.css'
import mysql from "serverless-mysql"
import { log } from 'console'
import Nav from '../components/main/common/Nav'
import Box from '../components/main/common/Box'
import Link from 'next/link'
import Movie from '../components/main/index/Movie'
import React from 'react'
import { handleSpeech,} from '../utils'



const Home: NextPage = () => {
  
  

  return (
      <Box >
        <Wait/>
      </Box>          
  )
}

const Wait=()=>{
    
  return(
      <Link href={"/main/service_select"}>
          <div className={styles.movie_area}  onClick={()=>{handleSpeech("いらっしゃいませ。")}}>
            <Movie movieUrl='./movie/top.mov'></Movie>
          </div>
      </Link>
  )
}
export default Home
