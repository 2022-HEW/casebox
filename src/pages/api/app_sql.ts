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
  const flg=req.query.sql
  const where = req.query?.where

  // console.log(like);
  

  // const login = req.query.login
  const {
    login,user_password,
    user_id,
    user_email,
    productID,
    like
  }=req.query
  // const router = useRouter()
  // let sql = router.query   
  // //   console.log(sql);
  //   const a = context.query.sql
  //   console.log(a);
  let sql = "";
    switch (flg){
    case "template":
      sql  = `SELECT p.product_ID,p.product_name,p.product_liked,p.product_place,u.user_name,mp.m_product_price,mp.m_product_category FROM t_products p JOIN t_users u ON p.user_id = u.user_id JOIN t_m_products mp ON p.m_product_ID = mp.m_product_ID`
      break;

    case "login":
      sql  = `SELECT user_id,user_name,user_comment,user_email,user_password,user_image FROM t_users  WHERE user_email = "${login}" `
      break;
  
    case "signup_check":
      sql = `SELECT user_id,user_email from t_users`
      break;

    case "signup":
      sql=`INSERT INTO t_users(user_id, user_name, user_email, user_password, user_image, user_created) VALUES ("${user_id}","Noname","${user_email}",'${user_password}','/image/user_icon.svg',NOW())`
      break;

    case "likecount":
      sql=`SELECT COUNT(product_id) FROM t_likes WHERE  product_id = ${productID}`
      break;

    case "likes":
      sql=`SELECT product_id FROM t_likes WHERE  user_id = "${user_id}"`
      break;

    case "likechange":
        sql=`UPDATE t_products SET product_liked=${like} WHERE product_ID ="${productID}" `
        break;

    case "create_relation":
        sql=`INSERT INTO t_likes(product_ID,user_id) VALUES (${productID},"${user_id}")`
        break;

    case "remove_relation":
      sql=`DELETE FROM t_likes WHERE product_ID = ${productID} AND user_id="${user_id}"`
      break;

    default:
      console.log("error");
    }
        
    const result = await db.query(where ? sql + " where " + where:sql);
    return res.status(200).json(result)
}

