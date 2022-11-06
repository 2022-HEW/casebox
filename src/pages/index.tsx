import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/wait.module.css'
import mysql from "serverless-mysql"
import { log } from 'console'
import Nav from '../components/common/Nav'
import Box from '../components/common/Box'
import Link from 'next/link'



const Home: NextPage = () => {
  
  const main= async()=>{

    const describeURL = 'https://raw.githubusercontent.com/Azure-Samples/cognitive-services-sample-data-files/master/ComputerVision/Images/celebrities.jpg';
    const features = ['Categories','Brands','Adult','Color','Description','Faces','Image_type','Objects','Tags'];
    const domainDetails = ['Celebrities','Landmarks'];
  }
//  const b:any = a()
//  console.log(b);


  return (
      // <Box >
      //   <Wait/>
      // </Box>          
      <>
      </>
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
