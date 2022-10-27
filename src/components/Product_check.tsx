import styles from "../styles/product_check.module.css";
import Image from "next/image";


type Props = {
    // product:[],
    product:{
        product_place:string,
        product_name:string,
        m_product_category:string,
        m_product_price:string,
    },    
    css:string
}

const Product_check = (props:Props) => {
    console.log(props.product);
    return(
        <>
            <Image src={props.product.product_place} width={100} height={100}/>
            <p >{props.product.product_name}</p>
            <p>{props.product.m_product_category}</p>
            <p>{props.product.m_product_price}</p>

        </>
    )
}

export default Product_check