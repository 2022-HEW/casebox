import styles from "../styles/product_check.module.css";
import { Button } from "./common/Button";
import { useRouter } from'next/router'
import { useRecoilState } from "recoil";
import { productState } from '../atoms/atoms';
import Image from "next/image"
type Props = {
    // product:[],
    product:{
        product_name:string,
        m_product_category:string,
        m_product_price:number,
        product_ID:number,
        product_liked:number,
        product_place:string,
        user_name:string,
    },    
}

const Product_check = ({product}:Props) => {
    const router = useRouter();
    const[product_info,setProduct] = useRecoilState(productState)
    // 画面遷移
        const go_type_select=()=>{
            // console.log(product);
            setProduct(product);
            router.push({
                pathname:"/device_select",
            })
        }
        
        
    return(
        <>
            <Image src={"/product_image/" + product.product_place} width={100} height={100}/>
            <p >{product.product_name}</p>
            <p>{product.m_product_category}</p>
            <p>{product.m_product_price}</p>
            <Button situ_name="screen" label="機種選択へ" onClick={go_type_select}/>

        </>
    )
}


export default Product_check