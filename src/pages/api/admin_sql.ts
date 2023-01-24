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
  const situ = req.body.situ ?? req.query.situ
//   console.log( "situ:" + situ);
  
  const where = req.query?.where;

const email = req.body.email ?? req.query.email
const user_id = req.body.user_id ?? req.query.user_id
console.log("a" + req);
// console.log(email);

  const {
    login,
    loginID,
    user_password,
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
//   console.log(user_id);
  let sql = "";
  switch (situ) {
    case "getUserInfo":
      sql = `SELECT user_id, password FROM t_administrators WHERE administrator_email = "${email}"`;
      break;

      case "addLogin":
        sql = `INSERT INTO t_logins(user_id,login_time,administer_flg) VALUES ("${user_id}",NOW(),1) `;
        break;

    default:
      console.log("error");
  }

  const result = await db.query(where ? sql + " where " + where : sql);
  // console.log(sql + " where " + where);
    // console.log(result);

  return res.status(200).json(result);
}
