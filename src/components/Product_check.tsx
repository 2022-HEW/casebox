import styles from "../styles/product_check.module.css";
import Image from "next/image";


type Props = {
    image_path:string,
    product_name:string,
    product_category:string,
    product_price:number,
}

const Product_check = (props:Props) => {
    
    return(
        <>
            <Image src={props.image_path} width={100} height={100}/>
            <p className={}>{props.product_name}</p>
            <p>{props.product_category}</p>
            <p>{props.product_price}</p>

        </>
    )
}

export default Product_check