import type { NextApiRequest, NextApiResponse } from "next";
import Head from "next/head";
import styles from "../../styles/Home.module.css";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { GetServerSideProps } from "next";

import { log } from "console";
import mysql from "serverless-mysql";

// DB接続
const db = mysql({
  config: {
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
  },
});

exports.query = async (query: any) => {
  try {
    const results = await db.query(query);
    await db.end();
    return results;
  } catch (error) {
    return error;
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // price=m_product_price&&productID=product_ID&&modelID=model_id
  const flg = req.query.sql;
  const where = req.query?.where;

  // console.log(like);

  // const login = req.query.login
  const {
    login,
    loginID,
    user_password,
    user_id,
    user_name,
    user_comment,
    user_email,
    user_image,
    productID,
    product_name,
    product_place,
    like,
    filter,
    product_situation,
  } = req.query;
  // const router = useRouter()
  // let sql = router.query
  // //   console.log(sql);
  //   const a = context.query.sql
  // console.log(user_name);
  let sql = "";
  switch (flg) {
    case "template":
      sql = `SELECT p.product_ID,p.product_name,p.product_liked,p.product_place,p.user_id,p.product_situation, u.user_name,mp.m_product_price,mp.m_product_category FROM t_products p JOIN t_users u ON p.user_id = u.user_id JOIN t_m_products mp ON p.m_product_ID = mp.m_product_ID `;
      break;

    case "login":
      sql = `SELECT user_id,user_name,user_comment,user_email,user_password,user_image FROM t_users  WHERE user_email = "${login}" `;
      break;

    case "insertLogin":
      sql = `INSERT INTO t_logins(user_id,login_time,administer_flg) VALUES ("${user_id}",NOW(),0) `;
      break;

    case "logintime":
      sql = `SELECT MAX(loginID) FROM t_logins WHERE user_id="${user_id}"`;
      break;

    case "logout":
      sql = `UPDATE t_logins SET logout_time=NOW() WHERE loginID ="${loginID}" `;
      break;

    case "signup_check":
      sql = `SELECT user_id,user_email from t_users`;
      break;

    case "signup":
      sql = `INSERT INTO t_users(user_id, user_name, user_email, user_password, user_image, user_created) VALUES ("${user_id}","Noname","${user_email}",'${user_password}','/app/mypage/icon/default.svg',NOW())`;
      break;

    case "likecount":
      sql = `SELECT COUNT(product_ID) FROM t_likes WHERE  product_ID = ${productID}`;
      break;

    case "likes":
      sql = `SELECT l.product_id FROM t_likes l JOIN t_products p ON  p.product_ID = l.product_ID WHERE l.user_id = "${user_id}" AND p.product_situation=1`;
      break;

    case "likechange":
      sql = `UPDATE t_products SET product_liked=${like} WHERE product_ID ="${productID}" `;
      break;

    case "create_relation":
      sql = `INSERT INTO t_likes(product_ID,user_id) VALUES (${productID},"${user_id}")`;
      break;

    case "remove_relation":
      sql = `DELETE FROM t_likes WHERE product_ID = ${productID} AND user_id="${user_id}"`;
      break;

    case "filter":
      sql = `SELECT p.product_ID,p.product_name,p.product_liked,p.product_place,p.product_change_time,p.product_situation,p.user_id,u.user_name,mp.m_product_price,mp.m_product_category FROM t_products p JOIN t_users u ON p.user_id = u.user_id JOIN t_m_products mp ON p.m_product_ID = mp.m_product_ID  WHERE p.product_situation=1 AND u.user_id = "1" ORDER BY ${filter}`;
      break;

    case "favorite":
      sql = `SELECT p.product_ID,p.product_name,p.product_liked,p.product_place,p.product_change_time,p.user_id,u.user_name,mp.m_product_price,mp.m_product_category FROM t_products p JOIN t_users u ON p.user_id = u.user_id JOIN t_m_products mp ON p.m_product_ID = mp.m_product_ID JOIN t_likes l ON l.product_ID = p.product_ID WHERE l.user_id = "${user_id}" AND p.product_situation=1`;
      break;

    case "update_profile":
      sql = `UPDATE t_users SET user_name='${user_name}',user_comment='${user_comment}',user_image='${user_image}' WHERE user_id = "${user_id}"`;
      break;

    case "situation":
      sql = `UPDATE t_products SET product_situation=${product_situation} where product_ID = ${productID}`;
      break;

    case "insert_product":
      sql = `INSERT INTO  t_products(product_name,user_id,product_created,product_place,m_product_ID,product_situation) VALUES("${product_name}","${user_id}",NOW(),"${product_place}",2,${product_situation})`;
      break;

    case "delete_product":
      sql = `DELETE FROM t_products WHERE product_ID = ${productID}`;
      break;

    case "update_product":
      sql = `UPDATE t_products SET product_name='${product_name}',product_situation='${product_situation}' WHERE product_id = "${productID}"`;
      break;

    case "device":
      sql = `SELECT model_name from t_stocks`;
      break;

    case "color":
      sql = `SELECT s.model_id,s.model_name,c.color_name,c.color_code from t_color_relation r JOIN t_stocks s ON s.model_ID = r.model_ID JOIN t_product_colors c ON c.color_ID = r.color_ID WHERE s.model_delete_flg = 0;`;
      break;
    default:
      console.log("error");
  }

  const result = await db.query(where ? sql + " where " + where : sql);
  // console.log(sql + " where " + where);

  return res.status(200).json(result);
}
