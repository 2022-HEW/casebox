import { log } from 'console'
import {useState,useEffect} from 'react'

export default function SQL_result(){

    type Product ={
      product_ID:number,
      product_name:string,
    }
    
    const [product, setProduct] = useState([])
    const sql:string = "a";

    // データベースから取得
    useEffect(() => {
      const fetchProduct = async () => {
        const response = await fetch(`/api/Sql?sql=${sql}`)
        const data = await response.json()
        setProduct(data)
          console.log(product);
      }
      fetchProduct()
    },[])

    return (
        <div>
          <ul>
            {product.map((product:Product) => (
              <li key={product.product_ID}>{product.product_name}</li>
            ))}
          </ul>
        </div>
    )
} 
