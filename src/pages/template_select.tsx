import styles from "../styles/template_select.module.css"
import Nav from "../components/Nav";
import Box from "../components/Box";
import Image from "next/image";
import { useEffect,useState } from "react";
import { useRouter } from "next/router";

const Template = () => {
    const router = useRouter();    
    type Product ={
        product_ID:number,
        product_name:string,
        product_liked:number,
        product_place:string,
        m_product_category:string,
        m_product_price:number
      }

    const [product, setProduct] = useState([])
    const [sql, setSql]= useState("SELECT p.product_ID,p.product_name,p.product_liked,p.product_place,u.user_name,mp.m_product_price,mp.m_product_category FROM t_products p JOIN t_users u ON p.userID = u.userID JOIN t_m_products mp ON p.m_product_ID = mp.m_produt_ID");

    // DBから取得
    useEffect(() => {
      const fetchProduct = async () => {
        const response = await fetch(`/api/Sql?sql=${sql}`)
        const data = await response.json()
        setProduct(data)
          console.log(product);
        //   console.log(data[0].product_ID);
      }
      fetchProduct()
    },[])

    return(
        <>
        {product.map((product:Product) => (
            // <li key={product.product_ID}>{product.product_name}</li>
            <Product_box image_path={product.product_place}
                         case_name={product.product_name}
                         case_category={product.m_product_category}
                         case_price={product.m_product_price}
                         key={product.product_ID}
            />
          ))}
        <Box index={false}>
          <Nav/>
        </Box>
        </>
    )
}

/**
 * 商品情報を表示する
 * @returns 
 */
type Product = {
    image_path:string,
    case_name:string,
    case_category:string,
    case_price:number
}
const Product_box =({image_path,case_name,case_category,case_price}:Product)=> {
    return(
        <div className={styles.product_box}>
            <Image src={image_path} alt="商品の画像" width={100} height={100}/>
            <p className="case_name">{case_name}</p>
            <p className="case_category">{case_category}</p>
            <p className="case_price">{case_price}</p>
        </div>
    )
}


export default Template;