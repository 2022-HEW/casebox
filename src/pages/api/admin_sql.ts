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
  const situ = req.body.situ ?? req.query.situ;
  const email = req.body.email ?? req.query.email;
  const user_id = req.body.user_id ?? req.query.user_id;
  const product_name = req.body.product_name;
  const product_place = req.body.product_place;
  const m_product_ID = req.body.m_product_ID;
  const product_situation = req.body.product_situation;
  const model_id = req.body.model_id;
  const add_quant = req.body.add_quant;
  const transaction_cost = req.body.transaction_cost;
  const model_quant = req.body.model_quant;
  const year = req.query.year;
  const model_name  =req.body.model_name
  const color_name  =req.body.color_name
  const color_code  =req.body.color_code
  const color_id  =req.body.color_id

  let sql = "";
  switch (situ) {
    case "getUserInfo":
      sql = `SELECT user_id, password FROM t_administrators WHERE administrator_email = "${email}"`;
      break;

    case "addLogin":
      sql = `INSERT INTO t_logins(user_id,login_time,administer_flg) VALUES ("${user_id}",NOW(),1) `;
      break;

    case "getCategory":
      sql = `SELECT m_product_ID,m_product_category FROM t_m_products`;
      break;

    case "addProduct":
      sql = `INSERT INTO t_products(product_name, user_id, product_created, product_place, m_product_ID, product_change_time, product_situation) 
      VALUES ("${product_name}",${user_id},NOW(),'${product_place}',${m_product_ID},NOW(),${product_situation})`;
      break;

    case "getProducts":
      sql = `SELECT tp.*,mp.* FROM t_products tp JOIN t_m_products mp ON tp.m_product_ID = mp.m_product_ID`;
      break;

    case "getStocks":
      sql = `SELECT model_name,model_stocks,model_stock_limit,model_id,model_stock_standard,model_price FROM t_stocks`;
      break;

    case "addTrade":
      sql = `INSERT INTO t_trades(model_id,transaction_date,model_quant,transaction_cost) VALUES (${model_id},NOW(),${add_quant},${transaction_cost})`;
      break;

    case "addStock":
      sql = `UPDATE t_stocks SET model_stocks = ${model_quant} WHERE model_id = ${model_id}`;
      break;

      case "addType":
        sql = `INSERT INTO t_stocks(model_name,model_stocks,model_stock_limit,model_stock_standard) VALUES ("${model_name}",250,100,300)`;
        break;

        case "addColor":
          sql = `INSERT INTO t_product_colors(color_name,color_code) VALUES ("${color_name}","${color_code}")`;
          break;

          case "addRelation":
            sql = `INSERT INTO t_color_relation(color_ID,model_ID) VALUES (${color_id},${model_id})`;
            break;

    case "getBuys":
      sql = `SELECT  b.buy_money,b.buy_created,s.model_name, b.quant FROM t_buys b JOIN t_stocks s ON b.model_id = s.model_id WHERE b.buy_created BETWEEN  "${Number(year) - 1}-01-01" AND "${Number(year) + 1}-01-01" ORDER BY b.buy_created`;
      break;
    
      case "getColors":
        sql ="SELECT color_name,color_code,color_ID FROM t_product_colors "
        break;

        case "getRelations":
          sql ="SELECT color_ID,model_ID FROM t_color_relation "
          break;
    default:
      console.log("error");
  }

  const result = await db.query(sql);
  // console.log(sql + " where " + where);
  // console.log(result);

  return res.status(200).json(result);
}
