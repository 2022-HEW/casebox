import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/wait.module.css'
import mysql from "serverless-mysql"
import { log } from 'console'
import Nav from '../components/common/Nav'
import Box from '../components/common/Box'
import Link from 'next/link'
import Movie from '../components/common/Movie'



const Home: NextPage = () => {
  
  

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
            <Movie movieUrl='./movie/top.mov'></Movie>
          </div>
      </Link>

  )
}
export default Home
