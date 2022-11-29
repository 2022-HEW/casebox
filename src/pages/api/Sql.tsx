import type { NextApiRequest, NextApiResponse } from 'next';
import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import { useRouter } from "next/router";
import { useEffect } from 'react';
import { GetServerSideProps } from 'next';


import { log } from 'console';
import mysql from "serverless-mysql"

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
  
  // price=m_product_price&&productID=product_ID&&modelID=model_id
  const flg = req.query.sql
  const price = req.query.price
  const productID = req.query.productID
  const modelID = req.query.modelID

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
      sql = `SELECT model_name from t_stocks`
      // sql = `SELECT s.model_name,c.color_name from t_color_relation r JOIN t_stocks s ON s.model_ID = r.model_ID JOIN t_product_colors c ON c.color_ID = r.color_ID WHERE s.model_delete_flg = 0;`
      break;

    case "color":
      sql = `SELECT s.model_id,s.model_name,c.color_name from t_color_relation r JOIN t_stocks s ON s.model_ID = r.model_ID JOIN t_product_colors c ON c.color_ID = r.color_ID WHERE s.model_delete_flg = 0;`
      break;
    
    case "buy_data":
      sql=`INSERT INTO t_buys( product_id, buy_created, buy_money, model_id) VALUES (${productID},NOW(),${price},${modelID})`
      break;

    case "stock_data":
      sql=`SELECT model_stock_standard,model_id  from t_stocks `
      break;
      
    default:
      console.log("error");
    }
        
    const result = await db.query(sql);
    console.log(typeof result);
    return res.status(200).json(result)
}

