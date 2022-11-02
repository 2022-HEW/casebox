import type { NextApiRequest, NextApiResponse } from 'next';
import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'
import { useRouter } from "next/router";
import { useEffect } from 'react';
import { GetServerSideProps } from 'next';


import mysql from "serverless-mysql"
import { log } from 'console';

// DB接続
const db = mysql({
  config: {
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,

  }
})

exports.query = async (query: any) => {
  try {
    const results = await db.query(query)
    await db.end()
    return results
  } catch (error) {
    return error
  }

}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
){
  const flg = req.query.sql

  // const router = useRouter()
  // let sql = router.query   
  // //   console.log(sql);
  //   const a = context.query.sql
  //   console.log(a);
  let sql = "";
    switch (flg){
    case "template":
      sql  = `SELECT p.product_ID,p.product_name,p.product_liked,p.product_place,u.user_name,mp.m_product_price,mp.m_product_category FROM t_products p JOIN t_users u ON p.userID = u.userID JOIN t_m_products mp ON p.m_product_ID = mp.m_product_ID`
      break;
    
    case "device":
      sql = `SELECT model_name from t_stocks WHERE model_delete_flg = 0`
      break;


      default:
        console.log("error");
    }
        
    const result = await db.query(sql);
    console.log(typeof result);
    return res.status(200).json(result)
}

